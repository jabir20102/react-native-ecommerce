import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView,Image} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
// import SearchBox from '.../components/SearchBox';
import Review  from '../components/Review';
import {deleteaction3} from '../actions/action';

class MyReviewsScreen extends React.Component {
state={
totalPrice:0,
}
  componentWillMount(){

    var total=0;
    // this.props.data.map((item, index) => {
    //   (parseFloat(item.offer)!=1)?
    //   total+=parseFloat(item.price)*(1-parseFloat(item.offer))*(parseFloat(item.qty))
    //   :
    //   total+=parseFloat(item.price)*(parseFloat(item.qty))
    // })
    // this.setState({totalPrice:total})  
    console.log(this.props.data);

  }

  render() {
      return (
        
        <View style={{backgroundColor:'#cdcdcd',flex:1}}>
         <View style={{backgroundColor:'#5C6A77',color:'#fff',fontSize:30,height:40,padding:10}}>
            <Text  style={{color:'#fff'}}>
                My Reviews {this.props.data.length}
            </Text>
          </View>
          
        <FlatList 
            data={this.props.data}
            renderItem={ ({item,index}) =>  
        
            <Review 
            delete={this.props.deleteItem} 
            //  navigation={this.props.navigation}
            item={item} 
            />            

          }
          keyExtractor={({id}, index) => '__'+index}
          
          /> 


        </View>
      );
  }      // render close

}
MyReviewsScreen.navigationOptions = {
  title: 'My Reviews',
  // headerTitle:<SearchBox title="Home" />,
  headerStyle: {
    backgroundColor: '#2C3E4F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // headerRight:<SearchBox />,
};


const mapStateToProps = (state) => {
  return {
      data: state.reviews
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      // additem: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
      // loadItems: () => { dispatch(myaction()) },
      deleteItem: (id) => { dispatch(deleteaction3(id)) },
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MyReviewsScreen);
