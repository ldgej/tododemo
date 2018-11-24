import React, { Component } from 'react';
import{Map,is} from immutable;


let obj = { name: 1 ,other:[{title:'imooc'},{title:'imooc'},{title:'imooc'},{title:'imooc'}]}
let obj1 = { name: 1 ,other:{title:'imooc'}}

console.log(obj == obj1)



function compareObj(obj1, obj2) {
    if (obj1 == obj2) {
        return true;
    }
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
        return false;
    }
    for (let k in obj1) {
        if(typeof obj1[k]=='object'){
            return compareObj(obj1[k],obj2[k]);
        }
           else if (obj1[k] !== obj2[k]) {
            return false;
        }
    }
    return true;
}

  let o1=Map({
   'name':'imooc',
   'course':Map({name:'react-redux'})
  })
  
  let o2=o1.set('name','woniu');
  console.log(o1.get('course')==o2.get('course'));//true

  let obj =Map( { name: 1 ,other:{title:'imooc'}})
  let obj1 = Map({ name: 1 ,other:{title:'imooc'}})
  console.log(is(obj1,obj))//true



class optimize extends Component {
    Constructor(props) {
        this.state = {
            num: 1,
            title: 'imooc'
        }
   //如果用immutable的话就这样做
   this.state=Map({
    num:1,
    title:'imooc'
   })

        this.handleClick = this.handleClick.bind(this)
        this.item = { react: 'redux' }
    }

    handleClick() {
        this.setState({
            'num': this.setState.num + 1
        })
    }
        //如果用immutable的话就这样做
        handleClick1() {
            this.setState(
              this.state.set('num',this.state.get('num')+1)
            )
        console.log("hello");
    }
    //第一个每一个渲染，render的时候，bind都要执行一次
    //第二个，每次一渲染，render的时候，都要生成一次这个箭头函数
    //1==1？true {a:1}=={a:1}false ，因为储存复杂数据结构的时候，
    //储存的是地址
    //在constructor中定义cliclhandler的话，函数只执行了一次
    //父子组件传值的时候尽量把对象放在外面，这样就不用每次都new

   



    render() {
        return (
            <div>
                <h2>I am APP</h2>
                <button onClick={this.handleClick.bind(this)}>btn1</button>
                <button onClick={() => this.handleClick()}>btn2</button>
                <button onClick={this.handleClick}>bt3</button>

                <Demo
                    style={color = 'red'}
                    name={item}
                    title={this.state.title}
                   //title={this.state.get('title')} 
                ></Demo>

            </div>
        );
    }
}
//dEMO组件这样传值不好，因为每次render的时候都会生成一个对象，而且对象
//也不一定会被销毁，每次都生成新的对象传递

//我们发现，每次点击的时候，上面的值一只加1，下面没有变化，
//每次render的时候，还是会打印demo render执行中，说明每次都有render，但是这个没必要
class Demo extends Component {
    shouldComponentUpdate(nextProps, nextState) {
       // return nextProps.title == this.props.title ? false : true;
       return compareObj(nextProps,this.props)?false:true;
    //深递归对比复杂度太高，不可接受  
    //return is(nextProps,this.props);
    //优点：
    //1.减少内存使用，并发安全，别人不能改，便于比较复杂数 
    }
    render() {
        return (
            <div>
                console.log('demo render执行中');
                <h2>I am Demo,{this.props.title}</h2>
            </div>
        );
    }
}


export default optimize;