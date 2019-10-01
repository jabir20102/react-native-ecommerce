import React from 'react';
import {View ,Text,Image,TextInput,Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';

 export default class SearchBox extends React.Component {
  
   state={
      query:'',
      search:'',
      size:0,
      focus:0,
    }
    updateSearch = search => {
      this.setState({ search });
    };
    submit = () => {
      navigation.navigate('search',{q:this.state.query});
    };
    
  
    render() {   
      return (
        <View style={{flexDirection:'row',borderColor:'#E54D42',paddingRight:20}}>

        <Text style={{fontWeight:'bold',margin:20,fontSize:18,color:'white'}}>{this.props.title}</Text>

        <View style={{borderBottomWidth:(this.state.focus),borderColor:'red',flexDirection:'row',margin:20,marginLeft:0}}>
        
        <TextInput placeholder="Search..." style={{color:"#fff",fontSize:16,fontWeight:'400',width:this.state.size}}     
         onBlur={() => {this.setState({size:0,focus:0})}} 
         onChangeText={(txt)=>{this.setState({query:txt})}}
          onSubmitEditing={()=>this.submit()}
        />
        <Ionicons name="md-search" size={20} color={'white'}  style={{paddingRight:10,paddingBottom:10}}
         onPress={()=>{this.setState({size:120,focus:1})}}         
        />
        </View>
        
        </View>
      );
    }
  }