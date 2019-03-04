import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from "classnames";
import * as todoActions from "./actions/todoActions.js";
import {bindActionCreators} from "redux";
class Footer extends Component {
   
   //123
    render() {
        return (
            <div>
                <p>Totla Event Number:{this.props.allTodo.length}</p>
                <p>Currend Done Number:{this.props.doneTodo.length}</p>
                <p>Current Undone Number:{this.props.undoneTodo.length}</p>
                <p>
                <a 
                classnames={classnames({'cur':this.props.showtype=='show-all'})}
                onClick={()=>{this.props.actions.cst('show-all')}} 
                href="javascript:void(0)">show-all</a>
                <hr/>
                <a 
                className={classnames({'cur':this.props.showtype=='only-done'})}
                onClick={()=>{this.props.actions.cst('only-done')}}
                href="javascript:void(0)">only-done</a>
                <hr/>
                <a
                className={classnames({'cur':this.props.showtype=='only-undone'})} 
                onClick={()=>{this.props.actions.cst('only-undone')}}
                href="javascript:void(0)">only-undone</a>
                <hr/>
                <a
                onClick={()=>{this.props.actions.sorttitle()}}
                href="javascript:void(0)">sort title</a>
                </p>
            </div>
        );
    }
}

export default connect(
({todoReducer})=>({
   'allTodo':todoReducer.todos,
   'doneTodo':todoReducer.todos.filter((item)=>{
       return item.done
   }),
   'undoneTodo':todoReducer.todos.filter((item)=>{
       return !item.done
   }),
   'showtype':todoReducer.showtype
}),
(dispatch)=>({
    'actions':bindActionCreators(todoActions,dispatch),
    
  })

)(Footer);