import React, { Component } from 'react';
import { connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as todoActions from "./actions/todoActions";
import Item from "./Item.js";

class App extends Component {
    constructor(props){
        super(props);  
        this.props.actions.fetchInit();   
    }
    //这个方法用来改变打勾为true或者false
    changeGou(_id,done){
    this.props.actions.change(_id,'done',done);
    }
    //这个用法用来删除某个todu
    del(_id) {
    this.props.actions.del(_id);
    }
    //这个方法用来把某个id的东西改变他的title
    changeTitle(_id, title) {
    this.props.actions.change(_id,'title',title);
    }

    render() {
        return (
             <div>
               {/* {JSON.stringify(this.props.todos)} */}

               <input type='text' ref='kk'/>
               <button onClick={()=>{this.props.actions.add(this.refs.kk.value)}}>ADD</button>
              
                     {
                       this.props.todos.map((item,index)=>{
                       return<Item 
                              key={index} 
                              item={item}
                              changeGou={this.changeGou.bind(this)}
                              del={this.del.bind(this)}
                              changeTitle={this.changeTitle.bind(this)}                              
                              ></Item> 
                        })    
                    } 
                 
             </div>
        )
    }
}

export default connect(
   ({todoReducer})=>{
     return{
         todos:todoReducer.todos
     }
   }
    ,
   (dispatch)=>({
     actions:bindActionCreators(todoActions,dispatch),
     
   })

)(App);