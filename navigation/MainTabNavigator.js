import React, { Component } from 'react';
import {Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createAppContainer,createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SubCategory from '../screens/SubCategory';

import MyAccountScreen from '../screens/MyAccountScreen';
import MyWishListScreen from '../screens/MyWishListScreen';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import FilterProducts from '../screens/FilterProducts';
import SignupScreen from '../screens/SignupScreen';
import Reviews from '../screens/Reviews';
import SearchScreen from '../screens/SearchScreen';
// import SearchBox from '../components/SearchBox';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home:{
      screen:HomeScreen
    } ,
    Filter:{
      screen:FilterProducts
    } ,
    Details: {
      screen:DetailsScreen
    },
    subCategory: {
      screen:SubCategory
    },
    reviews: {
      screen:Reviews
    },
    search: {
      screen:SearchScreen
    }
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      badge='home'
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links:{
      screen:LinksScreen
    } 
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} badge='cart' name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'} />
  ),
};
LinksStack.path = '';


const AppStack = createStackNavigator({ MyAccount: MyAccountScreen,MyWishList:MyWishListScreen});
// const WishStack = createStackNavigator({ myWishList: MyWishList });
// const SettingStack = createStackNavigator({ mySettings: MySettings });
const AuthStack = createStackNavigator({ SignIn: SignInScreen,Signup:SignupScreen });

const SettingsStack = createAppContainer(
    createSwitchNavigator(
    {
      
      AuthLoading: AuthLoadingScreen,
      // Settings: SettingStack,
      // WishLists: WishStack,
      App: AppStack,
      Auth: AuthStack,
      
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));
// const SettingsStack = createStackNavigator(
//   {
//     Settings: SettingsScreen,
//   },
//   config
// );

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} badge='account' name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
  
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
},
  {
    tabBarOptions: {
      activeTintColor:'#E54D42',
    style: {
      backgroundColor: '#5C6A77',      
    },
  }
}

);

tabNavigator.path = '';

export default tabNavigator;
