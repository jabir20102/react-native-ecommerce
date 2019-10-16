import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
} from 'react-native';
import {   Card, Title, Paragraph } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import SearchBox from '../components/SearchBox';
import pic from '../assets/images/jeans.jpg';
import Swipeout from 'react-native-swipeout';
// import ImagePicker from 'react-native-image-picker';


 
export default class SignupScreen extends React.Component {
state={
  email:'',
  pass:'',
  confirm:'',
  isLong:false,
  isSpecChar:false,
  isUpper:false,
  isNum:false,
  photo: null,
}
handleChoosePhoto = () => {
  alert('hi jabir');
  // const options = {
  //   noData: true,
  // }
  // ImagePicker.launchImageLibrary(options, response => {
  //   if (response.uri) {
  //     this.setState({ photo: response })
  //   }
  // })
}

passwordhandler=text=>{
  this.setState({pass: text});
  (text.length>5)?this.setState({isLong:true}):this.setState({isLong:false});
  (text)?this.setState({isSpecChar:true}):this.setState({isSpecChar:false});
  (text)?this.setState({isUpper:true}):this.setState({isUpper:false});
  (text)?this.setState({isNum:true}):this.setState({isNum:false});
}

  render() {
    var swipeBtns = [
      {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { alert('delete') }
    },{
      text: 'Edit',
      backgroundColor: 'yellow',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { alert('Edit') }
    }
  
  ];
    return (
      <View style={{flex:1,padding:10}}>

        <TextInput style={{ height: 40, borderWidth: 1,padding:10,marginBottom:10}}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({email: text}) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
        <TextInput style={{ height: 40, borderWidth: 1,padding:10,marginBottom:10}}
                    value={this.state.password}
                    onChangeText={(text) => this.passwordhandler(text)}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false} 
                />
        <TextInput style={{ height: 40, borderWidth: 1,padding:10,marginBottom:10}}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({confirm: text}) }}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false} 
                />
        <Button style={{padding:10}} title="Sign Up!" onPress={this._signUpAsync} />
        <View>
            <Text>Password should be eight character long {(this.state.isLong)?<Text style={{color:'green',fontWeight:'bold'}}>ok</Text>:''}</Text>
            <Text>Password should have a special character {(this.state.isSpecChar)?<Text style={{color:'green',fontWeight:'bold'}}>ok</Text>:''}</Text>
            <Text>Password should have a upper case  character {(this.state.isUpper)?<Text style={{color:'green',fontWeight:'bold'}}>ok</Text>:''}</Text>
            <Text>Password should have numbers {(this.state.isNum)?<Text style={{color:'green',fontWeight:'bold'}}>ok</Text>:''}</Text>
        </View>

      
<Swipeout right={swipeBtns}>

        <Card style={{margin:3,paddingTop:5,paddingBottom:5,width:350}} >     
              <View style={{flexDirection:"row",padding:0}}>
                <View style={{marginRight:5}}>
                  {/* <Image source={{ uri:this.props.item.picture.large }}  */}
                  {/* <Image source={{ uri:"http://192.168.3.135/fyp/"+props.item.url }}  */}
                  <Image source={pic} 
                  style={{ height: 100,width:100, left: 0}}
                  resizeMode='center' />
                  </View>
                  <View style={{width:190}}>
                  <Text  style={{fontWeight:'400',fontSize:16}} 
                     > 
                    Title goes here
                    {/* {this.props.item.name.last.length>5?this.props.item.name.last.substring(0, 5)+"...":this.props.item.name.last} */}
                  </Text> 
                  <Text  style={{fontWeight:'400',fontSize:20}}>Rs: 12000</Text>
                  <View style={{flexDirection:'row'}}>
                  <StarRating
                      disabled={false}
                      maxStars={5}
                      starSize={20}
                      fullStarColor={'red'}
                      rating={3}
                       />
                    <Text>({5})</Text>
                  {/* <Button style={{backgroundColor:'#E54D42',borderRadius:30}} icon="shopping-cart"
                  mode="contained" onPress={() => alert('Added to card','body')}>
                  </Button> */}
                  </View>
                  </View>
             </View>
             </Card>
</Swipeout>



      </View>
    );
  }

  _signUpAsync=()=>{
    // AsyncStorage.setItem('khan', 'abc')
    //      .then(()=>{});
        AsyncStorage.getItem('khan',(res,err)=>{
          alert(res);
         });
          
          //  console.log(x.value);
    // if(this.state.pass.length>5){
    //     if(this.state.pass===this.state.confirm){
    //         this._signUp();
    //     }else{
    //         alert("password did't match");
    //     }
    // }else{
    //     alert("password should be at leat 6 character long");
    // }
  }
  _signUp = async () => {
    let formData=new FormData();
    formData.append('email',this.state.email);
    formData.append('password',this.state.pass);
    formData.append('signup','1');

   
    // fetch('http://192.168.3.135:80/fyp/auth'
    fetch('https://huzaifabotique.000webhostapp.com/auth'  // post 
    , {
      method: 'POST',
      body:formData,
      }
)
.then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.id!=null){
         AsyncStorage.setItem('userToken', 'abcd')
         .then(()=>{});
        this.props.navigation.navigate('App');
      }else{
      alert(responseJson)
      } 
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
    
  };
}
  
SignupScreen.navigationOptions = {
    // headerTitle:<SearchBox />,
    title: 'Sign Up',
    headerStyle: {
      backgroundColor: '#2C3E4F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    // headerRight:<SearchBox />,
    
  };

  const styles=StyleSheet.create({
    card:{
      margin:3,
      paddingTop:5,
      paddingBottom:5,
      width:"100%"
    },
    cardImage:{
      height: 100,
      width:"34%",
      left: 0
    },
    cardContent:{
      width:"66%",

    }
  });
