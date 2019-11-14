import React from 'react';
import {View,Modal,Button,Text,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

 export default class Settings extends React.Component {
  state={
    modalVisible:false,

  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    
  
    render() {   
      return (
        <View style={{paddingRight:20}}>
        
        <Ionicons name="md-settings" size={20} color={'white'}  style={{}}
         onPress={()=>{ this.setModalVisible(!this.state.modalVisible) }}         
        />
        <Modal
            presentationStyle='overFullScreen'
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              // alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View style={{flexDirection:'row',justifyContent:'flex-end'}}>            

                
                  <Button onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}
                  title='Close'
                  />
                  
              </View>
              

                    <View style={{paddingTop:10}}>
                        <TextInput placeholder='old password' />
                        <TextInput placeholder='new password' />
                        <TextInput placeholder='confirm new  password' />
                    </View>
              
              <Button style={{backgroundColor:'#E54D42'}} icon="shopping-cart" mode="contained" 
            onPress={
              () => {
                  alert('save')
                  }
               }
               title='save'
               />
              
          
            
            </View>
            </Modal>
        </View>
      );
    }
  }