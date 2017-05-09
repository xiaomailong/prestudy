---
layout: post
title: Windows Server 2016
lead: 微软Windows Server 2016正式版更新内容大全：容器、混合云
date: 2016-11-06T00:00:00.000Z
categories: Windows
tagline: Server
tags:
  - Windows Server 2016
  - Windows
  - Server
---

# 微软Windows Server 2016正式版更新内容大全：容器、混合云

微软发布了Windows Server 2016正式版系统，还有System Center 2016，用户可以到MSDN、VLSC（批量授权服务中心）获取下载，Windows Server 2016可以提供传统服务器和云端服务应用部署，功能和安全性更强。

微软在Windows Server 2016发布博客中强调混合云特性，可以连接到Azure数据中心，另外还吸收了公有云、软件定义功能加快云服务构建，Windows Server 2016还提供了跨数据中心无缝移植性，通过虚拟机搭建私有云和公共云环境，新的容器，这些都反映了Windows Server 2016混合云特性，在微软看来，混合云适合所有的企业用户，即使是最雄心勃勃的云业务也可以满足。一些应用程序需要快速迁移到公有云，尽管会面临技术和监管障碍。

**下面是Windows Server 2016中的新内容和改进：**

与常规Win10一周年更新系统一样，Windows Server 2016带来一系列新功能，包括新的安全层保护用户数据(可以锁定多层保护)、控制访问权限等，同时也支持开始菜单、开始屏幕、任务视图、虚拟桌面、通知中心和平板模式等。

Windows Server 2016系统中，虚拟机可以通过屏蔽功能加密(Shielded Virtual Machines)，而主机可通过监护服务预先批准(Host Guardian Service)，甚至也可以通过内建的Hyper-V容器对应用程序进行隔离。

Windows Server 2016带来了大量新功能，**包括引入新的安全层来保护用户数据及控制访问权限等**，关键功能如下：

- **拓展安全性**----引入新的安全层，加强平台安全性，规避新出现的威胁，控制访问全新并保护虚拟机；
- **弹性计算**----简化虚拟化升级，启用新的安装选项并增加弹性，帮助用户在不限制灵活性的前提下确保基础设施的稳定性；
- **缩减存储成本**----在保证弹性、减低成本及增加可控性的基础上拓展软件定义储存的功能性；
- **简化网络**----新网络为用户数据中心带来了网络核心功能集以及直接来自Azure的SDN架构；
- **应用程序效率和灵活性**----Windows Server 2016为封装、配置、部署、运行、测试及保护用户应用（本地或云端）引入了新方法，使用了诸如Windows容器与新Nano Server轻量级系统部署选项。

## Windows Server容器应用开发

Windows Server容器创建了高度灵活的Windows Server环境，帮助用户加速开发及运营流程，实现现代化应用的高效开发和部署。数百万Windows开发者将体验到容器技术带来的优势，而这一切都建立在开发者可以自行选择开发语言的基础之上----不论是.NET、ASP.NET、PowerShell、Python、Ruby on Rails、Java或是其他。

此次Windows Server容器的发布，也是对早前微软宣布与Docker合作的进一步延伸。微软将为Linux和Windows Server用户带来容器技术和开发运营的优势。Windows Server容器目前是Docker开源项目的一部分，用户可以通过PowerShell或Docker客户端对这些容器进行部署和管理。

除了与Docker合作提供Windows Server容器，微软还将围绕该技术提供更多选择及灵活性，包括：

- 保证容器技术在Azure上的一流体验。借助微软近期发布的Docker VM Extensions for Linux on Azure、Docker CLI support on Windows和Visual Studio Tools for Docker，用户能够开发和运行现代化应用。
- 为面向Windows Server的Docker Engine开源开发提供支持，让Docker客户端能够借助Linux和Windows容器管理多容器应用，而无需考虑运行环境。

- 微软还加入了由Linux基金会赞助的开放容器计划，提供开放且通用的容器映像格式和运行时间。

- 围绕LXD REST API与Canonical展开合作，拓展生态系统。作为一个跨平台的容器管理层，LXD REST API能够为Windows和Ubuntu开发者带来新的容器技术创新。

微软也对Visual Studio和Visual Studio Online进行了更新，让开发者可以使用自己熟悉且喜欢的工具来体验Windows Server容器。开发者即可利用Visual Studio在Azure内创建一个Windows Server容器主机，并将自己的ASP.NET网站或控制台应用发布到新建的容器中，然后部署到容器主机上。而借助即将到来的Visual Studio Online持续集成和版本管理功能，开发者将实现上述流程的自动化，并容器化应用的版本进行管理。

Windows Server 2016中还包括Hyper-V容器，作为第二个容器部署选项，Hyper-V容器通过优化的虚拟化和Windows Server操作系统，提供更高程度的隔离，即将各个容器之间、以及容器与主机操作系统之间进行隔离，从而增加了在低信任度或混合运营环境下部署容器的可能性。

## 提供新的软件定义数据中心特性

