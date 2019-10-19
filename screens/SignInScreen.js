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
import {connect} from 'react-redux';
import {myaction} from '../actions/action';

 class SignInScreen extends React.Component {
state={
  email:'khan',
  pass:'khan',
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
                    value={this.state.pass}
                    onChangeText={(text) => { this.setState({pass: text}) }}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false} 
                />
        <Button style={{padding:10}} title="Sign in!" onPress={this._signInAsync} />
        <Text style={{fontWeight:'bold',fontSize:18}} onPress={()=>this.props.navigation.navigate('Signup') } >Create an Account</Text>
      </View>
    );
  }

  _signInAsync =  () => {
    let formData=new FormData();
    formData.append('email',this.state.email);
    formData.append('pass',this.state.pass);
    formData.append('signin','1');
    

    // fetch('http://192.168.3.135:80/fyp/auth'
    fetch('http://huzaifabotique.000webhostapp.com/auth'  // post 
    , {
      method: 'POST',
      body:formData,
      }
)
.then((response) => 
// alert(response) )
response.json())
    .then((responseJson) => {
      if(responseJson.id!=null){
        this.props.loadItems(responseJson.id);
         AsyncStorage.setItem('userToken', JSON.stringify(responseJson))
         .then(()=>{});
         
        this.props.navigation.navigate('App');
      }else{
      alert(responseJson)
      } 
    }
    )
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
    
  };
}
  
SignInScreen.navigationOptions = {
    title: 'Sign in',
    headerStyle: {
      backgroundColor: '#2C3E4F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    // headerRight:<SearchBox />,
    
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        loadItems: (user) => { dispatch(myaction(user)) },
    }
  }
  
  
  
  export default connect(null, mapDispatchToProps)(SignInScreen);