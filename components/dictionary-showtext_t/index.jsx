/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var DefBox = React.createClass({
  getInitialState: function() {
    return {openBox:false,id:0,ch:""};
  }, 
  openDialog:function() {
   // if(this.props.openBox) this.refs.dictdialog.getDOMNode().classList.add("opened");
  },
  closeDialog:function() {
    //this.refs.dictdialog.getDOMNode().classList.remove("opened");
    this.setState({openBox:false});
    this.props.popStack(this.props.terms.length,true);
  },
  componentWillReceiveProps: function(nextprops) {
    this.setState({openBox:nextprops.openBox});
  },
  todosearch: function(e) {
    //this.props.ids.push(e.target.id);
    var ch=e.target.textContent;
    this.props.dosearch(e);
  },
  renderTerm: function(item,termIndex) {
      return (
      <div data-term={item[0]} onClick={this.todosearch}>
        <div>{item}</div>
      </div>
      )
  },
  render: function() {
    var d=this.props.def || [["no result"]];
    var def=d.map(this.renderTerm);
   // this.openDialog();
    var opened=this.state.openBox?" opened":"";
    return (
      <div>
        <div className={"modalDialog"+opened} ref="dictdialog">
        <a href="#" onClick={this.closeDialog} 
          title="Close" className="modalClose"> X </a>
        
        {def}
        </div>
      </div>
      );
  }
});
var showtext_t = React.createClass({
  getInitialState: function() {
    return {openBox:false,terms:[],tofinds:[],ids:[]};
  },
  popStack: function(popTime,clearAll) {
    for(var i=0; i<popTime; i++){
      this.state.terms.pop();
      this.state.tofinds.pop();
      this.state.ids.pop();
      //this.setState({terms:newTerms,tofinds:newTofinds,ids:newIds});
    }
    if(clearAll)this.state.tofinds.pop();
  },
  getTerm: function(e) {
    var target=e.target;
    while(target && typeof target.dataset.term == "undefined"){
      target=target.parentElement;
    }
    if(!target) return "";

    return target.dataset.term;
  },
  dosearch: function(e) {
    $('span[id=]').removeClass("highlight");
    if(!e.target || e.target.nodeName != "SPAN") return;
    var id=e.target.id || "";
    var tofind=e.target.textContent;
    var next=e.target.nextSibling;
    var prev=e.target.previousSibling;
    for(var i=0;i<5;i++){
      if(!next) break;     
      tofind+=next.textContent;     
      next=next.nextSibling;         
    }

    for(var j=0;i<5;j++){
      if(!prev) break;
      tofind=prev.textContent+tofind;
      prev=prev.previousSibling;
    }
    console.log(tofind);
    this.props.exhaustiveFind(tofind);
    var term=this.getTerm(e);
    this.state.tofinds.push(tofind);
    if(term != "") this.state.terms.push(term);
    if(id != "") this.state.ids.push(id);
    var l=this.state.terms.length;
    if(this.state.terms[l-1] && this.state.terms[l-2] && this.state.terms[l-1]==this.state.terms[l-2]){
      this.state.ids[this.state.ids.length-2]=this.state.ids[this.state.ids.length-1];
      this.popStack(1,false);
    }
    this.setState({openBox:true});
  },
  render: function() {
    return (
      <div ref="text" onClick={this.dosearch}>
      <span>དགག་</span><span>དབྱེ་</span><span>དབྱར་</span><span>དང་</span><span>ཀོ་</span><span>ལྤགས་</span><span>གཞི།</span><span> །</span><span>སྨན་</span><span>དང་</span><span>གོས་</span><span>དང་</span><span>སྲ་</span><span>བརྐྱང་</span><span>དང་</span><span>།</span><span> །</span><span>ཀཽ་</span><span>ཤམ་</span><span>བི་</span><span>དང་</span><span>ལས་</span><span>ཀྱི་</span><span>གཞི།</span><span> །</span><span>དམར་</span><span>སེར་</span><span>ཅན་</span><span>དང་</span><span>གང་</span><span>ཟག་</span><span>དང་</span><span>།</span><span> །</span><span>སྤོ་</span><span>དང་</span><span>གསོ་</span><span>སྦྱོང་</span><span>བཞག་</span><span>པ་</span><span>དང་</span><span>།</span><span> །</span><span>གནས་</span><span> མལ་</span><span>དང་</span><span>ནི་</span><span>རྩོད་</span><span>པ་</span><span>དང་</span><span>།</span><span> །</span><span>དགེ་</span><span>འདུན་</span><span>དབྱེན་</span><span>རྣམས་</span><span>བསྡུས་</span><span>པ་</span><span>ཡིན།</span><span> །</span><span>རབ་</span><span>ཏུ་</span><span>བྱུང་</span><span>བའི་</span><span>སྤྱི་</span><span>སྡོམ་</span><span>ལ།</span><span> ཤཱ་</span><span>རིའི་</span><span>བུ་</span><span>དང་</span><span>མུ་</span><span>སྟེགས་</span><span>ཅན།</span><span> །</span><span>དགེ་</span><span>ཚུལ་</span><span>གཉིས་</span><span>དང་</span><span>བྱ་</span><span>རོག་</span><span>སྐྲོད།</span><span> །</span><span>དགྲ་</span><span>བཅོམ་</span><span>བསད་</span><span>དང་</span><span> ལག་</span><span>རྡུམ་</span><span>གྱི།</span><span> །</span><span>སྡེ་</span><span>ཚན་</span><span>ཡང་</span><span>དག་</span><span>བསྡུས་</span><span>པ་</span><span>ཡིན།</span><span> །</span><span>སྡོམ་</span><span>ལ་</span><span>ཤཱ་</span><span>རིའི་</span><span>བུ་</span><span>དང་</span><span>རབ་</span><span>འབྱུང་</span><span>དང་</span><span>།</span><span> །</span><span>བསྙེན་</span><span>པར་</span><span>རྫོགས་</span><span>པར་</span><span>གནང་</span><span>བ་</span><span>དང་</span><span>།</span><span> །</span><span>ཉེ་</span><span>སྡེས་</span><span>ཚོགས་</span><span>ནི་</span><span>བསྡུས་</span><span>པ་</span><span>དང་</span><span>།</span><span> །</span><span>ལྔ་</span><span>པའི་</span><span>སྡེ་</span><span>ཚན་</span><span>བསྡུས་</span><span> པ་</span><span>ཡིན།</span><span> །</span><span>བྱང་</span><span>ཆུབ་</span><span>སེམས་</span><span>དཔའ་</span><span>དགའ་</span><span>ལྡན་</span><span>གྱི་</span><span>གནས་</span><span>ན་</span><span>བཞུགས་</span><span>པ་</span><span>ན།</span><span> ཡུལ་</span><span>ཨང་</span><span>ག་</span><span>དག་</span><span>ན་</span><span>ཨང་</span><span>གའི་</span><span>རྒྱལ་</span><span>པོ་</span><span>ཞེས་</span><span>བྱ་</span><span>བས་</span><span>རྒྱལ་</span><span>སྲིད་</span><span>འབྱོར་</span><span>པ་</span><span>རྒྱས་</span><span>པ་</span><span>བདེ་</span><span>བ་</span><span>ལོ་</span><span>ལེགས་</span><span>པ་</span><span>སྐྱེ་</span><span>བོ་</span><span>དང་</span><span>མི་</span><span>མང་</span><span>པོས་</span><span> གང་</span><span>བ་</span><span>བྱེད་</span><span>དུ་</span><span>བཅུག་</span><span>གོ།</span><span> །</span><span>།</span><span>ཡུལ་</span><span>མ་</span><span>ག་</span><span>དྷ་</span><span>དག་</span><span>ན་</span><span>ཡང་</span><span>རྒྱལ་</span><span>པོ་</span><span>པད་</span><span>མ་</span><span>ཆེན་</span><span>པོ་</span><span>ཞེས་</span><span>བྱ་</span><span>བས།</span><span> རྒྱལ་</span><span>སྲིད་</span><span>འབྱོར་</span><span>པ་</span><span>རྒྱས་</span><span>པ་</span><span>བདེ་</span><span>བ་</span><span>ལོ་</span><span>ལེགས་</span><span>པ་</span><span>སྐྱེ་</span><span>བོ་</span><span>དང་</span><span>མི་</span><span>མང་</span><span>པོས་</span><span>གང་</span><span>བ་</span><span>བྱེད་</span><span>དུ་</span><span>བཅུག་</span><span>གོ།</span><span> རེས་</span><span>འགའ་</span><span>ནི་</span><span>ཨང་</span><span>གའི་</span><span>རྒྱལ་</span><span>པོ་</span><span>དཔུང་</span><span>དང་</span><span>མཐུ་</span><span>ཆེ་</span><span>བ་</span><span>ཡིན་</span><span>ལ།</span><span> རེས་</span><span>འགའ་</span><span>ནི་</span><span>རྒྱལ་</span><span>པོ་</span><span>པད་</span><span>མ་</span><span>ཆེན་</span><span>པོ་</span><span>དཔུང་</span><span>དང་</span><span>མཐུ་</span><span>ཆེ་</span><span>བ་</span><span>ཡིན་</span><span>ནོ།</span><span> །</span><span>གང་</span><span>གི་</span><span>ཚེ་</span><span>ཨང་</span><span>གའི་</span><span>རྒྱལ་</span><span>པོ་</span><span>དཔུང་</span><span>དང་</span><span>མཐུ་</span><span>ཆེ་</span><span>བ་</span><span>དེའི་</span><span>ཚེ་</span><span>ན།</span><span> དེས་</span><span>དཔུང་</span><span>གི་</span><span>ཚོགས་</span><span>ཡན་</span><span>ལག་</span><span>བཞི་</span><span>པ།</span><span> གླང་</span><span>པོ་</span><span>ཆེ་</span><span>པའི་</span><span>ཚོགས་</span><span>དང་</span><span>།</span><span> རྟ་</span><span>པའི་</span><span>ཚོགས་</span><span>དང་</span><span>།</span><span> ཤིང་</span><span>རྟ་</span><span>པའི་</span><span>ཚོགས་</span><span>དང་</span><span>།</span><span> དཔུང་</span><span>བུ་</span><span>ཆུང་</span><span>གི་</span><span>ཚོགས་</span><span>གོ་</span><span>བསྐོན་</span><span>ཏེ།</span><span> ཡུལ་</span><span>མ་</span><span>ག་</span><span>དྷ་</span><span>རྒྱལ་</span><span>པོའི་</span><span> ཁབ་</span><span>མ་</span><span>གཏོགས་</span><span>པ་</span><span>བཅོམ་</span><span>ནས་</span><span>ཕྱིར་</span><span>ལྡོག་</span><span>པར་</span><span>བྱེད་</span><span>དོ།</span><span> །</span><span>གང་</span><span>གི་</span><span>ཚེ་</span><span>རྒྱལ་</span><span>པོ་</span><span>པད་</span><span>མ་</span><span>ཆེན་</span><span>པོ་</span><span>དཔུང་</span><span>དང་</span><span>མཐུ་</span><span>ཆེ་</span><span>བ་</span><span>དེའི་</span><span>ཚེ་</span><span>ན།</span><span> དེས་</span><span>ཀྱང་</span><span>དཔུང་</span><span>གི་</span><span>ཚོགས་</span><span>ཡན་</span><span>ལག་</span><span>བཞི་</span><span>པ།</span><span> གླང་</span><span>པོ་</span><span>ཆེ་</span><span>པའི་</span>
      <DefBox exhaustiveFind={this.props.exhaustiveFind} def={this.props.def} dosearch={this.dosearch} openBox={this.state.openBox} terms={this.state.terms} tofinds={this.state.tofinds} ids={this.state.ids} popStack={this.popStack} />
      </div>
    );
  }
});
module.exports=showtext_t;