 export default(state={'todos':[]},action)=>{
  if(action.type=='INIT'){
     return{
     ...state,
     todos: action.results
     }
    }else if(action.type=='ADD'){
      return{
          ...state,
          'todos':[
           ...state.todos,
           action.result   
          ]
      }

    }
    else if(action.type == "CHANGE"){
      //console.log(action);
      return {
          ...state , 
          "todos" : state.todos.map((item)=>{
              if(item._id != action._id){
                  return item;
              }
              return {
                  ...item ,
                  [action.k] : action.v
              }
          })
      }
  
    }
    
    else if(action.type=="REMOVE"){
      return{
          ...state,
          'todos':state.todos.filter((item)=>{
              return item._id!=action._id
          })
      }
    }
  
  
  
    return state
}