export const myaction=(user)=>{
    return (dispatch)=>{
        fetch(`https://huzaifabotique.000webhostapp.com/cart?user=${user}`)
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'LOAD_ITEMS',payload:res2});
        })
        .catch(err =>{
            dispatch({type:'ERROR',payload:err});
        })
    }
}
export const addaction=(data,user)=>{
    return (dispatch)=>{
        let formData=new FormData();
    formData.append('method','post');
    formData.append('prod_id',data.id);
    formData.append('user',user);
    formData.append('color',data.color);
    formData.append('size',data.size);
    formData.append('qty',data.qty);
    formData.append('offer',data.offer);
    fetch(`https://huzaifabotique.000webhostapp.com/cart` // post
    ,{
      method: 'POST',
      body:formData,
      }
    )
    .then((response) => response.json())
        .then((responseJson) => {
            dispatch({type:'ADD_TO_CART',payload:data});
          alert(responseJson);
        })
        .catch((error) => {
            dispatch({type:'ERROR',payload:err});
          alert(error);
        });
    }
}
export const deleteaction=(id)=>{
    return (dispatch)=>{
        let formData=new FormData();
    formData.append('method','delete');
    fetch(`https://huzaifabotique.000webhostapp.com/cart/${id}` // post
 , {
      method: 'POST',
      body:formData,
      }
    )
    .then((response) => response.json())
        .then((responseJson) => {
            dispatch({type:'DEL_ITEM',payload:id});
          alert(responseJson);
        })
        .catch((error) => {
            dispatch({type:'ERROR',payload:err});
          alert(error);
        });
    }
}