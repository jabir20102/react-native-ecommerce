import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { View,Text,StyleSheet ,AsyncStorage,FlatList,ActivityIndicator,ScrollView,Image} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Product from '../components/Product';
import Categories from '../components/Categories';
import FlashProducts from './FlashProducts';
import {myaction,myaction2,myaction3} from '../actions/action';

 class HomeScreen extends React.Component {
  
  state = {
    data: [],
    page: 0,
    loading: false,
    finish:false,
  };

  async componentDidMount(){
    try{
    const retrievedItem =  await AsyncStorage.getItem('userToken');
    const item = JSON.parse(retrievedItem);
    if(item!=null){
    this.props.loadItems(item.id);
    this.props.loadWishList(item.id);
    this.props.loadReviews(item.email);
    }else{
    this.props.loadItems(0);
    }
    }catch(err){
      console.log(err)
    }
  }

  componentWillMount() {
    
    this.fetchData();
  }
  
  fetchData =  () => {
    this.setState({ loading: true });
    console.log("loaded trend .. "+this.state.page);
    fetch(`https://huzaifabotique.000webhostapp.com/getProducts?orderBy=visits&limit=2&page=${this.state.page}` // get
)
.then((response) => response.json())
    .then((json) => {
      if(Object.keys(json).length==0 ){
          this.setState(state => ({
            finish: true
          }));
        }
        this.setState(state => ({
          data: [...state.data, ...json],
          loading: false
        }));
        
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
    this.setState({
      // data: [...state.data, ...json.results],
      data: [],
      page: 0
    },this.fetchData());
    
  };
  

  render() {
    if (this.state.loading && this.state.page==0) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      return (
        <View style={{backgroundColor:'#cdcdcd',paddingBottom:90,alignItems:'center'}}>
         <View style={{backgroundColor:'#5C6A77',color:'#fff',fontSize:30,padding:5,width:'100%'}}>
             <Categories navigation={this.props.navigation}/> 
             <Text  style={{color:'#fff'}}>
                Trending Products 
            </Text>
          </View>
          
          
        <FlatList 
            onEndReachedThreshold={0.5}
            onEndReached={this.handleEnd}
            data={this.state.data}
            // onRefresh={this.refresh}
            // refreshing={this.state.loading}
            // horizontal={true}
            renderItem={ ({item,index}) =>  
        
            (index==0)? 
            <View>
               
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



const mapDispatchToProps = (dispatch) => {
  return {
      // removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
      additem: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
      loadItems: (user) => { dispatch(myaction(user)) },
      loadWishList: (user) => { dispatch(myaction2(user)) },
      loadReviews: (user) => { dispatch(myaction3(user)) },
  }
}



export default connect(null, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cdcdcd"
  },
});
