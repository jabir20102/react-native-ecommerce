export const myaction=(user)=>{
    return (dispatch)=>{
        fetch(`https://huzaifabotique.000webhostapp.com/cart?user=${user}`)
        .then(res=>res.json())
        .then(res2=>{
            // console.log(res2)
            dispatch({type:'LOAD_ITEMS',payload:res2});
        })
        .catch(err =>{
            dispatch({type:'ERROR',payload:err});
        })
    }
}
// for wishlist
export const myaction2=(user)=>{
    return (dispatch)=>{
        fetch(`https://huzaifabotique.000webhostapp.com/wishlist?user=${user}`)
        .then(res=>res.json())
        .then(res2=>{
            // console.log(res2);
            dispatch({type:'LOAD_WISHLIST',payload:res2});
        })
        .catch(err =>{
            dispatch({type:'ERROR',payload:err});
        })
    }
}
// for reviews
export const myaction3=(user)=>{
    return (dispatch)=>{
        fetch(`https://huzaifabotique.000webhostapp.com/reviews?user=${user}`)
        .then(res=>res.json())
        .then(res2=>{
            dispatch({type:'LOAD_REVIEW',payload:res2});
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
export const addaction2=(product,user)=>{
    
    return (dispatch)=>{
        let formData=new FormData();
    formData.append('method','post');
    formData.append('product_id',product.id);
    formData.append('student_id',user);
    fetch(`https://huzaifabotique.000webhostapp.com/wishlist` // post
    ,{
      method: 'POST',
      body:formData,
      }
    )
    .then((response) => 
    // console.log(response))
    response.json())
        .then((responseJson) => {
            alert(responseJson);
            dispatch({type:'ADD_TO_WishList',payload:product});
            dispatch({type:'STOP_LOADING',payload:false});
         
        })
        .catch((error) => {
            alert(error);
            dispatch({type:'ERROR',payload:error});
            dispatch({type:'STOP_LOADING',payload:false});
          
        });
    }
}
//  for the adding a review
export const addaction3=(product_id,name,email,comment,stars)=>{
    
    return (dispatch)=>{
        let formData=new FormData();
    formData.append('method','post');
    formData.append('product_id',product_id);
    formData.append('name',name);
    formData.append('email',email);
    formData.append('comment',comment);
    formData.append('stars',stars);
    formData.append('isApproved',1);
    fetch(`https://huzaifabotique.000webhostapp.com/reviews` // post
    ,{
      method: 'POST',
      body:formData,
      }
    )
    .then((response) => 
    // console.log(response))
    response.json())
        .then((responseJson) => {
            alert("Thank you for your ratting");
            dispatch({type:'ADD_TO_REVIEW',payload:responseJson[0]});
            
         
        })
        .catch((error) => {
            alert(error);
            dispatch({type:'ERROR',payload:error});
          
        });
    }
}
export const editCart=(id,qty)=>{
    
    return (dispatch)=>{
        let formData=new FormData();
    formData.append('method','put');
    formData.append('qty',qty);
    fetch(`https://huzaifabotique.000webhostapp.com/cart/${id}` // post
    ,{
      method: 'POST',
      body:formData,
      }
    )
    .then((response) => 
    // console.log(response))
    response.json())
        .then((responseJson) => {
            alert(responseJson);
            dispatch({type:'EDIT_WishList',payload:{id,qty}});
         
        })
        .catch((error) => {
            alert(error);
            dispatch({type:'ERROR',payload:err});
          
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
            dispatch({type:'STOP_LOADING',payload:false});
          alert(responseJson);
        })
        .catch((error) => {
            dispatch({type:'ERROR',payload:err});
            dispatch({type:'STOP_LOADING',payload:false});
          alert(error);
        });
    }
}
export const deleteaction2=(id)=>{
    return (dispatch)=>{
        let formData=new FormData();
    formData.append('method','delete');
    formData.append('id',id);
    fetch(`https://huzaifabotique.000webhostapp.com/wishlist` // post
 , {
      method: 'POST',
      body:formData,
      }
    )
    .then((response) =>
    // console.log(id) )
    response.json())
        .then((responseJson) => {
            alert(responseJson);
            dispatch({type:'DEL_WISHLIST',payload:id});
          
        })
        .catch((error) => {
            console.log(error);
            dispatch({type:'ERROR',payload:error});
          alert(error);
        });
    }
}
//  for the reviews
export const deleteaction3=(id)=>{
    return (dispatch)=>{
        let formData=new FormData();
    formData.append('method','delete');
    formData.append('id',id);
    fetch(`https://huzaifabotique.000webhostapp.com/reviews` // post
 , {
      method: 'POST',
      body:formData,
      }
    )
    .then((response) =>
    // console.log(id) )
    response.json())
        .then((responseJson) => {
            alert(responseJson);
            dispatch({type:'DEL_REVIEWS',payload:id});
          
        })
        .catch((error) => {
            console.log(error);
            dispatch({type:'ERROR',payload:error});
          alert(error);
        });
    }
}