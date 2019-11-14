import React from 'react';
import {View ,Text,Image,TextInput,Button, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import suit from '../assets/images/suit.png'
import paint from '../assets/images/pants.png'
import shirt from '../assets/images/shirt.png'

 export default class Categories extends React.Component {
  constructor(props) {
    super(props);

    const sui =  require('../assets/images/suit.png');
    const pa =  require('../assets/images/pants.png');
    const shir =  require('../assets/images/shirt.png');
    this.state = { suit: sui,paint:pa,shirt,shir };
  }
    render() {   
      return (
        <View style={{flexDirection:"row",backgroundColor:'#5C6A77',justifyContent:'center'}} >

            <View style={{margin:5}}>
            <TouchableOpacity style={{marginBottom:3,padding:10,borderWidth:1,borderRadius:40,backgroundColor:'white'}}
            onPress={() => this.props.navigation.navigate('subCategory',{cat:1})}
            >
            <Image  source={this.state.suit} style={{width:32,height:32}} />
            
            </TouchableOpacity>
            <Text style={{color:'white'}}>Suits</Text>
          </View>
          <View style={{margin:5}}>
            <TouchableOpacity style={{marginBottom:3,padding:10,borderWidth:1,borderRadius:40,backgroundColor:'white'}}
            onPress={() => this.props.navigation.navigate('subCategory',{cat:2})}
            >
            <Image  source={this.state.shirt} style={{width:32,height:32}} />
            
            </TouchableOpacity>
            <Text style={{color:'white'}}>Shirts</Text>
          </View>
          <View style={{margin:5}}>
            <TouchableOpacity style={{marginBottom:3,padding:10,borderWidth:1,borderRadius:40,backgroundColor:'white'}}
            onPress={() => this.props.navigation.navigate('subCategory',{cat:3})}
            >
            <Image  source={this.state.paint} style={{width:32,height:32}} />
            
            </TouchableOpacity>
            <Text style={{color:'white'}}>Paints</Text>
          </View>
        
        </View>
      );
    }
  }