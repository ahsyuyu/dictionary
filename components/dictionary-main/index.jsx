/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var Showtext=Require("showtext"); 
var Dictionary=Require("dictionary");
var exhaustiveFind=Require("dataset").api.exhaustiveFind; 
var main = React.createClass({
  getInitialState: function() {
    return {};
  },
  search: function(tofind) {
    console.log(tofind);
    this.setState({tofind:tofind});
    var t=exhaustiveFind(tofind);
    console.log(t);
  },
  render: function() {
    return (
      <div>
        Rendering main
        <Showtext search={this.search}/>


      </div>
    );
  }
});
module.exports=main;