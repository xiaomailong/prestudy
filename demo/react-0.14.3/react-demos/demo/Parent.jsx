var React = require("react/addons");
var Child = require("./Child.jsx");

var Parent = React.createClass({
  getInitialState: function () {
    return {
      //题目编号
      name: [
        "judge-1", "judge-2", "judge-3",
      ],
      //题目名称
      label: [
        "do you think yxy is handsome?", "do you like this boke?", "do you want to know React?",
      ],
      //用户默认选项
      value1: "true",
      value2: "false",
      value3: "true"
    }
  },
  handleChange: function (value, event) {
    var newState = {};
    //通过子组件传过来的value改变当前父组件的value
    newState[value] = event.target.value;
    //设置新状态
    this.setState(newState);
  },
  handleSubmit: function (event) {
    //取消提交默认事件
    event.preventDefault();
    //打印父组件存放的数据
    console.log(this.state);
  },
  render: function () {
    var renderChilds = [];
    renderChilds = this.state.name.map(function (value, index) {
      return (
        <Child name={this.state.name[index]} label={this.state.label[index]} onChange={this
          .handleChange
          .bind(this, "value" + (index + 1))}></Child>
      );
    }.bind(this));
    return (
      <form onSubmit={this.handleSubmit}>
        {renderChilds}
        <button type="submit">提交</button>
      </form>
    );
  }
});

module.exports = Parent;
