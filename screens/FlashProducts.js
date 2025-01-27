import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import { readDirectoryAsync } from 'expo-file-system';

// var Del = require('rect-native-del'); 

export default class FlashProducts extends React.Component {
 
  state = {
    data: [],
    page: 0,
    loading: false,
    finish:false
  };
  
  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    console.log(this.state.page);
    this.setState({ loading: true });
    const response = await fetch(
      `http://huzaifabotique.000webhostapp.com/getProducts/?offer=true&limit=1&page=${this.state.page}`
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
  };

  handleEnd = () => {
    if (!this.state.finish) {
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
          <Text style={{backgroundColor:'red',opacity:0.6,padding:10,marginTop:5,marginLeft:5,width:100,color:'white'}}>Flash Sale</Text>
         
        <FlatList
        // onMomentumScrollEnd={this.handleEnd}
            onEndReachedThreshold={0.5}
            onEndReached={this.handleEnd}
            data={this.state.data}
            horizontal={true}
            renderItem={({item}) =>  
        
            <Card style={{margin:5,width:150}}
             onPress={() => this.props.navigation.navigate('Details',{item:item,offer:item.percent})}>     
            <Card.Content>       
            <Card.Cover source={{ uri:"http://huzaifabotique.000webhostapp.com/"+ item.url }}
             style={{ height: 100, left: 0, right: 0 }}
             resizeMode="cover"  />
               <View style={{ position: 'absolute', backgroundColor:'yellow',opacity:0.6,padding:5 }}>
                   <Text style={{fontWeight:'bold'}}>{item.percent*100}% off</Text>
               </View>
                 <Text> {item.title.length>30?item.title.substring(0, 30)+"...":item.title}</Text>
               </Card.Content>
               <Card.Actions>
               {/* <Del>Rs. {item.price}</Del> */}
                 <Text  style={{fontWeight:'500',fontSize:20}}>Rs: {item.price}</Text>
                 
               <Button style={{backgroundColor:'#E54D42',borderRadius:30,marginLeft:10}} icon="shopping-cart"
                mode="contained" onPress={() => Alert.alert('Added to card')}>
                 </Button>
               </Card.Actions >
             </Card>

              // <Card style={{margin:5,width:170}} onPress={() => this.props.navigation.navigate('Details',{item:item})}>     
              // <Card.Content>       
              // <Card.Cover source={{ uri:item.picture.large }}
              // style={{ height: 150, left: 0, right: 0 }}
              // resizeMode="contain"  />
                
              //     <Text> {item.name.last.length>5?item.name.last.substring(0, 5)+"...":item.name.last}</Text>
              //   </Card.Content>
              //   <View style={{ position: 'absolute', backgroundColor:'yellow',opacity:0.6,padding:5 }}>
              //     <Text style={{fontWeight:'bold'}}>10% off</Text>
              // </View>
              //   <Card.Actions>
                  
              //     <Text  style={{fontWeight:'500',fontSize:20}}>Rs: {item.gender}</Text>
                  
              //   <Button style={{backgroundColor:'#E54D42',borderRadius:30,marginLeft:10}} icon="shopping-cart"
              //     mode="contained" onPress={() => Alert.alert('Added to card')}>
              //     </Button>
              //   </Card.Actions >
              // </Card>

          }
          // numColumns={2}
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