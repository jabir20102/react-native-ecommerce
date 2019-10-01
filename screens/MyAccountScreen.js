import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

// import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
// import MySettings from './Settings/MySettings';
// import MyWishList from './wishList/MyWishList';

// const settingsStack = createStackNavigator({ mysettings: MySettings });
// const wishlistStack = createStackNavigator({ mywishlist: MyWishList });

// export default MyAccountScreen = createAppContainer(
//     createSwitchNavigator(
//     {
//       settings: settingsStack,
//       wishList: wishlistStack,
//     },
//     {
//       initialRouteName: 'wishList',
//     }
//   ));

export default class  MyAccountScreen extends React.Component{
    render() {
      return (
        <View style={{flex:1}}>
          <Button style={{margin:10}} title="Post" onPress={this._showMoreApp} />
          <Button title="sign out" onPress={this._signOutAsync} />
        </View>
      );
    }
  
    _showMoreApp = () => {
    //   this.props.navigation.navigate('Other');

    let formData=new FormData();
    formData.append('name','hello world');
    formData.append('email','khan@gmail.com');
    formData.append('comment','khan gmail.com');
    formData.append('isApproved','1');
    formData.append('product_id','12');

    // fetch('http://192.168.3.135:80/fyp/comment'
    // fetch('https://huzaifabotique.000webhostapp.com/comment'  // post 
    fetch('https://huzaifabotique.000webhostapp.com/getProducts?limit=2&page=0' // get
    // , {
    //   method: 'POST',
    //   body:formData,
    //   }
)
.then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      alert(responseJson)
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });

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