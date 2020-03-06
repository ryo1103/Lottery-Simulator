/* eslint-disable */
//无语了不加这个rendercards就会出错 这种检验就很迷我不懂啊
import React from 'react';
import sea from './sea.jpg'
import summer from './summer.png'
import comic from './comic.png'
import './App.css';
//<img src={probs.back}></img>
function Card(probs){
  console.log("card")
  //无语了这个旋转是这样表示的啧啧
if (probs.face=="back"){
  //这里返回的含义是什么呢怎么让我直接在大板上直接触发翻牌的特效？
  const zindex =5-probs.id
  const l=Math.floor(Math.random()*700)-200
  //const l=-40
  const t=-Math.random()*300
  const r =Math.floor((0.5-Math.random())*140)//0到70度之间
  console.log(`旋转的角度${r}左移的位置${l}`)
  return (
    <div className="card" onClick={() => probs.onClick()}style={{backgroundImage:`url(${probs.back})`,zIndex:zindex,left:`${l}.px`,
    transform:`rotate(${r}deg)`}} >
    </div>
  )
}else{
//在head和tail位置用背景插入图片
  return (
    <div className="card-back">
      <div className="stripe"></div>
      <div className="message">{probs.message}</div>
      <div className="stripe"></div>
    </div>
  )
}}

//有一个变量确定是哪张图翻过来
//然后牌的添加是我加入一个关键字就生成一个牌
class Board extends React.Component{
  constructor(probs){
    super(probs)
    this.state={
      urls:[sea,summer,comic],//这里是牌面的连接
      messages:['a'],//这里储存我的输入
      start: false,
      hit: null,
      value:''
    }
    this.handlechange=this.handlechange.bind(this)
    this.handlesubmit=this.handlesubmit.bind(this)
    this.handlere=this.handlere.bind(this)
    //this.handlestart=this.handlestart.bind(this)  忘了这个是干嘛的了
    this.clear=this.clear.bind(this)
    this.todraw=this.todraw.bind(this)
  }
  /*handlechange(event){
    const val=event.target.value
    let m= this.state.messages.slice()
    m.push(event.target.value)
    this.setState({messages: m}//重点是input中输入的值是不是自动就是value
    )//这个dan的博客讲了但是我又给忘了 gg
  }*/
  handlechange(event){
    console.log(event.target.value)
    this.setState({value: event.target.value})
  }
  /*handlesubmit(event){
    event.preventDefault()
    this.setState({start:true})
  }*/
  handlesubmit(event){
    event.preventDefault()
    this.setState((state)=>{
      return {messages:state.messages.concat([state.value])}
    })
    this.setState({value:''})
    //果真就像dan的文章里面说的每次刷新都是在一个环境里，闭包的样子 
    //但是这里我为啥不能直接用target.value,setstate里面好像没有
    console.log(this.state.messages) 
  }
  //这是重新开始的选项
  handlere(){
    this.setState({start:false,hit:null,messages:[]})
  }
  //为什么方法一定要在构造函数中绑定不然在onclick中调用函数就会出错？？？
  todraw(){
    this.setState({hit:null})  
  }
  clear(){
    this.setState({messages:[]})
  }
  //为了一下子渲染很多牌所以在这里有东西   这里可以添加一个动态选择抽几张卡的选项
  random(){
    return this.state.urls[Math.floor(this.state.urls.length * Math.random())]
  }
  handleclick(i){
    console.log('选中纸牌')
    this.setState({hit:i})
  }
  rendercards(){
    console.log('rendercards')
    console.log(this.state.hit)
    //果真这里得是返回单独相应的组件而不是像list那样直接返回函数  有点意思 有点意思
    if (this.state.hit===null){
      //这里要把纸牌顺序打乱达到随机抽的效果
      const messages=this.state.messages
      messages.sort(() => {return Math.random() - .5})                               
      const items= messages.map((msg,index)=>{
      return <Card key={index} back={this.random()} message={msg} id={index} onClick={() => this.handleclick(index)} face="back"></Card>
    })
    console.log(`item is `)
    console.log(items)
    return items
    //return <Card back={this.state.urls[0]} message={this.state.messages[0]} face="front"></Card> //触发函数容易写错fuck
    }else{
      console.log(`message${this.state.messages}`)
      return <Card back={this.random()} message={this.state.messages[this.state.hit]} face="front"></Card>
    }

  }
  //渲染就是渲染 render就是render
  //输入那里可以设置一个退回的选项就和那个游戏是一样的思路
  //回调函数的绑定要注意，实际上绑定的原因我不太记得了 太糟糕了则
  //这里字符串的字可以改成悬浮的就是鼠标碰到它才显示
  //<input type="submit" value="输入结束" className="button"/>
  render(){
    if (this.state.start){
      //牌
      return (  
      <div className="info">  
        <div className="card-container">
          {this.rendercards()}
        </div>
        <div className="card-buttons">
        <span className="button button-left" onClick={this.handlere}>Start a new round</span>
        <span className="button button-right" onClick={this.todraw}>Regret to draw another lot</span>
        </div>
      </div>
      )
    }else{
      //输入关键词
      return (
      <div className="info">
        <div className="logo">
          <h1><span className="title">Lottery Simulator</span></h1>
          <h2><span className="slogan">Help you make a decision ！</span></h2>
        </div>
        <div className="body">
        <form onSubmit={this.handlesubmit}> 
          <span className="des" data-descr="input your choice!">
          <input type="text" value={this.state.value} onChange={this.handlechange} />
          </span>
        </form>
        <div className="first-button">
          <span className="button button-left" onClick={(e)=>{this.setState({start:true})}}>Start！</span>
          <span className="button button-right" onClick={this.clear}>Re-enter Options</span>
        </div>
        </div>
        <div className="footer"><span className="right-float">不知道用什么练手🎃♤写写试试：）</span></div>
      </div>
      
      )
    }
  }
}
export default Board;
