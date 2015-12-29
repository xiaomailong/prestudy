var React = require("react/addons");

// 判断题可以看作对和错只能选一个的题目，因此是一个单选框
var Child = React.createClass({
  // 状态对象包含判断题的当前选项的值
  // @param : value
  // @key : true,false
  getInitialState: function () {
    return {value: "true"};
  },
  handleChange: function (event) {
    //通过事件委托连接子组件和父组件，将子组件中的value状态传入到父组件中
    if (this.props.onChange) {this.props.onChange(event);}
    //更改子组件的状态，重新渲染UI上。
    this.setState({value: event.target.value});
  },
  render: function () {
    return (
      <div>
        <label>{this.props.label}</label>
        <input type="radio" name={this.props.name} checked={this.state.value == "true"} value="true" onChange={this.handleChange}/>
        "true"
        <input type="radio" name={this.props.name} checked={this.state.value == "false"} value="false" onChange={this.handleChange}/>
        "false"
      </div>
    )
  }
});

module.exports = Child;
