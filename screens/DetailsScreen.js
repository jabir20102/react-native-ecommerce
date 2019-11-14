import React from 'react';
import { View,Text,ScrollView ,Alert,Image,Dimensions,Modal,Share,TextInput,AsyncStorage,ActivityIndicator} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';
import SearchBox from '../components/SearchBox';
import StarRating from 'react-native-star-rating';
import HTML from 'react-native-render-html';
import Comments from './Comments';
import {addaction,addaction2,addaction3,deleteaction2,deleteaction3} from '../actions/action'
import { Ionicons } from '@expo/vector-icons';

import Product from '../components/Product';

import { connect } from 'react-redux';

  class  DetailsScreen extends React.Component {
  state = {
    starCount: 0,
    page:0,
    loading:false,
    data:null,
    comment:"",
    modalVisible:false,
    qty:1,
    color:'red',
    size:'large',
    user:0,
    offer:1,
    liked:0,
    yourComment:'',
    yourStars:0,
    user:null,
  };
  handleData=()=> {
    let data = this.state.data;
    data.color=this.state.color;
    data.size=this.state.size;
    data.qty=this.state.qty;
    data.offer=this.state.offer;
    

    this.setState({
        data: data
    })
}
//    for the modal
checkAuth=async ()=>{
    const retrievedItem =  await AsyncStorage.getItem('userToken');
    const item = JSON.parse(retrievedItem);
    (item!=null)?
    this.setState({modalVisible:true,user:item.id})
    : 
    this.props.navigation.navigate('Auth')
}
//  for the the wishlist
checkAuth2=async ()=>{
    
    if(this.state.user!=null){
    await this.props.loading();
    this.props.addToWishList(this.state.data,this.state.user.id);
    this.setState({liked:1});
    }else{
    this.props.navigation.navigate('Auth')
    }
    
}

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  incQty=()=>{
    if(this.state.qty!=5){
    this.setState({qty:this.state.qty+1});
  }
}
  decQty=()=>{
    if(this.state.qty!=1){
    this.setState({qty:this.state.qty-1});
  }
  }
  async componentDidMount(){
    // const id=this.props.navigation.state.params.item.id;
    // const q=`https://huzaifabotique.000webhostapp.com/comment?ProdId=${id}&limit=2&page=${this.state.page}`;
    // console.log(q);
    //  this.fetchData();
    const retrievedItem =  await AsyncStorage.getItem('userToken');
    const item = JSON.parse(retrievedItem);
    if(item!=null){
    this.setState({user:item})
    }else{
    this.setState({user:null})
    }
    this.setState({data:this.props.navigation.state.params.item,offer:this.props.navigation.state.params.offer});
    const id=this.props.navigation.state.params.item.id;
    var result = this.props.data.filter(x => x.id === id);
    
    if(result.length>0){
    this.setState({liked:result[0].wishlist_id})
    }else{
    this.setState({liked:0})
    }

    this.checkReview();
  }
  checkReview(){
      
      
      if(this.state.user!=null){
            const id=this.props.navigation.state.params.item.id;
            var result2 = this.props.reviews.filter(x => x.product_id === id);     
            if(result2.length>0){
            this.setState({yourStars:result2[0].comment_id,comment:result2[0].comment,starCount:result2[0].stars})
            }else{
            this.setState({yourStars:0})
            }
        }else{
        this.props.navigation.navigate('Auth')
        } 

      
  }
  
  //  for the posting a review
   async postComment (){
      const id=this.props.navigation.state.params.item.id;
     await this.props.addReview(id,this.state.user.name,this.state.user.email,this.state.comment,this.state.starCount);
     
    //  this.checkReview();
    this.setState({yourStars:1});  //  1 is temporary it will be replace with current review id link to up line
     
  }
  deleteComment(){
    this.props.deleteReview(this.state.yourStars);
    this.setState({starCount:0,comment:'',yourStars:0});
  }
  
  setStar(rating){
    
    (this.state.user!=null)?
    this.setState({starCount:rating})
    : 
    this.props.navigation.navigate('Auth') 
  }

  async onShare  () {
    try {
      const result = await Share.share({
        message:
          'https://huzaifabotique.000webhostapp.com/product/t-shirts-new-designs/'+this.state.data.id,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          alert("Thank you for sharing")
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }


  render(){
    const images=this.props.navigation.state.params.item.images.split(',');
    var mysources=[];
    images.forEach(element => {
      mysources.push({url:"https://huzaifabotique.000webhostapp.com/"+element});      
    });
  return (   
      
        <ScrollView style={{backgroundColor:'Grey'}}>
          {(this.props.isLoading)?
           <View style={{color:'red'}}>
              <ActivityIndicator size="large" />
          </View>
          :
          null
          }
         
            
          <View style={{backgroundColor:'red'}}>       
    

    </View>
         <Card style={{}}>           
         
            {/* <Modal visible={false} transparent={true}> */}
             <ImageViewer style={{ height: 300  }}
                 imageUrls={mysources}
                 loadingRender={()=><Image source={require('../assets/images/icon.png')} />}
                 backgroundColor="#000"
                 saveToLocalByLongPress={true}
                 />
                 {/* </Modal> */}
            <Card.Content>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Title>Rs. {this.props.navigation.state.params.item.price}</Title>
              <View style={{flexDirection:'row',margin:5}}>
              {(this.state.liked!=0)?
                <Ionicons onPress={()=>  {this.props.deletefromWishList(this.state.liked),this.setState({liked:0})} } name="md-heart" size={25} color={'#000'} style={{marginRight:15}}/>
                :
                <Ionicons onPress={()=>  this.checkAuth2()   } name="md-heart-empty" size={25} color={'#000'} style={{marginRight:15}}/>
              }
                <Ionicons name="md-share" size={25} color={'#000'} onPress={()=>this.onShare()}  />
              </View>
              </View>
              <Paragraph style={{fontSize:20}}> {this.props.navigation.state.params.item.title} </Paragraph>
            </Card.Content>
            
            <Card.Actions style={{justifyContent:'space-between'}}>
              {/* ({this.props.navigation.state.params.item.percent})?
               <View style={{ position: 'absolute', backgroundColor:'yellow',opacity:0.6,padding:5 }}>
                   <Text style={{fontWeight:'bold'}}>{this.props.navigation.state.params.item.percent*100}% off</Text>
               </View> */}
               
               <StarRating
                      disabled={true}
                      maxStars={5}
                      starSize={20}
                      fullStarColor={'red'}
                      rating={parseFloat(this.props.navigation.state.params.item.average)}
                    />
                    <Text>({this.props.navigation.state.params.item.total})</Text>
              
            <Button style={{backgroundColor:'#E54D42',borderRadius:30}} icon="shopping-cart" mode="contained" 
            onPress={
             ()=> 
             this.checkAuth()
             
               }>
              Add to card
            </Button>
            </Card.Actions>
          </Card>
          <View style={{marginTop:5,borderBottomWidth:1,borderColor:'#9f9f9f'}}>
            <Text style={{fontWeight:'bold'}}>Description:</Text>
            <HTML html={this.props.navigation.state.params.item.description} imagesMaxWidth={Dimensions.get('window').width} />
          </View>

          <View style={{marginTop:5,borderBottomWidth:1,borderColor:'#9f9f9f'}}>
            <Text style={{fontWeight:'bold'}}>Details:</Text>
            <HTML html={this.props.navigation.state.params.item.description} imagesMaxWidth={Dimensions.get('window').width} />
          </View>

          <View style={{}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>Rattings & Reviews ({this.props.navigation.state.params.item.total})</Text>
              <Text  onPress={()=>{this.props.navigation.navigate('reviews',{item:this.props.navigation.state.params.item})}}
               style={{fontSize:18}}>View All</Text>
            </View>
          <Comments id={this.props.navigation.state.params.item.id} scroll={false}  />
          </View>
          <View style={{padding:5}}>
              <Text style={{fontSize:18,fontWeight:'bold'}}>Rate this app</Text>
              <Text  onPress={()=>{this.props.navigation.navigate('reviews',{item:this.props.navigation.state.params.item})}}
               style={{fontSize:14}}>Tell others what you think</Text>
               <View style={{margin:10}}>
                <StarRating
                      disabled={false}
                      maxStars={5}
                      starSize={30}
                      rating={parseInt(this.state.starCount)}
                      selectedStar={(rating) => this.setStar(rating) }
                    />
                    </View>
                    <View style={{display:(this.state.starCount>0)?'flex':'none'}}>
                    { (this.state.yourStars==0)?
                      <Text style={{fontSize:14,fontWeight:'bold'}}>Write a review</Text>
                      :
                      <Text style={{fontSize:14,fontWeight:'bold'}}>Your review</Text>
                    }

                      <TextInput 
                        placeholder='Describe your experience '
                        onChangeText={(comment)=>{this.setState({comment})}}
                        value={this.state.comment}
                      />
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Button onPress={()=>{this.setState({starCount:0})}} >Cancel</Button>
                        { (this.state.yourStars==0)?
                        <Button onPress={()=>this.postComment()} >Post</Button>                      
                        :                        
                        <Button onPress={()=>this.deleteComment()} >Delete</Button>                        
                        }
                      </View>
                   </View>
              
          </View>
        




          <View style={{backgroundColor:'#2c3e4f',fontSize:'30',alignItems:'center',padding:20}}>
            <View style={{flexDirection:'row'}}>
            <Ionicons name="logo-facebook" size={25} color={'#fff'} style={{marginRight:10}}/>
            <Ionicons name="logo-instagram" size={25} color={'#fff'} style={{marginRight:10}}/>
            <Ionicons name="logo-youtube" size={25} color={'#fff'} style={{marginRight:10}}/>
            <Ionicons name="logo-linkedin" size={25} color={'#fff'} style={{marginRight:10}}/>
            </View>
        <Text style={{color:'white'}}>
             Copyright © Fables 2018. All rights reserved.
        </Text>

      </View>

      <Modal
            presentationStyle='overFullScreen'
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              // alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View style={{flexDirection:'row',justifyContent:'flex-end'}}>            

                
                  <Button onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>Close</Button>
                  
              </View>
              <Product navigation={this.props.navigation} 
               item={this.props.navigation.state.params.item} /> 
                  
              {/* <Text>{this.props.navigation.state.params.item.color}</Text> 
              <Text>{this.props.navigation.state.params.item.size}</Text> 
              <Text>{this.props.item.qty}</Text> */}

                    <View style={{flexDirection:'row',paddingTop:10}}>
                        <Button style={{fontSize:40}} onPress={()=>this.decQty()}>-</Button>
                        <Text style={{top:5,fontSize:20}}>{this.state.qty}</Text>
                        <Button style={{fontSize:40}} onPress={()=>this.incQty()}>+</Button>
                    </View>
              
              <Button style={{backgroundColor:'#E54D42'}} icon="shopping-cart" mode="contained" 
            onPress={
              () => {
                  this.handleData()
                    ,this.props.addToCart(this.state.data,this.state.user) 
                  }
               }>
              Add to card
            </Button>
            
            </View>
            </Modal>

          </ScrollView> 
        
          
      
  );
    }
}


DetailsScreen.navigationOptions = {
  title: 'Details',
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: (
    <View style={{padding:20}}>
    <Button 
      onPress={() => alert('This is a button!')}
      title="Info"
      // color="#fff"
    />
    </View>
  ),headerStyle: {
    backgroundColor: '#2c3e4f',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // headerRight:<SearchBox />,
};

const mapStateToProps = (state) => {
  return {
      data: state.wishList,
      reviews:state.reviews,
      isLoading:state.loading
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
      // removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
      // additem: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
      // loadItems: () => { dispatch(myaction()) },
      addToCart: (product,user) => { dispatch(addaction(product,user)) },
      loading: () => { dispatch({type:'LOADING',payload:true}) },
      addToWishList: (product,user) => { dispatch(addaction2(product,user)) },
      addReview: (product_id,name,email,comment,stars) => { dispatch(addaction3(product_id,name,email,comment,stars)) },
      deletefromWishList: (id) => { dispatch(deleteaction2(id)) },
      deleteReview: (id) => { dispatch(deleteaction3(id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);

