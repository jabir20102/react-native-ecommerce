import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {View,Text} from 'react-native';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';


 class  TabBarIcon extends React.Component {
  render(){
  return (
    <View>
      <Ionicons
              name={this.props.name}
              size={26}
              style={{ marginBottom: -3 }}
              color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          {(this.props.badge=='cart' && this.props.data.length>0)?
            <View style={{ position: 'absolute', left: 18, top: 0, backgroundColor: 'red', borderRadius: 9, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>{this.props.data.length}</Text>
            </View>
            :null}
    </View>
    
   
  );
  }
}


const mapStateToProps = (state) => {
  return {
      data: state.cartItems
  }
}
export default connect(mapStateToProps)(TabBarIcon);
