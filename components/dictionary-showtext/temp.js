/** @jsx React.DOM */

/* to rename the component, change name of ./component.js and  "dependencies" section of ../../component.js */

//var othercomponent=Require("other"); 

var showtext = React.createClass({
  getInitialState: function() {
    return {};
  },
  openDialog:function() {
    this.refs.dictdialog.getDOMNode().classList.add("opened");
  },
  closeDialog:function() {
    this.refs.dictdialog.getDOMNode().classList.remove("opened");
  },
  dosearch: function(e) {
    if(e.target.nodeName != "SPAN") return;
    var text=e.target.textContent;
    var next=e.target.nextSibling;
    var prev=e.target.previousSibling;
    for(var i=0;i<9;i++){
      if(!next || next.textContent.match(/[。，、「」：]/g)) break;     
      text+=next.textContent;     
      next=next.nextSibling;         
    }

    for(var j=0;i<9;j++){
      if(!prev || prev.textContent.match(/[。，、「」：]/g)) break;
      text=prev.textContent+text;
      prev=prev.previousSibling;
    }

    this.props.exhaustiveFind(text);
    this.setState({tofind:text});
    this.openDialog();
    console.log(text);
  },
  renderUsgDef: function(item) {
    var out=[];
    for(var i=1; i<=(item.length-1)/2; i++){
      var spanDef=item[i*2].replace(/(.)/g,function(i){ return "<span>"+i+"</span>";});
      out.push(
              <div>
                <div className="usg">【{item[i*2-1]}】</div>
                <div className="def" dangerouslySetInnerHTML={{__html: spanDef}}></div>
              </div>
              );
    } 
    return out;   
  },
  renderForm: function(item) {
    var usg_def=this.renderUsgDef(item);
      return (
      <div onClick={this.dosearch}>
        <div className="form">{item[0]}</div>
        {usg_def}
      </div>
      )
  },
  render: function() {
    var d=this.props.def || [["no result"]];
    var def=d.map(this.renderForm);
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

        <div className="modalDialog" ref="dictdialog">
          <a href="#" onClick={this.closeDialog} 
            title="Close" className="modalClose"> X </a>
            {def}
        </div>

      </div>
    );
  }
});
module.exports=showtext;