import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView,Image} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import CartItem from '../components/CartItem';
import {deleteaction} from '../actions/action';

class LinksScreen extends React.Component {
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

  }

  render() {
      return (
        
        <View style={{backgroundColor:'#cdcdcd',paddingBottom:40}}>
         <View style={{backgroundColor:'#5C6A77',color:'#fff',fontSize:30,height:40,padding:10}}>
            <Text  style={{color:'#fff'}}>
                Cart Products {this.props.data.length}
            </Text>
          </View>
          
        <FlatList 
        // onMomentumScrollEnd={this.handleEnd}
            // onEndReachedThreshold={0.5}
            // onEndReached={this.handleEnd}
            data={this.props.data}
            // onRefresh={this.refresh}
            // refreshing={this.state.loading}
            // horizontal={true}
            renderItem={ ({item,index}) =>  
        
            <CartItem delete={this.props.deleteItem} navigation={this.props.navigation}  item={item} />            

          }
          keyExtractor={({id}, index) => '__'+index}
          
          /> 

          <View style={{flexDirection:'row'}}>
            <View>
              <Text>Total {this.props.data.length}</Text>
              <Text>Total Rs. {
                this.state.totalPrice            
              }</Text>
            </View>
            <Button onPress={()=>alert('checkout')}>Check out</Button>
          </View>


        </View>
      );
  }      // render close

}
 LinksScreen.navigationOptions = {
  title: 'Cart',
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
      data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      // removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
      additem: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
      loadItems: () => { dispatch(myaction()) },
      deleteItem: (id) => { dispatch(deleteaction(id)) },
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen);
