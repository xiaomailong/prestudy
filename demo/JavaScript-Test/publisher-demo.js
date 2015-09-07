(function() {
  console.log("\n---发布-订阅（Publish/Subscribe）模式");
  //发布者
  function Publisher() {
    this.observers = [];
    var state = ""; //让该内容不能直接访问

    //新增两个对于state的操作 获取/更新
    this.getState = function() {
      return state;
    }
    this.setState = function(value) {
      state = value;
      this.notice();
    }

  }
  Publisher.prototype.addOb = function(observer) {
    var flag = false;
    for (var i = this.observers.length - 1; i >= 0; i--) {
      if (this.observers[i] === observer) {
        flag = true;
      }
    };
    if (!flag) {
      this.observers.push(observer);
    }
    return this;
  }
  Publisher.prototype.removeOb = function(observer) {
    var observers = this.observers;
    for (var i = 0; i < observers.length; i++) {
      if (observers[i] === observer) {
        observers.splice(i, 1);
      }
    };
    return this;
  }
  Publisher.prototype.notice = function() {
    var observers = this.observers;
    for (var i = 0; i < observers.length; i++) {
      observers[i].update(this.getState()); //获取发布者的内容
    };
  }


  //订阅者
  function Subscribe() {
    this.update = function(data) {
      console.log(data);
    };
  }

  //实际应用
  var oba = new Subscribe();
  var obb = new Subscribe();

  var pba = new Publisher();

  pba.addOb(oba);
  pba.addOb(obb);

  oba.update = function(state) {
    console.log(state + "hello!");
  }
  obb.update = function(state) {
    console.log(state + "world!");
  }
  pba.setState("open "); //发布者更新了内容
})();

(function() {
  console.log("\n---三个文本框ABC，其中A可编辑，B与C不可编辑且B的值是A的值加上后缀@w3c.com,C的值是A的值加上前缀ID-");
  //发布者
  function Publisher(obj) {
    this.observers = [];
    var state = obj.value; //让该内容不能直接访问

    //新增两个对于state的操作 获取/更新
    this.getState = function() {
      return state;
    }
    this.setState = function(value) {
      state = value;
      this.notice();
    }
    this.obj = obj;

  }
  Publisher.prototype.addOb = function(observer) {
    var flag = false;
    for (var i = this.observers.length - 1; i >= 0; i--) {
      if (this.observers[i] === observer) {
        flag = true;
      }
    };
    if (!flag) {
      this.observers.push(observer);
    }
    return this;
  }
  Publisher.prototype.removeOb = function(observer) {
    var observers = this.observers;
    for (var i = 0; i < observers.length; i++) {
      if (observers[i] === observer) {
        observers.splice(i, 1);
      }
    };
    return this;
  }
  Publisher.prototype.notice = function() {
    var observers = this.observers;
    for (var i = 0; i < observers.length; i++) {
      observers[i].update(this.getState());
    };
  }

  //订阅者
  function Subscribe(obj) {
    this.obj = obj;
    this.update = function(data) {
      this.obj.value = data;
    };
  }

  //实际应用
  var oba = new Subscribe(document.querySelector("#oba"));
  var obb = new Subscribe(document.querySelector("#obb"));

  var pba = new Publisher(document.querySelector("#pba"));

  pba.addOb(oba);
  pba.addOb(obb);

  oba.update = function(state) {
    this.obj.value = state + "@w3c.com";
  }
  obb.update = function(state) {
    this.obj.value = "ID-" + state;
  }

  pba.obj.addEventListener('keyup', function() {
    pba.setState(this.value);
  });
})();
