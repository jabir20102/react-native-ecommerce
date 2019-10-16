import React from 'react';
import { View,Text,Modal,TouchableHighlight ,Alert,FlatList,ActivityIndicator,ScrollView,Image} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { Ionicons } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';

import Product from '../components/Product';

 export default class CartItem extends React.Component{  
   
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
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
    onPress:  ()=>this.props.delete(this.props.item.cart_id) 
  },{
    text: 'Edit',
    backgroundColor: 'yellow',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {}
  }

];
      return (
      <View>
        <Swipeout right={swipeBtns}>
            <Card  key={this.props.item.id} style={{margin:3,paddingTop:5,paddingBottom:5,width:350}} >     
              <View style={{flexDirection:"row",padding:0}}>
                <View style={{marginRight:5}}>
                  <Image source={{ uri:"https://huzaifabotique.000webhostapp.com/"+this.props.item.url }} 
                  style={{ height: 100,width:100, left: 0}}
                  resizeMode='center' />
                  </View>
                  <View style={{width:240}}>
                  <Text  style={{fontWeight:'400',fontSize:16}} 
                     onPress={() => this.props.navigation.navigate('Details',{item:this.props.item})} > 
                    {this.props.item.title}
                    {/* {this.props.item.name.last.length>5?this.props.item.name.last.substring(0, 5)+"...":this.props.item.name.last} */}
                  </Text> 
                  <Text>{(this.props.item.color!=null)?'Color Family:'+this.props.item.color+' , ':''}
                  {(this.props.item.size!=null)?'Size :'+this.props.item.size:' '}
                  </Text>
                 <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                     <View>
                         {(this.props.item.offer==1)?
                         <Text  style={{fontWeight:'400',fontSize:20}}>Rs: {this.props.item.price}</Text>
                         :
                         <View>
                            <Text  style={{fontWeight:'400',fontSize:20}}>Rs: 
                            {parseFloat(this.props.item.price)*(1-parseFloat(this.props.item.offer))}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text  style={{fontWeight:'400',fontSize:20,fontFamily:'serif'}}>Rs: {this.props.item.price}</Text>
                                <Text>-{this.props.item.offer*100}%</Text>
                            </View>
                        </View>
                         }
                    </View>
                    <View style={{flexDirection:'row',paddingTop:10}}>
                        <Button style={{fontSize:40}} onPress={()=>this.setQty(-1)}>-</Button>
                        <Text style={{top:5,fontSize:20}}>{this.props.item.qty}</Text>
                        <Button style={{fontSize:40}} onPress={()=>this.setQty(+1)}>+</Button>
                    </View>
                    
                  {/* <Button style={{backgroundColor:'#E54D42',borderRadius:30}} icon="shopping-cart"
                  mode="contained" onPress={() => alert('Added to card','body')}>
                  </Button> */}
                  </View>
                  </View>
             </View>
             </Card>
             </Swipeout>

            
</View>
      );
  }
}