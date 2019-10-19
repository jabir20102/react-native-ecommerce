import React from 'react';
import { View,Text,StyleSheet ,Alert,FlatList,ActivityIndicator,ScrollView,Image} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';

import Swipeout from 'react-native-swipeout';

 export default class WishList extends React.Component{  
   
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  };
 render(){
    var swipeBtns = [
        {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress:  ()=>this.props.delete(this.props.item.wishlist_id) 
      }
    
    ];
         
            
      return (
        <Swipeout right={swipeBtns}>
            <Card  key={this.props.item.id} style={{margin:3,paddingTop:5,paddingBottom:5,width:350}} >     
              <View style={{flexDirection:"row",padding:0}}>
                <View style={{marginRight:5}}>
                  {/* <Image source={{ uri:this.props.item.picture.large }}  */}
                  {/* <Image source={{ uri:"http://192.168.3.135/fyp/"+props.item.url }}  */}
                  <Image source={{ uri:"https://huzaifabotique.000webhostapp.com/"+this.props.item.url }} 
                  style={{ height: 100,width:100, left: 0}}
                  resizeMode='center' />
                  </View>
                  <View style={{width:190}}>
                  <Text  style={{fontWeight:'400',fontSize:16}} 
                     onPress={() => this.props.navigation.navigate('Details',{item:this.props.item,offer:1})} > 
                    {this.props.item.title}
                    {/* {this.props.item.name.last.length>5?this.props.item.name.last.substring(0, 5)+"...":this.props.item.name.last} */}
                  </Text> 
                  <Text  style={{fontWeight:'400',fontSize:20}}>Rs: {this.props.item.price}</Text>
                  <View style={{flexDirection:'row'}}>
                  <StarRating
                      disabled={false}
                      maxStars={5}
                      starSize={20}
                      fullStarColor={'red'}
                      rating={parseFloat(this.props.item.average)}
                       />
                    <Text>({this.props.item.total})</Text>
                  </View>
                  </View>
             </View>
             </Card>
             </Swipeout>
      );
  }
}