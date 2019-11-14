import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  // Button,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  
} from 'react-native';
import Settings from '../components/Settings';
import {  Button, Card, Title, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// import  RNFetchBlob from 'rn-fetch-blob';


import { connect } from 'react-redux';



 class  MyAccountScreen extends React.Component{
  state={
    id:'',
    name:'',
    email:'',
    phone:'',
    address:'',
    city:'',
    country:'',
    zip:'',
    image:'',
    imageLoading:true,
    
  }
  ImageLoading_Error(){
 
    this.setState({ imageLoading: false });
  }
async componentWillMount(){
  const retrievedItem =  await AsyncStorage.getItem('userToken');
    const item = JSON.parse(retrievedItem);
    console.log(item);
    this.setState({
       id:item.id
      ,name:item.name
      ,email:item.email
      ,phone:item.phone
      ,image:item.image_url
      ,address:item.address
      ,city:item.city
      ,country:item.country
      ,zip:item.zip
    });
}

    render() {
      return (
        <ScrollView style={{flex:1}}>
            {/* header */}
    <View style={{backgroundColor:'#2C3E4F',color:'white'}}>
        <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
            <Image source={{ uri:"https://huzaifabotique.000webhostapp.com/"+this.state.image }} 
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 300
                      }}
                      resizeMode='center' />
            <View>
              <Text>{this.state.name}</Text>
              <Text style={{backgroundColor:'#5C6A77',padding:3,marginTop:3}}>{this.state.email}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',padding:20}}>
              
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=> this.props.navigation.navigate('MyWishList',{offer:1})}>
                    <Text>{this.props.data.wishList.length}</Text>
                    <Text>My Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={()=> this.props.navigation.navigate('MyReviews',{offer:1})}>
                    <Text>{this.props.data.reviews.length}</Text>
                    <Text>My Reviews</Text>
                </TouchableOpacity>
        </View>
  </View>
  
  

          <TextInput
              placeholder='Name...'
              label='Name'
              value={this.state.name} 
              onChangeText={(name)=>this.setState({name})}
              />
          <TextInput 
              placeholder='Email...'
              label='Email'
              value={this.state.email}               
              onChangeText={(email)=>this.setState({email})}
              />
          <TextInput 
              placeholder='Phone...'
              label='Phone'
              value={this.state.phone} 
              onChangeText={(phone)=>this.setState({phone})}
              />
          <TextInput 
              placeholder='Address...'
              label='Address'
              value={this.state.address} 
              onChangeText={(address)=>this.setState({address})}
              />
          <TextInput 
              placeholder='City...'
              label='City'
              value={this.state.city} 
              onChangeText={(city)=>this.setState({city})}
              />
          <TextInput 
              placeholder='Zip...'
              label='Zip'
              value={this.state.zip} 
              onChangeText={(zip)=>this.setState({zip})}
              />
          <TextInput 
              placeholder='Country...'
              label='Country'
              value={this.state.country} 
              onChangeText={(country)=>this.setState({country})}
              />
          <View style={{padding:20,flexDirection:'row', justifyContent:'space-between'}}>

  
          <Button style={{backgroundColor:'#E54D42'}}  onPress={this._showMoreApp} >Update</Button>
          <Button style={{backgroundColor:'#E54D42'}} onPress={this._signOutAsync} >sign out</Button>
          {/* <Button onPress={this.uploadImage} >upload image </Button> */}
          </View>
        </ScrollView>
      );
    }
  
    uploadImage = async () => {
       let result= await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        base64 :true
        // aspect: [4, 4]
      });
      //  let result=await ImagePicker.launchImageLibraryAsync();

       if(!result.canceled){
        //  console.log(result.uri);
        //  this.setState({myUri:result.uri});
        RNFetchBlob.fetch('POST', 'https://huzaifabotique.000webhostapp.com/auth', {
          Authorization : "Bearer access-token",
          otherHeader : "foo",
          'Content-Type' : 'multipart/form-data',
        }, [
          // // element with property `filename` will be transformed into `file` in form data
          // { name : 'avatar', filename : 'avatar.png', data: binaryDataInBase64},
          // // custom content type
          // { name : 'avatar-png', filename : 'avatar-png.png', type:'image/png', data: binaryDataInBase64},
          // part file from storage
          { name : 'image', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(result.uri)},
          // // elements without property `filename` will be sent as plain text
          // { name : 'name', data : 'user'},
          // { name : 'info', data : JSON.stringify({
          //   mail : 'example@example.com',
          //   tel : '12345678'
          // })},
        ]).then((resp) => {
          alert(resp)
          // ...
        }).catch((err) => {
          alert(err);
          // ...
        })
       }

//     var formData=new FormData();
//     formData.append('name',this.state.name);
//     formData.append('email',this.state.email);
//     formData.append('address',this.state.address);
//     formData.append('city',this.state.city);
//     formData.append('country',this.state.country);
//     formData.append('zip',this.state.zip);
//     formData.append('phone',this.state.phone);
//     formData.append('id',this.state.id);
//     formData.append('method','update');


//      fetch('https://huzaifabotique.000webhostapp.com/auth' // post
//     , {
//       method: 'POST',
//       body:formData,
//       }
// )
// .then((response) => 
// // console.log(response))
//   response.json())
//     .then((responseJson) => {
//       console.log(responseJson);
//       alert(responseJson)
//     })
//     .catch((error) => {
//       console.error(error);
//       alert(error);
//     });

}
  
    _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }
  
MyAccountScreen.navigationOptions = {
  title: 'Dashboard',
  headerStyle: {
    backgroundColor: '#2C3E4F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight:<Settings />,
  
};



const mapStateToProps = (state) => {
  return {
      data: state
  }
}




export default connect(mapStateToProps)(MyAccountScreen);

