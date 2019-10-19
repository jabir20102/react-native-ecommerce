import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  // Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  // Text,
  
} from 'react-native';
import {  Button, Card, Title, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';



export default class  MyAccountScreen extends React.Component{
  state={
    name:'',
    email:'',
    image:''
  }
async componentWillMount(){
  const retrievedItem =  await AsyncStorage.getItem('userToken');
    const item = JSON.parse(retrievedItem);
    this.setState({name:item.name,email:item.email,image:item.image_url});
}
    render() {
      return (
        <View style={{flex:1}}>


          <Button onPress={()=> this.props.navigation.navigate('MyWishList',{offer:1}) }>My Wishlist</Button>

          
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name="md-search" size={30}                  
        />
        <TextInput
        style={{width:'100%'}}
        label='Name'
        />

            </View>
          
         

          

               

           <Image source={{ uri:"https://huzaifabotique.000webhostapp.com/"+this.state.image }} 
                  style={{ height: 100,width:100, left: 0}}
                  resizeMode='center' />
          <TextInput
          placeholder='Name...'
          value={this.state.name} />
          <TextInput 
          placeholder='Email...'
          value={this.state.email} />
          <Button style={{margin:10}}  onPress={this._showMoreApp} >POST</Button>
          <Button onPress={this._signOutAsync} >sign out</Button>
        </View>
      );
    }
  
     _showMoreApp =async () => {
    //   this.props.navigation.navigate('Other');
    const retrievedItem =  await AsyncStorage.getItem('userToken');
    const item = JSON.parse(retrievedItem);
    alert(item.id);

//     let formData=new FormData();
//     formData.append('name','hello world');
//     formData.append('email','khan@gmail.com');
//     formData.append('comment','khan gmail.com');
//     formData.append('isApproved','1');
//     formData.append('product_id','12');

//     // fetch('http://192.168.3.135:80/fyp/comment'
//     // fetch('https://huzaifabotique.000webhostapp.com/comment'  // post 
//     fetch('https://huzaifabotique.000webhostapp.com/getProducts?limit=2&page=0' // get
//     // , {
//     //   method: 'POST',
//     //   body:formData,
//     //   }
// )
// .then((response) => response.json())
//     .then((responseJson) => {
//       console.log(responseJson);
//       alert(responseJson)
//     })
//     .catch((error) => {
//       console.error(error);
//       alert(error);
//     });

};
  
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
  // headerRight:<SearchBox />,
  
};

// import React, { Component } from 'react';
 
// import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
 
// import ImagePicker from 'react-native-image-picker';
 
// import RNFetchBlob from 'rn-fetch-blob';
 
// export default class MyAccountScreen extends Component {
 
//   constructor() {
 
//     super();
 
//     this.state = {
 
//       ImageSource: null,
 
//       data: null,
 
//       email: ''
 
//     }
//   }
 
//   selectPhotoTapped() {
//     const options = {
//       quality: 1.0,
//       maxWidth: 500,
//       maxHeight: 500,
//       storageOptions: {
//         skipBackup: true
//       }
//     };
 
//     ImagePicker.showImagePicker(options, (response) => {
//       console.log('Response = ', response);
 
//       if (response.didCancel) {
//         console.log('User cancelled photo picker');
//       }
//       else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       }
//       else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       }
//       else {
//         let source = { uri: response.uri };
 
//         this.setState({
 
//           ImageSource: source,
//           data: response.data
 
//         });
//       }
//     });
//   }
 
//   uploadImageToServer = () => {
 
//     RNFetchBlob.fetch('POST', 'http://huzaifabotique.000webhostapp.com/upload_profile', {
//       Authorization: "Bearer access-token",
//       otherHeader: "foo",
//       'Content-Type': 'multipart/form-data',
//     }, [
//         { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
//         { name: 'email', data: this.state.email }
//       ]).then((resp) => {
 
//         var tempMSG = resp.data;
 
//         tempMSG = tempMSG.replace(/^"|"$/g, '');
 
//         Alert.alert(tempMSG);
 
//       }).catch((err) => {
//         // ...
//       })
 
//   }
 
//   render() {
//     return (
//       <View style={styles.container}>
 
//         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
 
//           <View style={styles.ImageContainer}>
 
//             {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
//               <Image style={styles.ImageContainer} source={this.state.ImageSource} />
//             }
 
//           </View>
 
//         </TouchableOpacity>
 
 
//         <TextInput
 
//           placeholder="Enter Image Name "
 
//           onChangeText={data => this.setState({ email: data })}
 
//           underlineColorAndroid='transparent'
 
//           style={styles.TextInputStyle}
//         />
 
 
//         <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >
 
//           <Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>
 
//         </TouchableOpacity>
 
//       </View>
//     );
//   }
 
// }
 
// const styles = StyleSheet.create({
 
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#FFF8E1',
//     paddingTop: 20
//   },
 
//   ImageContainer: {
//     borderRadius: 10,
//     width: 250,
//     height: 250,
//     borderColor: '#9B9B9B',
//     borderWidth: 1 / PixelRatio.get(),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#CDDC39',
 
//   },
 
//   TextInputStyle: {
 
//     textAlign: 'center',
//     height: 40,
//     width: '80%',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#028b53',
//     marginTop: 20
//   },
 
//   button: {
 
//     width: '80%',
//     backgroundColor: '#00BCD4',
//     borderRadius: 7,
//     marginTop: 20
//   },
 
//   TextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//     padding: 10
//   }
 
// });

