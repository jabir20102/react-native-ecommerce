import React from 'react';
import { View,Text,Modal,TouchableHighlight ,Alert,FlatList,ActivityIndicator,ScrollView,Image} from 'react-native';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';

import Product from '../components/Product';

 export default class CartItem extends React.Component{  
   
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      qty:parseInt(this.props.item.qty),
    };
  }
  
  incQty=()=>{
    if(this.state.qty!=5){
    this.setState({qty:this.state.qty+1},()=>{
      this.props.edit(this.props.item.cart_id,this.state.qty)  
    });
  }
}
  decQty=()=>{
    if(this.state.qty!=1){
      this.setState({qty:this.state.qty-1},()=>{
        this.props.edit(this.props.item.cart_id,this.state.qty)  
      });
  }
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  };

 render(){
  var swipeBtns = [
{
  component:
      (
        <View style={{flex:1,backgroundColor:'yellow',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
        <Ionicons name="md-heart" size={30} color={'white'}  
          onPress={()=> this.props.delete(this.props.item.cart_id) }         
        />
        </View>
      )
  },
  {
  component:
      (
        <View style={{flex:1,backgroundColor:'red',alignItems:'center',alignContent:'center',justifyContent:'center'}}>
        <AntDesign name="delete" size={30} color={'white'}  
         onPress={()=> this.props.delete(this.props.item.cart_id) }         
        />
        </View>
      )
  }

];
      return (
        <Swipeout right={swipeBtns} style={{width:'100%'}}>
            <Card  key={this.props.item.id} style={{margin:3,paddingTop:5,paddingBottom:5}} >     
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
                         <Text  style={{fontWeight:'400',fontSize:20}}>Rs: 
                         {parseFloat(this.props.item.price)*parseFloat(this.state.qty)}
                         </Text>
                         :
                         <View>
                            <Text  style={{fontWeight:'400',fontSize:20}}>Rs: 
                            {parseFloat(this.props.item.price)*parseFloat(this.state.qty)*(1-parseFloat(this.props.item.offer))}</Text>
                            <View style={{flexDirection:'row',alignSelf:'center'}}>
                                <Text  style={{fontWeight:'400',fontSize:20,fontFamily:'serif'}}>Rs: {parseFloat(this.props.item.price)*parseFloat(this.state.qty)}</Text>
                                <Text style={{fontSize:10,marginTop:5}}>-{this.props.item.offer*100}%</Text>
                            </View>
                        </View>
                         }
                    </View>
                    <View style={{flexDirection:'row',paddingTop:10}}>
                        <Button style={{fontSize:40}} onPress={()=>this.decQty()}>-</Button>
                        <Text style={{top:5,fontSize:20}}>{this.state.qty}</Text>
                        <Button style={{fontSize:40}} onPress={()=>this.incQty()}>+</Button>
                    </View>
                    
                  </View>
                  </View>
             </View>
             </Card>
             </Swipeout>
      );
  }
}