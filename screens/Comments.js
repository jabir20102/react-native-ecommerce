import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
// var Del = require('rect-native-del'); 

export default class Comments extends React.Component {
 
  state = {
    data: [],
    page: 0,
    loading: false,
    finish:false,
    starCount:3,
  };
  
  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    
    const id=this.props.id;
    const response = await fetch
        (`https://huzaifabotique.000webhostapp.com/comment?ProdId=${id}&limit=2&page=${this.state.page}`
    );
   
    const json = await response.json();
    // console.log(json);
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
    // alert(this.state.page);
  };

  handleEnd = () => {
    if (!this.state.finish && this.props.scroll) {
      console.log("loaded comment .. "+this.state.page);
    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
    
    }
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
        <View style={{backgroundColor:'#cdcdcd'}}>
         
        <FlatList
            onMomentumScrollEnd={this.handleEnd}
            onEndReachedThreshold={0.5}
            onEndReached={this.handleEnd}
            data={this.state.data}
            // horizontal={true}
            renderItem={({item}) => 

            <View style={{padding:5,marginBottom:5,backgroundColor:'#fff'}}>
             
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontWeight:'bold',marginRight:10}}>{item.name}</Text>  
                  <Text>{item.added_date}</Text>
                </View>

                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={15}
                  fullStarColor={'#f00'}
                  rating={parseFloat(item.stars)}
                  />

              </View>  
              <Text>{item.comment}</Text>        
            </View>

          }
          keyExtractor={({id}, index) => id}
          
          />   
           

        </View>
      );
    }


  }      // render close
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#cdcdcd"
    },
  });