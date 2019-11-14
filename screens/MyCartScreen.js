import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView,Image,ToastAndroid} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
// import RangeSlider from 'rn-range-slider';



import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import CartItem from '../components/CartItem';
import {deleteaction,editCart} from '../actions/action';

class MyCartScreen extends React.Component {
state={
totalPrice:0,
value:20,
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
        
        <View style={{backgroundColor:'#cdcdcd',flex:1}}>
      {/* <RangeSlider
          style={{width: 160, height: 80}}
          gravity={'center'}
          min={200}
          max={1000}
          step={20}
          selectionColor="#3df"
          blankColor="#f618"
          onValueChanged={(low, high, fromUser) => {
              this.setState({rangeLow: low, rangeHigh: high})
          }}/> */}
          
            
            <View style={{backgroundColor:'#5C6A77',color:'#fff',fontSize:30,height:40,padding:10}}>
                <Text  style={{color:'#fff'}}>
                    Cart Products {this.props.data.length}
                </Text>
              </View>
          {(this.props.isLoading)?
           <View style={{color:'red'}}>
              <ActivityIndicator size="large" />
          </View>
          :
          null
          }
        <FlatList 
            data={this.props.data}
            renderItem={ ({item,index}) =>  
        
            <CartItem delete={this.props.loading(),this.props.deleteItem} edit={this.props.editItem} navigation={this.props.navigation}  item={item} />            

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
MyCartScreen.navigationOptions = {
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
      data: state.cartItems,
      isLoading:state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      additem: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
      loadItems: () => { dispatch(myaction()) },
      editItem: (id,qty) => { dispatch(editCart(id,qty)) },
      deleteItem: (id) => { dispatch(deleteaction(id)) },
      loading: () => { dispatch({type:'LOADING',payload:true}) },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCartScreen);
