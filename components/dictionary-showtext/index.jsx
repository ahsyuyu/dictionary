/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 
var Breadcrumb = React.createClass({
  getInitialState: function() {
    return {index:0};
  }, 
  componentDidUpdate: function() {
    var id=this.props.ids[this.state.index];
    $('span[id=]').removeClass("highlight");
    $('span[id="'+id+'"]').addClass("highlight");
    console.log(id);
  },
  toPopStack: function(index) {
    var popTime=this.props.terms.length-1-index;
    this.props.popStack(popTime);
  },
  search: function(e) {
    var tofind=e.target.parentElement.dataset.tofind;
    var index=e.target.parentElement.dataset.index;
    this.toPopStack(index);
    this.setState({index:index});
    this.props.exhaustiveFind(tofind);
  },
  renderBreadCrumb: function(term,index) {
    var tofind=this.props.tofinds[index];
    return (
      <a href="#" onClick={this.search} data-tofind={tofind} data-index={index}>{term}/</a>
      );
  },
  render: function() {
    var h=this.props.terms;
    var history=h.map(this.renderBreadCrumb);
    return (
      <div>
        {history}
      </div>
      );
  }
});

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
  renderUsgDef: function(entries,termIndex) {
    var out=[];
    for(var i=0; i<(entries.length-1)/2; i++){
      var spanDef=entries[(i+1)*2].replace(/./g,function(ch,idx){ 
        return '<span id="s'+(termIndex*65536+i*8912+idx)+'">'+ch+'</span>';
      });
      out.push(
              <div>
                <div className="usg">【{entries[(i+1)*2-1]}】</div>
                <div className="def" dangerouslySetInnerHTML={{__html: spanDef}}></div>
              </div>
              );
    } 
    return out;   
  },
  renderTerm: function(item,termIndex) {
    var usg_def=this.renderUsgDef(item,termIndex);
      return (
      <div data-term={item[0]} onClick={this.todosearch}>
        <div className="term">{item[0]}</div>
        {usg_def}
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
        <Breadcrumb exhaustiveFind={this.props.exhaustiveFind} dosearch={this.props.dosearch} terms={this.props.terms} tofinds={this.props.tofinds} ids={this.props.ids} popStack={this.props.popStack} />
        {def}
        </div>
      </div>
      );
  }
});
var showtext = React.createClass({
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
    for(var i=0;i<9;i++){
      if(!next || next.textContent.match(/[。，、「」：]/g)) break;     
      tofind+=next.textContent;     
      next=next.nextSibling;         
    }

    for(var j=0;i<9;j++){
      if(!prev || prev.textContent.match(/[。，、「」：]/g)) break;
      tofind=prev.textContent+tofind;
      prev=prev.previousSibling;
    }
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
    console.log(this.state.tofinds);
    console.log(this.state.terms);
    console.log(this.state.ids);
    return (
      <div>
        <div ref="text" onClick={this.dosearch}>
<span>摩</span><span>訶</span><span>般</span><span>若</span><span>波</span><span>羅</span><span>蜜</span><span>多</span><span>心</span><span>經</span>


<span>觀</span><span>自</span><span>在</span><span>菩</span><span>薩</span>。<span>行</span><span>深</span><span>波</span><span>若</span><span>波</span><span>羅</span><span>蜜</span><span>多</span><span>時</span>。<span>照</span><span>見</span><span>五</span><span>蘊</span><span>皆</span><span>空</span>。

<span>度</span><span>一</span><span>切</span><span>苦</span><span>厄</span>。<span>舍</span><span>利</span><span>子</span>。<span>色</span><span>不</span><span>異</span><span>空</span>。<span>空</span><span>不</span><span>異</span><span>色</span>。

<span>色</span><span>即</span><span>是</span><span>空</span>。<span>空</span><span>即</span><span>是</span><span>色</span>。<span>受</span><span>想</span><span>行</span><span>識</span>。<span>亦</span><span>復</span><span>如</span><span>是</span>。

<span>舍</span><span>利</span><span>子</span>。<span>是</span><span>諸</span><span>法</span><span>空</span><span>相</span>。<span>不</span><span>生</span><span>不</span><span>滅</span>。<span>不</span><span>垢</span><span>不</span><span>淨</span>。

<span>不</span><span>增</span><span>不</span><span>減</span>。<span>是</span><span>故</span><span>空</span><span>中</span><span>無</span><span>色</span>。<span>無</span><span>受</span><span>想</span><span>行</span><span>識</span>。

<span>無</span><span>眼</span><span>耳</span><span>鼻</span><span>舌</span><span>身</span><span>意</span>。<span>無</span><span>色</span><span>身</span><span>香</span><span>味</span><span>觸</span><span>法</span>。

<span>無</span><span>眼</span><span>界</span>。<span>乃</span><span>至</span><span>無</span><span>意</span><span>識</span><span>界</span>。

<span>無</span><span>無</span><span>明</span>。<span>亦</span><span>無</span><span>無</span><span>明</span><span>盡</span>。<span>乃</span><span>至</span><span>無</span><span>老</span><span>死</span>。<span>亦</span><span>無</span><span>老</span><span>死</span><span>盡</span>。

<span>無</span><span>苦</span><span>集</span><span>滅</span><span>道</span>。<span>無</span><span>智</span>。<span>亦</span><span>無</span><span>得</span>。<span>以</span><span>無</span><span>所</span><span>得</span><span>得</span><span>故</span>。

<span>菩</span><span>提</span><span>薩</span><span>埵</span>。<span>依</span><span>般</span><span>若</span><span>波</span><span>羅</span><span>蜜</span><span>多</span><span>故</span>。<span>心</span><span>無</span><span>罣</span><span>礙</span>。

<span>無</span><span>罣</span><span>礙</span><span>故</span>。<span>遠</span><span>離</span><span>顛</span><span>倒</span><span>夢</span><span>想</span>。<span>究</span><span>竟</span><span>涅</span><span>盤</span>。

<span>三</span><span>世</span><span>諸</span><span>佛</span>。<span>依</span><span>波</span><span>若</span><span>波</span><span>羅</span><span>蜜</span><span>多</span><span>故</span>。

<span>得</span><span>阿</span><span>藐</span><span>多</span><span>羅</span><span>三</span><span>藐</span><span>三</span><span>菩</span><span>提</span>。<span>故</span><span>知</span><span>般</span><span>若</span><span>波</span><span>羅</span><span>蜜</span><span>多</span>。

<span>是</span><span>大</span><span>神</span><span>咒</span>。<span>是</span><span>大</span><span>明</span><span>咒</span>。<span>是</span><span>無</span><span>上</span><span>咒</span>。

<span>是</span><span>無</span><span>等</span><span>等</span><span>咒</span>。<span>能</span><span>除</span><span>一</span><span>切</span><span>苦</span>。<span>真</span><span>實</span><span>不</span><span>虛</span>。

<span>故</span><span>說</span><span>波</span><span>若</span><span>波</span><span>羅</span><span>蜜</span><span>多</span><span>咒</span>。<span>即</span><span>說</span><span>咒</span><span>曰</span>。

<span>揭</span><span>諦</span><span>揭</span><span>諦</span>。<span>波</span><span>羅</span><span>揭</span><span>諦</span>。<span>波</span><span>羅</span><span>僧</span><span>揭</span><span>諦</span>。<span>菩</span><span>提</span><span>薩</span><span>婆</span><span>訶</span>。
        </div>

        <DefBox exhaustiveFind={this.props.exhaustiveFind} def={this.props.def} dosearch={this.dosearch} openBox={this.state.openBox} terms={this.state.terms} tofinds={this.state.tofinds} ids={this.state.ids} popStack={this.popStack} />
        
      </div>
    );
  }
});
module.exports=showtext;