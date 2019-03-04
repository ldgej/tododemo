

// }
export const fetchInit=()=> async (dispatch)=>{
    var {results}= await fetch('/todos').then(data=>data.json());
    dispatch({"type":"INIT",results});
   // alert(results.length)
}


export const add = (title) => async (dispatch) => {
    
    var {result} = await fetch("/todos",{
        method : "POST" ,
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"title" : title})
    }).then(data => data.json());
    dispatch({"type":"ADD",result})
   
}



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
      
    }).then(data => data.json());

    dispatch({"type" : "REMOVE" , "_id" : _id});
}

export const cst=(showtype)=>({'type':'cst',showtype});

export const sorttitle=()=>({'type':'sorttitle'});