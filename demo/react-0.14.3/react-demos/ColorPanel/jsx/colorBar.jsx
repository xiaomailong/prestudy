var ColorBar = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    console.log('Render Color Bar Component');
    return (
      <ul>
        {this.props.colors.map(function (color) {
          return (
            <li className={color.value} key={color.id} onMouseOver={this.props.onColorHover.bind(null, color.id)} >
              {color.value}
            </li>
          )
        }, this)}
      </ul>
    );
  }
});
