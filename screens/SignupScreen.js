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


 
export default class SignupScreen extends React.Component {
state={
  email:'',
  pass:'',
  confirm:'',
  isConfirm:true,
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
  
  (new RegExp('[$@$!%*#?&]').test(text)) ?
    this.setState({isSpecChar:true})
    :
  this.setState({isSpecChar:false})

  
  if (new RegExp('[A-Z]').test(text)) {
    this.setState({isUpper:true})
  }else{
    this.setState({isUpper:false})
  }
  if (new RegExp('[0-9]').test(text)) {
    this.setState({isNum:true})
  }else{
    this.setState({isNum:false})
  }
}
confirm=text=>{
  this.setState({confirm: text});
  (this.state.pass==text)?
  this.setState({isConfirm:true})
  :
  this.setState({isConfirm:false})
}

  render() {
    
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
                    onChangeText={(text) => this.confirm(text)}
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false} 
                />
        {
          (!this.state.isConfirm)?
          <Text style={{color:'red'}}>Password didn't matched</Text>
          :
          null
        }
        <Button style={{padding:10}} title="Sign Up!" onPress={this._signUp} />
        <View>
            <Text>Password should be six character long {(this.state.isLong)?<Text style={{color:'green',fontWeight:'bold'}}>ok</Text>:''}</Text>
            <Text>Password should have a special character {(this.state.isSpecChar)?<Text style={{color:'green',fontWeight:'bold'}}>ok</Text>:''}</Text>
            <Text>Password should have a upper case  character {(this.state.isUpper)?<Text style={{color:'green',fontWeight:'bold'}}>ok</Text>:''}</Text>
            <Text>Password should have numbers {(this.state.isNum)?<Text style={{color:'green',fontWeight:'bold'}}>ok</Text>:''}</Text>
        </View>
      </View>
    );
  }

  _signUp =  () => {
    let formData=new FormData();
    formData.append('email',this.state.email);
    formData.append('password',this.state.pass);
    formData.append('signup','1');
    formData.append('method','1');

   
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
         alert('Successfully register');
        this.props.navigation.navigate('Auth');
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
