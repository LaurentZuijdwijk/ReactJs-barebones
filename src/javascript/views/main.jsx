var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});
window.addEventListener("load", function(){

	React.render(<HelloMessage name="World" />, document.getElementById('target'));
});