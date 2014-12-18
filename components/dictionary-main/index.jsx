/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var Showtext=Require("showtext"); 
var Dictionary=Require("dictionary");
var exhaustiveFind=Require("dataset").api.exhaustiveFind; 
var dingfubao=Require("dataset").dingfubao; 
var sort_key=Require("dataset").sort_key; 
var main = React.createClass({
  getInitialState: function() {
    return {};
  },
  exhaustiveFind: function(tofind) {
    var out=[];
    this.setState({tofind:tofind});
    for(var i=0; i<tofind.length; i++){
      for(var j=2;j<tofind.length+1-i; j++){
        var res=this.search(tofind.substr(i,j));
        if(res.length != 0) {
          res.map(function(item){
            out.push(dingfubao[item[1]]);
          });
        }
      }
    }
    console.log(out);
    this.setState({def:out});
  },
  search: function(tofind) {
    var out=[];
    sort_key.map(function(item){
      if(tofind.length == item[0].length && item[0].match(tofind)){
        out.push(item);
      }
    });
    return out;
  },
  render: function() {
    return (
      <div>
        Rendering main
        <Showtext exhaustiveFind={this.exhaustiveFind} def={this.state.def}/>


      </div>
    );
  }
});
module.exports=main;