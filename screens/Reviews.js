import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import Comments from './Comments';
// var Del = require('rect-native-del'); 

export default class Reviews extends React.Component {
 
  state = {
    data: [],
    page: 0,
    loading: false,
    finish:false,
  };
  

  render() {
    
      return (
        <View style={{backgroundColor:'#cdcdcd',paddingBottom:50,flex:1}}>
          <View style={{backgroundColor:'#fff',marginTop:5,marginBottom:5,padding:10,justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontSize:15}}>{this.props.navigation.state.params.item.average}</Text>
            <Text style={{}}> / 5 </Text>
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={15}
              fullStarColor={'#f00'}
              rating={parseFloat(this.props.navigation.state.params.item.average)}
              />

            </View>
            <Text >{this.props.navigation.state.params.item.total} Rattings</Text>
          </View>
            <Comments id={this.props.navigation.state.params.item.id} scroll={true} />
        </View>
      );
    


  }      // render close
}

Reviews.navigationOptions = {
    title: 'Reviews',
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
  