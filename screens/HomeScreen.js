import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView,Image} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import SearchBox from '../components/SearchBox';
import Product from '../components/Product';
import Categories from '../components/Categories';
import FlashProducts from './FlashProducts';

export default class HomeScreen extends React.Component {
  
  state = {
    data: [],
    page: 0,
    loading: false,
    finish:false,
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    fetch(`https://huzaifabotique.000webhostapp.com/getProducts?limit=2&page=${this.state.page}` // get
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
        
      console.log("loaded trend .. "+this.state.page);
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
    
  };

  handleEnd = () => {
    if (!this.state.finish) {
    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    
    }
  };
  refresh = () => {
    // alert('refresh');
    // this.setState({ page: 0 ,data:[]});
    this.setState(state => ({
      // data: [...state.data, ...json.results],
      data: [],
      page: 0
    }));
    this.fetchData();
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
        <View style={{backgroundColor:'#cdcdcd',paddingBottom:40}}>
         <View style={{backgroundColor:'#5C6A77',color:'#fff',fontSize:30,height:40,padding:10}}>
            <Text  style={{color:'#fff'}}>
                Trending Products {this.state.data.length}
            </Text>
          </View>
          
        <FlatList 
        // onMomentumScrollEnd={this.handleEnd}
            onEndReachedThreshold={0.5}
            onEndReached={this.handleEnd}
            data={this.state.data}
            // onRefresh={this.refresh}
            // refreshing={this.state.loading}
            // horizontal={true}
            renderItem={ ({item,index}) =>  
        
            (index==0)? 
            <View>
                     
              <Categories navigation={this.props.navigation}/>         
              
              <FlashProducts navigation={this.props.navigation}/>
              <Product navigation={this.props.navigation}  item={item} /> 
            </View>
            :
            <Product navigation={this.props.navigation}  item={item} />            

          }
          keyExtractor={({id}, index) => '_'+index}
          
          /> 
                   

        </View>
      );
    }


  }      // render close

}
 HomeScreen.navigationOptions = {
  title: 'Home',
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cdcdcd"
  },
});