Windows Server 2016还包括全新的，以Azure为启发的软件定义数据中心特性，主要更新包括：

- **Nano Server增强功能**：微软添加了新的Emergency Management Console，让用户可以直接从Nano Server控制台中查看和修复网络配置；借助新的PowerShell脚本，用户可以创建一个Nano Azure虚拟机。

> 作为最小的内存部署选项，Nano Server可以被安装在物理主机或虚拟机上。新的Emergency Management Console让用户可以在Nano Server控制台中直接查看和修复网络配置。此外，还提供PowerShell脚本用于创建一个运行Nano Server的Azure虚拟机。从应用的角度来说，你现在可以使用CoreCLR运行ASP.Net v5应用。微软增加重大功能以扩展Nano Server能力，而这一切的更新都建立在维持原有内存占用的基础之上。

- **简化软件定义网络**：微软提供用于集中型网络配置的可扩展网络控制器，以及实现高可用性和高性能的软件负载均衡器。

> 微软引入了用于编程政策的可扩展网络控制器、用于高可用性和高性能的L4负载均衡器、用于混合连接的增强网关，以及融合了RDMA流量和租户流量的底层网络结构。另外在Azure中使用核心网络功能套件和SDN架构。

- **更高的安全性**：将底层主机与虚拟机隔离，帮助保护共享环境中的资源。用户可以通过一个署名模板测试创建一个隔离虚拟机，并体验隔离虚拟机的其他功能。

> 增加了对于Hyper-V的投入：包括某些用于下一版本的安全创新。虚拟机隔离是核心，即帮助你保护共享环境中的资源。现在你可以通过一个署名模板测试创建一个屏蔽虚拟机，以及该新屏蔽虚拟机的其他功能。你还可以发现Windows Server扮演的全新角色----Host Guardian Service，管理员可以识别合法主机。

## 工作负载支持

用于增强关键工作复杂支持的附加特性和功能包括：

- 借助拥有OpenGL支持的Remote Desktop Services提高应用兼容性。
- 借助Storage Replica，对面向延展集群的站点感知而改进业务连续性场景。
- 通过为SQL Server集群删除特定域容器而增加灵活性。
- 管理：System Center的特性也得到增强，让您更轻松地管理虚拟化环境，包括支持滚动升级、隔离虚拟机、支持受保护主机以及自动维护窗口。

Windows Server 2016增强特性简化了新功能的管理。包括对Virtual Machine Manager的改进，如支持集群节点滚动升级，支持Nano Server作为主机和文件服务器。通过轻松管理隔离虚拟机和受保护主机，你还可以充分利用针对共享环境的安全增强功能。在存储方面，你会看到改进的功能，以保持满足预期的端对端服务质量（QoS）和更快速的数据（使用存储分层）检索。在Operations Manager中，Windows Server 2016侧重于通过管理包的可发现性，和使用PowerShel自动化维护窗口的能力，来提升用户体验。

## Windows Server 2016远程桌面特性

- 显示性能提升 ---- 离散设备分配（DDA）技术可以为远程桌面模拟提供全性能的图形处理服务
- 连接表 ---- 展示全新RD Connection Broker的可靠性，可以处理大量并发性连接请求
- 优化云服务 ---- Azure QuickStart在Azure架构的远程桌面上表现出可扩展性和强大的部署能力

## 在系统常规使用方面，Windows Server 2016还有以下细节内容：

- Windows Server 2016开机后会自动打开"**服务器管理器**"，方便管理员操作。

- 该系统中是无法使用应用商店、Cortana和Edge浏览器的，后两项都被传统功能替代，分别为"**搜索**"和IE11浏览器（安全增强模式）。

- 搜索不包括Cortana

Windows Server 2016和常规Win10一周年更新系统一样，支持开始菜单、开始屏幕、任务视图、虚拟桌面、通知中心和平板模式等等。更多新特性可以查看微软官方电子书《介绍Windows Server 2016》。

## Windows Server 2016发布了四个版本

Essentials，Hyper-V server，Standard和Datacenter，三个部署计划----Server with Desktop Experience（带桌面环境），Server Core（核心）和Nano Server（轻量级），这次的Server 2016不仅是重量级的虚拟化管理程序，也是轻量云应用容器，但众口难调，许多用户目前仍处于观望状态，并没打算成为第一批"吃螃蟹"的人。

- Hyper-V：免费，只授权给Hyper-V主机

- Essentials：针对25用户和50个设备的小企业
- Standard：只包括2个VM或运行Windows服务器Hyper-V容器的许可证
- Datacenter：许可证可运行无限个VM，直接存储空间、存储副本、屏蔽虚拟机和高级网络。
- Storage：只能捆绑在一个存储设备上

## KMS激活

- Windows Server 2016 数据中心：**CB7KF-BWN84-R7R2Y-793K2-8XDDG**
- Windows Server 2016 标准版：**WC2BQ-8NRM3-FDDYY-2BFGV-KHKQY**
- Windows Server 2016 嵌入式版：**JCKRF-N37P4-C2D82-9YXRT-4M63B**
