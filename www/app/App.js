import React, { Component } from 'react';
import { connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as todoActions from "./actions/todoActions";
import Item from "./Item.js";
import Footer from "./Footer.js";

class App extends Component {
    constructor(props){
        super(props);  
        this.props.actions.fetchInit();   
    }
    //change to status of item from done to undone/undone to done
    changeGou(_id,done){
    this.props.actions.change(_id,'done',done);
    }
    //delete item according to a given id
    del(_id) {
    this.props.actions.del(_id);
    }
    //change the title of a item according to a given id
    changeTitle(_id, title) {
    this.props.actions.change(_id,'title',title);
    }

    render() {
        return (
             <div>
              

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
                        <hr/>
                      <Footer></Footer>
             </div>
        )
    }
}

export default connect(
   ({todoReducer})=>{
     return{
         'todos':todoReducer.todos.filter((item)=>{
              if(todoReducer.showtype=='show-all')
              return item;
              else if(todoReducer.showtype=='only-done')
              return item.done;
              else if(todoReducer.showtype=='only-undone')
              return !item.done;

         })
     }
   }
    ,
   (dispatch)=>({
    'actions':bindActionCreators(todoActions,dispatch), 
   })
)(App);