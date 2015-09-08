// Javascript 之 观察者模式

// 观察者模式:定议
// 定义对象间的一种一对多的关系，当一个对象状态改变时 (一般称为被观察者)，依赖于该对象的对象被通知，并更新;

// 观察者模式:说明
// 1. 观察者模式是行为模式，也被称为：发布-订阅模式、模型-视图模式、源-监听器模式、从属者模；
// 2. 面对象过程中观察者模式的组成:
// 　　1>. 抽象主题角色：这个角色里，定义维护了一份对观察者列表的管理集，一组用数组来存放，
//                    并定义了对一些基础的接口，比如用来添加跟删除观察者的方法；
// 　　2>. 具体主题角色：这个角色，对于与客户，具体业务状态数据交互，并做一定的处理，然后再通知各个观察者 更新自己;
// 　　    抽象跟具体主题里的 一些常用的方法接口，如果 add|delete 或 notified方法，在哪个方法不是固定的;
//         add跟delete也可以出现在 具体的主题角色里；
// 　　3>. 抽象观察者角色：为所有观察者定义一个统一的接口，这个接口叫更新接口；
// 　　4>. 具体观察者角色：实现抽象观察者角色的各自的更新方法；
// 3. 执行过程：
// 4. 观察者模式-结构图:
// 5. 场景实例描述:
// 6. 观察者模式所应用到的原则: 对象的单一性质原则，开闭原则等；
//    开闭原则所体现到的就是面对对象编码所提到要以接口来编程的原则，这样程序对象间就可以更好的复用及解耦;
// 7. 观察者模式主要组成: 被观察对象(目标对象, 具体对象, 主题), 观察者 (订阅者, 监听者), 事件(更新方法);
// 8. 当具体观察者对象的更新方法接收为普通类型数据,比如 string 时, 一般称为“推”模式；
// 　　当更新方法传递的是，被观察者(具体主题对象)时，一般被称为“拉”模式；

class Subject {
  constructor() {
    this.Observers = [];
  }

  add(observer) {
    this.Observers.push(observer);
  }

  remove(observer) {
    for (let idx in this.Observers) {
      if (this.Observers[idx] == observer) {
        this.Observers[idx].splice(idx, 1);
        break;
      }
    }
  }

  //推模式
  notifyState(info) {
    for (let idx in this.Observers) {
      this.Observers[idx].update(info)
    }
  }

  //接模式
  notifyObservers(subject) {
    for (let idx in this.Observers) {
      this.Observers[idx].updateSubject(subject)
    }
  }
}

class ConcreteSubject extends Subject {
  constructor() {
    super();
  }

  operate() {
    var state = 'info';
    this.notifyState(state);
    this.notifyObservers(this);
  }
}

class ConcreteObserverA {
  constructor() {}

  update(info) {
    console.log('A Observer' + info);
  }　　
  updateSubject(subject) {
    console.log('A Observer object');
  }
}

class ConcreteObserverB {
  constructor() {}

  update(info) {
    console.log('B Observer' + info);
  }　　
  updateSubject(subject) {
    console.log('B Observer object');
  }
}

var subject = new ConcreteSubject();
var aobserver = new ConcreteObserverA();
var bobserver = new ConcreteObserverB();
subject.add(aobserver);
subject.add(bobserver);
subject.operate();
