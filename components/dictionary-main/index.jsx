/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var Showtext=Require("showtext"); 
var Showtext_t=Require("showtext_t");
var Dictionary=Require("dictionary");
var api=Require("dataset").api; 
var dingfubao=Require("dataset").dingfubao; 
var mahavyutpatti=Require("dataset").mahavyutpatti; 
// var entries=Require("dataset").entries; 
// var indexes=Require("dataset").indexes; 
var entries=Require("dataset").entries_m; 
var indexes=Require("dataset").indexes_m; 
var main = React.createClass({
  getInitialState: function() {
    return {};
  },
  exhaustiveFind: function(tofind) {
    var out=[];
    this.setState({tofind:tofind});
    for(var i=0; i<tofind.length; i++){
      for(var j=2;j<tofind.length+1-i; j++){
        var index=api.indexOfSorted(entries,tofind.substr(i,j));
        if(index) out.push(mahavyutpatti[indexes[index]]);
      }
    }
    out.length != 0 ? this.setState({def:out}) : this.setState({def:null});
  },

  render: function() {
    return (
      <div>

        <br/><br/>
        <Showtext_t exhaustiveFind={this.exhaustiveFind} def={this.state.def}/>

      </div>
    );
  }
});
module.exports=main;