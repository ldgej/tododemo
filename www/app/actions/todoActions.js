// //同步的函数：
// export const add = (number) => ({ "type": "ZENG", number});
// export const minus = (number) => ({ "type": "JIAN", number});


// //异步的函数 一个函数，返回一个异步函数，这个函数去api接口拿数据，拿到之后dispatch
// //剥夺了系统的dispatch权利，把权利交给了程序员
// export const addFileNumber = () =>
//      async (dispatch) => {
//      var {result} = await fetch("/api").then(data=>data.json());
//      dispatch({ "type": "ZENG", number: result});
// }

// export const laqumorenshuju = () => async (dispatch) => {
//     var {result} = await fetch("/haha").then(data => data.json());
//     dispatch({ "type": "LAQUMORENSHUJU", result})
// }
export const fetchInit=()=> async (dispatch)=>{
    var {results}= await fetch('/todos').then(data=>data.json());
    dispatch({"type":"INIT",results});
   // alert(results.length)
}

// export const add=(title)=> async (dispatch)=>{
//     var {results}= await fetch('/todos',{
//         method:'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body:JSON.stringify({'title':title})
//     }).then(data=>data.json());
//     dispatch({"type":"INIT",results});
//    // alert(results.length)
// }
export const add = (title) => async (dispatch) => {
    //这里是新知识，fetch发出POST请求
    var {result} = await fetch("/todos",{
        method : "POST" ,
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"title" : title})
    }).then(data => data.json());
    dispatch({"type":"ADD",result})
   
}


// export const change=(_id , k , v)=> async (dispatch)=>{
//       await fetch('/todos/'+_id,{
//        method:'POST',
//        headers:{
//            'Content-Type':'application/json'
//        },
//         body:JSON.stringify({'k':k,'v':v})
//       }).then(data=>data.json());
      
//       dispatch({'type':'CHANGE',"_id":_id,k,v});
       
// }
export const change = (_id , k , v) => async (dispatch) => {
    await fetch("/todos/" + _id, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"k" : k , "v" : v})
    }).then(data => data.json());

    dispatch({"type" : "CHANGE" , "_id" : _id , k , v});
}

export const del = (_id) => async (dispatch) => {
    await fetch("/todos/" + _id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
       // body: JSON.stringify({"k" : k , "v" : v})
    }).then(data => data.json());

    dispatch({"type" : "REMOVE" , "_id" : _id});
}