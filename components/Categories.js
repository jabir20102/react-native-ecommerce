import React from 'react';
import {View ,Text,Image,TextInput,Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

 export default class Categories extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {   
      return (
        <View style={{flexDirection:"row",marginTop:3,backgroundColor:'#5C6A77',justifyContent:'center'}} >

          <View style={{margin:5}}>
            <Ionicons name="ios-phone-portrait" size={25} color={'black'}
            style={{marginBottom:3,padding:10,borderWidth:1,borderRadius:40,backgroundColor:'cyan'}} 
            onPress={() => this.props.navigation.navigate('subCategory',{cat:6})}/>
            <Text style={{color:'white'}}>Mobiles</Text>
          </View>
          <View style={{margin:5}}>
            <Ionicons name="md-search" size={25} color={'black'}
            style={{marginBottom:3,padding:10,borderWidth:1,borderRadius:40,backgroundColor:'cyan'}} 
            onPress={() => this.props.navigation.navigate('subCategory',{cat:7})}/>
            <Text style={{color:'white'}}>Mobiles</Text>
          </View>
          <View style={{margin:5}}>
            <Ionicons name="md-search" size={25} color={'black'}
            style={{marginBottom:3,padding:10,borderWidth:1,borderRadius:40,backgroundColor:'cyan'}} 
            onPress={() => this.props.navigation.navigate('subCategory',{cat:8})}/>
            <Text style={{color:'white'}}>Mobiles</Text>
          </View>
        
        </View>
      );
    }
  }