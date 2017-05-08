---
layout: post
title: Hadoop YARN
lead: null
date: 2016-08-29T00:00:00.000Z
categories: Hadoop
tagline: Hadoop
tags:
  - Hadoop
  - Apache
  - YARN
---

# YARN 设计理念与基本架构

## YARN 的基本组成结构

### 一. ResourceManager

ResourceManager 是一个全局的资源管理器，负责整个集群的资源管理和分配。它主要由两个组件构成：调度器（Scheduler）和应用程序管理器（Applications Master，ASM）。

#### ①调度器

该调度器是一个 "纯调度器"，不再参与任何与具体应用程序逻辑相关的工作，而仅根据各个应用程序的资源需求进行分配，资源分配的单位用一个资源抽象概念 "Container" 来表示。Container 封装了内存和 CPU。此外，调度器是一个可插拔的组件，用户可根据自己的需求设计新的调度器，YARN 自身提供了 Fair Scheduler 和 Capacity Scheduler。

#### ②应用程序管理器

应用程序管理器负责管理整个系统中所有应用程序，包括应用程序的提交、与调度器协商资源以启动 ApplicationMaster、监控 ApplicationMaster 运行状态并在失败时重新启动它等。

### 二. ApplicationMaster

用户提交的每个 Application 都要包含一个 ApplicatioNMaster，主要功能包括：

- 向 RM 调度器申请资源（用 Container 表示）
- 将从 RM 分配的资源分配给 Applcation 内部的任务
- 与 NM 通信请求 启动/停止 任务
- 监控所有任务的运行状态，并在失败时重新为任务申请资源以重启任务

### 三. NodeManager

NM 是每个节点上的资源和任务管理器，一方面，它会定时地向 RM 汇报本节点上的资源使用情况和各个 Container 的运行状态；另一方面，它接收并处理来自 AM 的 Container 启动/停止 等各种命令。

### 四. Container

Container 是 YARN 中资源抽象，它封装了某个节点上的内存和 CPU，当 AM 向 RM 申请资源时，RM 为 AM 返回的资源便是用 Container 表示的。YARN 是使用轻量级资源隔离机制 Cgroups 进行资源隔离的。

## YARN 通信协议

在 YARN 中，任何两个需要相互通信的组件之间仅有一个 RPC 协议，而对于任何一个 RPC 协议，通信双方有一端是 Client，另一端是 Server，且 Client 总是主动连接 Server。YARN 中有以下几个主要的 RPC 协议：

- JobClient 与 RM 之间的协议：ApplicationClientProtocol，JobClient 通过该 RPC 协议提交应用程序、查询应用程序状态等
- Admin（管理员）与 RM 之间的协议：ResourceManagerAdministrationProtocol，Admin 通过该 RPC 协议更新系统配置文件，比如节点黑白名单、用户队列权限等
- AM 与 RM 之间的协议：ApplicationMasterProtocol, AM 协议向 RM 注册并撤销自己，并为各个人物申请资源
- NM 与 RM 之间的协议：ResourceTracker，NM 通过该协议向 RM 注册，并定时发送心跳信息汇报当前节点的资源使用情况和 Container 运行情况，并接收来自 AM 的命令
- AM 与 NM 之间的协议：ContainerManagermentProtocol，AM 通过该 RPC 协议要求 NM 启动或者停止 Container

## YARN 工作流程

