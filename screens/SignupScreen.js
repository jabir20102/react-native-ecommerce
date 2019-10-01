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
} from 'react-native';
import SearchBox from '../components/SearchBox';

export default class SignupScreen extends React.Component {
state={
  email:'',
  pass:'',
  confirm:''
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
                    onChangeText={(text) => { this.setState({pass: text}) }}
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
      </View>
    );
  }

  _signUpAsync=()=>{
    if(this.state.pass.length>5){
        if(this.state.pass===this.state.confirm){
            this._signUp();
        }else{
            alert("password did't match");
        }
    }else{
        alert("password should be at leat 6 character long");
    }
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
