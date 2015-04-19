/**
 * 	StressorApp component listens for changes in the store and passes 
 * the new data to its children.
 */

var React = require('react');
var StressorApp = React.createClass({

	/**
   * @return {object}
   */
  render: function() {
  	return <div>Hello {this.props.name}</div>;
  }

});

module.exports = StressorApp;
