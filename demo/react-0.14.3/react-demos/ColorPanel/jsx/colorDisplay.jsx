var ColorDisplay = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.selectedColor.id !== nextProps.selectedColor.id;
  },
  render: function() {
    console.log('Render Color Display Component');
    return (
      <div className="color-display">
        <div className={this.props.selectedColor.value}>
          {this.props.selectedColor.title}
        </div>
      </div>
    );
  }
});