![YARN工作流程](http://waterbolik.github.com/img/YARN工作流程.jpg)

YARN 的工作流程如上所示：

1. Client 向 YARN 提交应用程序，其中包括 ApplicationMaster 程序及启动 ApplicationMaster 的命令
2. ResourceManager 为该 ApplicationMaster 分配第一个 Container，并与对应的 NodeManager 通信，要求它在这个 Container 中启动应用程序的 ApplicationMaster
3. ApplicationMaster 首先向 ResourceManager 注册
4. ApplicationMaster 为 Application 的任务申请并领取资源
5. 领取到资源后，要求对应的 NodeManager 在 Container 中启动任务
6. NodeManager 收到 ApplicationMaster 的请求后，为任务设置好运行环境（包括环境变量、JAR 包、二进制程序等），将任务启动脚本写到一个脚本中，并通过运行该脚本启动任务
7. 各个任务通过 RPC 协议向 ApplicationMaster 汇报自己的状态和进度，以让 ApplicationMaster 随时掌握各个任务的运行状态，从而可以在失败时重启任务
8. 应用程序完成后，ApplicationMaster 向 ResourceManager 注销并关闭自己

需要注意的是，实际情况中，集群可能并没有那么多资源来满足 ApplicationMaster 的资源请求，这是 ApplicationMaster 会采用轮循的方式不断申请资源，直到申请到资源或 Application 结束为止。

# YARN资源调度器

随着Hadoop的普及，单个Hadoop集群的用户量越来越大，不同用户提交的应用程序往往具有不同的服务质量要求，典型的应用有以下几种：

- **批处理作业**。这种作业往往耗时较长，对完成时间一般没有严格要求，如数据挖掘、机器学习等方面的应用程序
- **交互式作业**。这种作业期望能及时返回结果，如用HIVE执行查询
- **生产性作业**。这种作业要求有一定量的资源保证，如统计值计算、垃圾数据分析等

## 基本架构

1. 资源调度器是YARN中最核心的组件之一，且是插拔式的，它定义了一整套接口规范以便用户可按照需要实现自己的调度器
2. YARN自带FIFO、Capacity Scheduler和Fair Scheduler三种常用资源调度器，当然，用户可按照接口规范编写一个新的资源调度器，并通过简单的配置使它运行起来
3. YARN的资源管理器实际上是一个事件处理器，它需要处理来自外部的6种Scheduler-EventType类型的事件，并根据事件的具体含义进行相应的处理，6种事件含义如下：

  > - **NODE_REMOVED**：表示集群中移除了一个计算节点（可能是节点故障或者管理员主动移除），资源调度器收到该事件时需要从可分配资源总量中移除相应的资源
  > - **NODE_ADDED**：表示集群中增加了一个计算节点，资源调度器收到该事件时需要将新增的资源量添加到可分配资源总量中
  > - **APPLICATION_ADDED**：表示ResourceManager收到一个新的Application。通常而言，资源管理器需要为每个Application维护一个独立的数据结构，以便于统一管理和资源分配。资源管理器将该Application添加到相应的数据结构中
  > - **APPLICATION_REMOVED**：表示一个Application运行结束（可能成功或失败），资源管理器将该Application从相应的数据结构中清除
  > - **CONTAINER_EXPIRED**：当资源调度器将一个Container分配给某个Application-Master后，如果该ApplicationMaster在一定时间内没有使用该Container，则资源调度器会对该Container进行（回收后）再分配
  > - **NODE_UPDATE**：ResourceManager收到NodeManager通过心跳机制汇报的信息后，会触发一个NODE_UPDATE事件，由于此时可能有新的Container得到释放，因此该事件会触发资源分配。也就是说，该事件是6个事件中最重要的事件，它会触发资源调度器最核心的资源分配机制

## 资源表示模型

1. NodeManager启动时会向ResourceManager注册，注册信息中包含该节点可分配的CPU和内存总量，这两个值均可通过配置选项设置，具体如下：

  > - **yarn.nodemanager.resource.memory-mb**：可分配的物理内存总量，默认是8G
  > - **yarn.nodemanager.vmem-pmem-ratio**：任务使用单位物理内存量对应最多可使用的虚拟内存，默认值是2.1，表示使用1M的物理内存，最多可以使用2.1MB的虚拟内存总量
  > - **yarn.nodemanager.resource.cpu-vcores**：可分配的虚拟CPU个数，默认是8。为了更细粒度地划分CPU资源和考虑到CPU性能差异，YARN允许管理员根据实际需要和CPU性能将每个物理CPU划分成若干个虚拟CPU，而管理员可为每个节点单独配置可用的虚拟CPU个数，且用户提交应用程序时，也可指定每个任务需要的虚拟CPU数

2. YARN支持的调度语义：

  > - 请求某个节点上的特定资源量
  > - 请求某个特定机架上的特定资源量
  > - 将某些节点加入（或移除）黑名单，不再为自己分配这些节点上的资源
  > - 请求归还某些资源

3. 不支持的调度语义：

  > - 请求任意节点上的特定资源量
  > - 请求任意机架上的特定资源量
  > - 请求一组或几组符合某种特质的资源
  > - 超细粒度资源。比如CPU性能要求、绑定CPU等
  > - 动态调整Container资源，允许根据需要动态调整Container资源量

## 资源调度模型

1. YARN采用了双层资源调度模型

  > - 第一层中，ResourceManager中的资源调度器将资源分配给各个ApplicationMaster
  > - 第二层中，ApplicationMaster再进一步将资源分配给它的内部任务

2. YARN的资源分配过程是异步的，也就是说，资源调度器将资源分配给一个应用程序后，它不会立刻push给对应的ApplicationMaster，而是暂时放到一个缓冲区中，等待ApplicationMaster通过周期性的心跳主动来取（pull-based通信模型）

3. YARN采用了增量资源分配机制（当应用程序申请的资源暂时无法保证时，为应用程序预留一个节点上的资源直到累计释放的空闲资源满足应用程序需求），这种机制会造成浪费，但不会出现饿死现象

4. YARN资源调度器采用了主资源公平调度算法，DRF的基本设计思想则是将最大最小化公平算法应用于主资源上，进而将多维资源调度问题转化为单资源调度问题，即DRF总是最大化所有主资源中最小的

## 资源抢占模型

1. 在资源调度器中，每个队列可设置一个最小资源量和最大资源量，其中，最小资源量是资源紧缺情况下每个队列需保证的资源量，而最大资源量则是极端情况下队列也不能超过的资源使用量

2. 为了提高资源利用率，资源调度器（包括Capacity Scheduler和Fair Scheduler）会将负载较轻的队列的资源暂时分配给负载重的队列（即最小资源量并不是硬资源保证，当队列不需要任何资源时，并不会满足它的最小资源量，而是暂时将空闲资源分配给其他需要资源的队列），仅当负载较轻队列突然收到新提交的应用程序时，调度器才进一步将本属于该队列的资源分配给它。但由于此时资源可能正被其他队列使用，因此调度器必须等待其他队列释放资源后，才能将这些资源"物归原主"，这通常需要一段不确定的等待时间。为了防止应用程序等待时间过长，调度器等待一段时间后若发现资源并未得到释放，则进行资源抢占

3. 仅当启用的调度器实现了PreemptableResourceScheduler接口，且参数yarn.resourcemanager.secheduler.monitor.enable的值被置为true（默认值为false）时，ResourceManager才启用资源抢占功能。资源抢占是通过第三方策略触发的，这些策略被实现成一些插拔式的组件类（实现SchedulingEditPolicy接口），并通过参数yarn.resourcemanager.schduler.monitor.policies指定（默认情况下，YARN提供了默认实现ProporitonalCapacityPreemptionPolicy）

4. ResourceManager将依次遍历这些策略类，并由监控类SchedulingMonitor进一步封装它们，SchedulingMonitor将周期性调用策略类的editSchedule()函数，以决定抢占哪些Container的资源

5. 在YARN中，资源抢占整个过程可概括为如下步骤：

  > ①. SchedulingEditPolicy探测到需要抢占的资源，将需要抢占的资源通过事件DROP_RESERVATION和PREEMPT_CONTAINER发送给ResourceManager

  > ②. ResourceManager调用ResourceScheduler的dropContainerReservation和preemptContainer函数，标注待抢占的Container

  > ③. ResourceManager收到来自ApplicationMaster的心跳信息，并通过心跳应答将待释放的资源总量和待抢占Container列表返回给它。ApplicationMaster收到该列表后，可选择如下操作：

  > - 杀死这些Container
  > - 选择并杀死其他Container以凑够总量
  > - 不做任何处理，过段时间可能有Container自行释放资源或者由ResourceManager杀死Container

  > ④. SchedulingEditPolicy探测到一段时间内，ApplicationMaster未自行杀死约定的Container，则将这些Container封装到KILL_CONTAINER事件中发送给ResourceManager

  > ⑤. ResourceManager调用ResourceScheduler的killContainer函数，而ResourceScheduler则标注这些待杀死的Container

  > ⑥. ResourceManager收到来自NodeManager的心跳信息，并通过心跳应答将待杀死的Container列表返回给它，NodeManager收到该列表后，将这些Container杀死，并通过心跳告知ResourceManager

  > ⑦. ResourceManager收到来自ApplicationMaster的心跳信息，并通过心跳应答将已杀死的Container列表发送给它

6. 在YARN中，队列是按照树形结构组织的，一个队列当前实际可以使用的资源量R取决于最小资源量A（由管理员配置）、队列资源需求量（处于等待或者运行状态的应用程序尚需的资源总量）和同父兄弟队列的空闲资源量C（多余资源可共享给其他队列），这意味着R在不同时间点的取值是不同的，可以按照递归算法求出R=F(A, B, C)，这样，如果一个队列当前正在使用资源量U>R，则需从该队列中抢占(U-R)资源

7. 为了尽可能避免资源浪费，YARN优先选择优先级低的Container作为资源抢占对象，且不会立刻杀死Container，而是将释放资源的任务留给应用程序自己：ResourceManager将待杀死的Container列表发送给对应的ApplicationMaster，以期望它采取一定的机制自行释放这些Container占用的资源，比如先进行一些状态保存工作后，再将对应的Container杀死，以避免计算浪费，如果一段时间后，ApplicationMaster尚未主动杀死这些Container，则ResourceManager再强制杀死这些Container

## 层级队列管理机制

1. 层级队列组织方式具有以下特点：

  > 子队列

  > - 队列可以嵌套，每个队列可以包含子队列
  > - 用户只能将应用程序提交到最底层的队列，即叶子队列

  > 最少容量

  > - 每个子队列均有一个"最少容量比"属性，表示可以使用父队列的容量百分比
  > - 调度器总是优先选择当前资源使用率（当时使用的/最少容量）最低的队列，并为之分配资源
  > - 最少容量不是"总会保证的最低容量"，也就是说，如果一个队列的最少容量为20，而该队列中所有队列仅使用了5，那么剩下的15可能会分配给其他需要的队列
  > - 最少容量的值为不小于0的数，但也不能大于"最大容量"

  > 最大容量

  > - 为了防止一个队列超量使用资源，可以为队列设置一个最大容量，这是一个资源使用上限，任何时刻使用的资源总量都不能超过该值
  > - 默认情况下队列的最大容量是无限大，这意味着，当一个队列只分配了20%的资源，所有其他队列没有应用程序时，该队列可能使用100%的资源，当其他队列有应用程序提交时，再逐步归还

  > 用户权限管理

  > - 管理员可配置每个叶子队列对应的操作系统用户和用户组（Hadoop允许一个操作系统用户或者用户组可对应一个或多个队列），也可以配置每个队列的管理员，他可以杀死该队列中任何应用程序，改变任何应用程序的优先级等（默认情况下用户只能管理自己的应用程序）

  > 系统资源管理

  > - YARN资源管理和调度均由调度器完成，管理员可在调度器中设置每个队列的资源容量，每个用户资源量等信息，而调度器则按照这些资源约束对应用程序进行调度

# YARN Capacity Scheduler（容量调度器）

## 特点

以队列为单位划分资源，每个队列可设定一定比例的资源最低保证和使用上限，同时，每个用户也可设定一定的资源使用上限以防止资源滥用。而当一个队列的资源有剩余时，可暂时将剩余资源共享给其他队列。总之，Capacity Scheduler主要有以下几个特点：

- **容量保证**：管理员可为每个队列设置资源最低保证和资源使用上限，而所有提交到该队列的应用程序共享这些资源
- **灵活性**：如果一个队列中的资源有剩余，可以暂时共享给那些需要资源的队列，而一旦该队列有新的应用程序提交，则其他队列释放的资源会归还给该队列
- **多重租赁**：支持多用户共享集群和多应用程序同时运行。为防止单个应用程序、用户或队列独占集群中的资源，管理员可为之增加多重约束（比如单个应用程序同时运行的任务数等）
- **安全保证**：每个队列有严格的ACL列表规定它的访问用户，每个用户可指定哪些用户允许查看自己应用程序的运行状态或者控制应用程序（比如杀死应用程序）。此外，管理员可指定队列管理员和集群系统管理员
- **动态更新配置文件**：管理员可根据需要动态修改各种配置参数，以实现在线集群管理

## Capacity Scheduler的功能

1. Capacity Scheduler有自己的配置文件，即存放在conf目录下的capacity-scheduler.xml
2. 在Capacity Scheduler的配置文件中，队列queueX的参数Y的配置名称为yarn.scheduler.capacity.queueX.Y
3. 资源分配相关参数：

  > - capacity：队列的最小资源容量（百分比）。注意，所有队列的容量之和应小于100
  > - maximum-capacity：队列的资源使用上限
  > - minimum-user-limit-percent：每个用户最低资源保障（百分比）
  > - user-limit-factor：每个用户最多可使用的资源量（百分比）

4. 限制应用程序数目的相关参数：

  > - maximum-applications：集群或者队列中处于等待和运行状态的应用程序数目上限，这是一个强限制项，一旦集群中应用程序数目超过该上限，后续提交的应用程序将被拒绝。默认值为10000。Hadoop允许从集群和队列两个方面该值，其中，集群的总体数目上限可通过参数yarn.scheduler.capacity.maximum-applications设置，默认为10000，而单个队列可通过参数yarn.scheduler.capacity.

  >   <queue-path>.maximum-applications设置适合自己的值</queue-path>

  > - maximum-am-resource-percent：集群中用于运行应用程序ApplicationMaster的资源比例上限，该参数通常用于限制处于活动状态的应用程序数目。所有队列的ApplicationMaster资源比例上限可通过参数yarn.scheduler.capacity.maximum-am-resource-percent设置，而单个队列可通过参数yarn.scheduler.capacity.

  >   <queue-path>.maximum-am-resource-percent设置适合自己的值</queue-path>

5. 队列访问权限控制

  > - state：队列状态，可以为STOPPED或者RUNNING。如果一个队列处于STOPPED状态，用户不可以将应用程序提交到该队列或者它的子队列中。类似的，如果root队列处于STOPPED状态，则用户不可以向集群提交应用程序，但正在运行的应用程序可以正常运行结束，以便队列可以优雅地退出
  > - acl_submit_application：限定哪些用户/用户组可向给定队列中提交应用程序。该属性具有继承性，即如果一个用户可以向某个队列提交应用程序，则它可以向它所有子队列中提交应用程序
  > - acl_administer_queue：为队列指定一个管理员，该管理员可控制该队列的所有应用程序，比如杀死任意一个应用程序等。同样，该属性具有继承性，如果一个用户可以向某个队列中提交应用程序，则它可以向它的所有子队列中提交应用程序

6. 当管理员需动态修改队列资源配置时，可修改配置文件`conf/capacity-scheduler.xml`，然后运行`“yarn rmadmin -refreshQueues”`

7. 当前Capacity Scheduler不允许管理员动态减少队列数目，且更新的配置参数值应是合法值，否则会导致配置文件加载失败

## Capacity Scheduler实现

### 应用程序初始化

应用程序被提交到ResourceManager之后，ResourceManager会向Capacity Scheduler发送一个SchedulerEventType.APP_ADDED事件，Capacity Scheduler收到该事件后，将为应用程序创建一个FiCaSchedulerApp对象跟踪和维护该应用程序的运行时信息，同时将应用程序提交到对应的叶子队列中，叶子队列会对应用程序进行一系列合法性检查。只有通过这些合法性检查，应用程序才算提交成功，这些合法性包括以下几个方面：

> - 应用程序所属用户拥有该叶子队列的应用程序提交权限
> - 队列及其父队列当前处于RUNNING状态（递归检查）
> - 队列当前已提交的应用程序数目未达到管理员设定的上限
> - 应用程序所属用户提交的应用程序数目未超过管理员设定的上限

### 资源调度

当ResourceManager收到来自NodeManager发送的心跳信息后，将向Capacity Scheduler发送一个SchedulerEventType.NODE_UPDATE事件，Capacity Scheduler收到该事件后，会依次进行以下操作：

#### 处理心跳信息

NodeManager发送的心跳信息中有两类信息需资源调度器处理，一类是最新启动的Container，另一类是运行完成的Container，具体如下：

> - 对于最新启动的Container，资源调度器需向ResourceManager发送一个RMContainerEventType.LAUNCHED，进而将该Container从超时监控队列中删除。当资源调度器为ApplicationMaster分配一个Container后，为了防止ApplicationMaster长时间不使用该Container造成资源浪费，它会将该Container加入一个超时监控队列中。如果一段时间内，该队列中的Container仍未被使用，则资源调度器会回收该Container
> - 对于运行完成的Container，资源管理器将回收它使用的资源，以便接下来对这些资源进行再分配
> - 处理完以上两类信息后，Capacity Scheduler将节点上的空闲资源分配给应用程序

#### 资源分配

- Container主要包含5类信息：

  > - 优先级
  > - 期望资源所在节点
  > - 资源量
  > - Container数目
  > - 是否松弛本地性（即是否在没有满足节点本地性资源时，选择机架本地性资源）

- 资源调度器收到资源申请后，将暂时将这些数据请求存放到一个数据结构中，以等待空闲资源出现后为其分配合适的资源 当一个节点上有空闲资源时，它会依次选择队列、应用程序和container（请求）使用该资源

  > - **步骤1**：选择队列

  >   > - 从根队列开始，按照它的子队列资源使用率由小到大依次遍历各个子队列。如果子队列为叶子队列，则依次按照步骤2和步骤3中的方法在队列中选出一个Container（请求），否则以该子队列为根队列，重复以上过程，直到找到一个合适的队列并退出
  >   > - 注意：上述"队列资源使用率"计算方法为用已经使用的资源量除以最小队列资源容量（由管理员配置）。对于非叶子队列，它的已使用资源量是各个子队列已使用资源量之和

  > - **步骤2**：选择应用程序

  >   > - 在步骤1中选中一个叶子队列后，Capacity Scheduler按照提交时间对子队列中的应用程序进行排序（实际排序时用的是Applition ID，提交时间越早的应用程序，Application ID越小），选择最早提交的 Application 分配资源

  > - **步骤3**：选择Container（请求）

  >   > - 对于同一个应用程序，它请求的Container可能是多样化的，涉及不同的优先级、节点、资源量和数量。**当选中一个应用程序后，Capacity Scheduler将尝试优先满足优先级高的Container。对于同一类优先级，优先选择满足本地性的Container，它会依次选择node local、rack local和no local的Container**

- Capacity Scheduler有两种比较器用以比较两个资源的大小（比如比较用户当前使用的资源量是否超过了设置的上限资源量），默认是DefaultResourceCalculator，它只考虑内存资源。另外一种是DominantResourceCalculator，它采用了DRF比较算法，同时考虑内存和CPU两种资源。管理员可通过参数yarn.scheduler.capacity.resource-calculator设置资源比较器

- 其他事件处理

  > - **APP_REMOVED**：在多种情况下Capacity Scheduler将收到该事件，包括应用程序正常结束、应用程序被杀死等。Capacity Scheduler收到该事件后，首先会向所有未运行完成的Container发送一个RMContainerEventType.KILL事件，以释放正在使用的Container；然后才会将应用程序相关数据结构从内存中移除
  > - **NODE_ADDED**：当集群中动态加入一个节点时（比如管理员动态扩充集群规模或者节点断开后又复活等），Capacity Scheduler将收到该事件。Capacity Scheduler收到该事件后，只需在相应数据结构中记录NodeManager信息并增加系统总资源量即可
  > - **NODE_REMOVED**：当集群中动态移除一个节点时（比如管理员动态移除节点或者节点在一定事件内未汇报心跳而被ResourceManager移除集群），Capacity Scheduler将收到该事件。Capacity Scheduler收到该事件后，除了移除NodeManager信息并减少系统总资源外，还需向所有正运行的Container发送一个RMContainerEventType.KILL事件，以清空相关信息
  > - **CONTAINER_EXPIRED**：当Capacity Scheduler将一个Container分配给ApplicationMaster后，ApplicationMaster在一定时间内必须使用该Container，否则ResourceManager将进行强制回收，此时会触发一个CONTAINER_EXPIRED事件
