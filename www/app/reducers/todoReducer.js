 export default(state={
     'todos':[],
     'showtype':'show-all'
    //show-all
     //only-done;
     //only-undone;
    },action)=>{

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
    else if(action.type=='cst'){
        return {
            ...state,
            'showtype':action.showtype
        }
    }
    
    else if(action.type=='sorttitle'){
        return {
            ...state,
            'todos':state.todos.sort((a,b)=>{
                return a.title-b.title
            })
        }
    }
  
    return state
}