import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView,Image} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import SearchBox from '../components/SearchBox';
import Product from '../components/Product';
import Categories from '../components/Categories';
import FlashProducts from './FlashProducts';

export default class FilterProducts extends React.Component {
  
  state = {
    cat:0,
    sub:0,
    data: [],
    page: 0,
    loading: false,
    finish:false
  };

  componentWillMount() {
      
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const cat=this.props.navigation.state.params.cat;
    const sub=this.props.navigation.state.params.sub;
    fetch(`https://huzaifabotique.000webhostapp.com/getProducts?category=${cat}&sub-category=${sub}&limit=2&page=${this.state.page}` // get
)
.then((response) => response.json())
    .then((json) => {
      if(Object.keys(json).length==0 ){
          // if(Object.keys(json.results).length==0 ){
          this.setState(state => ({
            finish: true
          }));
        }
        this.setState(state => ({
          // data: [...state.data, ...json.results],
          data: [...state.data, ...json],
          loading: false
        }));
        // alert("home:"+this.state.page);
      // console.log(responseJson);
      // alert(responseJson)
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
    
  };

  handleEnd = () => {
    if (!this.state.finish) {
      console.log("loaded.. "+this.state.page);
    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    
    }
  };
  

  render() {
    if (this.state.loading && this.state.page==0) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={{backgroundColor:'#cdcdcd'}}>
         <View style={{backgroundColor:'#5C6A77',color:'#fff',fontSize:30,height:40,padding:10}}>
            <Text  style={{color:'#fff'}}>
              {this.state.data.length}  Products
            </Text>
          </View>
          
        <FlatList 
        // onMomentumScrollEnd={this.handleEnd}
            onEndReachedThreshold={0.5}
            onEndReached={this.handleEnd}
            data={this.state.data}
            // horizontal={true}
            renderItem={ ({item,index}) =>  
        
            <Product navigation={this.props.navigation}  item={item} />            

          }
          // keyExtractor={({id}, index) => index}
          
          /> 
                   

        </View>
      );
    }


  }      // render close
}

FilterProducts.navigationOptions = {
  title: 'Filter Products',
  headerStyle: {
    backgroundColor: '#2C3E4F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
//   headerRight:<SearchBox />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cdcdcd"
  },
});
