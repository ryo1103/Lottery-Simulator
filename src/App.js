/* eslint-disable */
import React from 'react';
import sea from './sea.jpg'
import summer from './summer.png'
import comic from './comic.png'
import './App.css';

function Card(probs){
if (probs.face=="back"){
  const zindex =5-probs.id
  const l=Math.floor(Math.random()*700)-200
  const t=-Math.random()*300
  const r =Math.floor((0.5-Math.random())*140)//0到70度之间
  console.log(`旋转的角度${r}左移的位置${l}`)
  return (
    <div className="card" onClick={() => probs.onClick()}style={{backgroundImage:`url(${probs.back})`,zIndex:zindex,left:`${l}.px`,
    transform:`rotate(${r}deg)`}} >
    </div>
  )
}else{
  return (
    <div className="card-back">
      <div className="stripe"></div>
      <div className="message">{probs.message}</div>
      <div className="stripe"></div>
    </div>
  )
}}

//有一个变量确定是哪张图翻过来
//然后牌的添加是加入一个关键字就生成一个牌
class Board extends React.Component{
  constructor(probs){
    super(probs)
    this.state={
      urls:[sea,summer,comic],//这里是牌面的连接
      messages:['a'],//这里储存输入
      start: false,
      hit: null,
      value:''
    }
    this.handlechange=this.handlechange.bind(this)
    this.handlesubmit=this.handlesubmit.bind(this)
    this.handlere=this.handlere.bind(this)
    this.clear=this.clear.bind(this)
    this.todraw=this.todraw.bind(this)
  }

  handlechange(event){
    this.setState({value: event.target.value})
  }

  handlesubmit(event){
    event.preventDefault()
    this.setState((state)=>{
      return {messages:state.messages.concat([state.value])}
    })
    this.setState({value:''})
  }
  handlere(){
    this.setState({start:false,hit:null,messages:[]})
  }

  todraw(){
    this.setState({hit:null})  
  }
  clear(){
    this.setState({messages:[]})
  }
  random(){
    return this.state.urls[Math.floor(this.state.urls.length * Math.random())]
  }
  handleclick(i){
    this.setState({hit:i})
  }
  rendercards(){
    if (this.state.hit===null){
      const messages=this.state.messages
      messages.sort(() => {return Math.random() - .5})                               
      const items= messages.map((msg,index)=>{
      return <Card key={index} back={this.random()} message={msg} id={index} onClick={() => this.handleclick(index)} face="back"></Card>
    })
    return items
    //return <Card back={this.state.urls[0]} message={this.state.messages[0]} face="front"></Card> //触发函数容易写错fuck
    }else{
      return <Card back={this.random()} message={this.state.messages[this.state.hit]} face="front"></Card>
    }

  }
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
