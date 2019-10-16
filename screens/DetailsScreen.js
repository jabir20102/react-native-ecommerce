import React from 'react';
import { View,Text,ScrollView ,Alert,Image,Dimensions,Modal,FlatList,TextInput,AsyncStorage} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';
import SearchBox from '../components/SearchBox';
import StarRating from 'react-native-star-rating';
import HTML from 'react-native-render-html';
import Comments from './Comments';
import {addaction} from '../actions/action'
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
checkAuth=async ()=>{
    const retrievedItem =  await AsyncStorage.getItem('userToken');
    const item = JSON.parse(retrievedItem);
    (item!=null)?
    this.setState({modalVisible:true,user:item.id})
    :
    this.props.navigation.navigate('Auth')
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
  componentDidMount(){
    // const id=this.props.navigation.state.params.item.id;
    // const q=`https://huzaifabotique.000webhostapp.com/comment?ProdId=${id}&limit=2&page=${this.state.page}`;
    // console.log(q);
    //  this.fetchData();
    this.setState({data:this.props.navigation.state.params.item,offer:this.props.navigation.state.params.offer});
  }
  fetchData(){
    this.setState({ loading: true });
    const id=this.props.navigation.state.params.item.id;
    fetch(`https://huzaifabotique.000webhostapp.com/comment?calculate=${id}` // get
)
.then((response) => response.json())
    .then((json) => {
      
        this.setState(state => ({
          data: [...state.data, ...json],
          loading: true
        }));
        // alert("home:"+this.state.page);
      // console.log(this.state.data);
      // alert(responseJson)
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
  }
  //  for the posting a review
  postComment(){
    const id=this.props.navigation.state.params.item.id;
    let formData=new FormData();
    formData.append('name','Jabir');
    formData.append('email','khan@gmail.com');
    formData.append('comment',this.state.comment);
    formData.append('stars',this.state.starCount);
    formData.append('isApproved','1');
    formData.append('product_id',id);
    fetch(`https://huzaifabotique.000webhostapp.com/comment` // post
 , {
      method: 'POST',
      body:formData,
      }
    )
    .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          alert(responseJson);
          this.setState({starCount:0});
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
  }
  
  setStar(rating){
    this.setState({starCount:rating});
  }

  render(){
    const images=this.props.navigation.state.params.item.images.split(',');
    var mysources=[];
    images.forEach(element => {
      mysources.push({url:"https://huzaifabotique.000webhostapp.com/"+element});      
    });
  return (   
      
        <ScrollView style={{backgroundColor:'Grey'}}>
         
            
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
                <Ionicons name="md-heart-empty" size={25} color={'#000'} style={{marginRight:10}}/>
                <Ionicons name="md-share" size={25} color={'#000'}  />
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
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.setStar(rating)}
                    />
                    </View>
                    <View style={{display:(this.state.starCount>0)?'flex':'none'}}>
                      <Text style={{fontSize:14,fontWeight:'bold'}}>Write a review</Text>
                      <TextInput 
                        placeholder='Describe your experience '
                        onChangeText={(comment)=>{this.setState({comment})}}
                        value={this.state.comment}
                      />
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Button onPress={()=>{this.setState({starCount:0})}} >Cancel</Button>
                        <Button onPress={()=>this.postComment()} >Post</Button>
                      </View>
                   </View>
              
          </View>
        




          <View style={{backgroundColor:'#2c3e4f',fontSize:'30',alignItems:'center',height:100,padding:20}}>
          
            <Ionicons name="logo-facebook" size={25} color={'#000'} style={{marginRight:0}}/>
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


const mapDispatchToProps = (dispatch) => {
  return {
      // removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
      // additem: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
      // loadItems: () => { dispatch(myaction()) },
      addToCart: (product,user) => { dispatch(addaction(product,user)) },
  }
}

export default connect(null, mapDispatchToProps)(DetailsScreen);

