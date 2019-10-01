import * as React from 'react';
import {ScrollView, View,TouchableOpacity,Image,Dimensions  } from 'react-native';
import { RadioButton, Text,Button } from 'react-native-paper';
import {   Card, Title, Paragraph } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import PhotoGrid from 'react-native-image-grid';
import SearchBox from '../components/SearchBox';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Ionicons } from '@expo/vector-icons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default class LinksScreen extends React.Component {
  state = {
    values: [3, 7],
};

multiSliderValuesChange = (values) => {
    this.setState({
        values,
    });
}
  constructor() {
    super();
    this.state = { 
      items: [],
      value:'first'
     };
  }

  componentDidMount() {
   
  }

  render() {
    return(
      <ScrollView>
            
        {/* <MultiSlider
                    values={[this.state.values[0], this.state.values[1]]}
                    sliderLength={280}
                    onValuesChange={this.multiSliderValuesChange}
                    min={0}
                    max={10}
                    step={1}
                />
                <Text style={styles.text}>Two Markers:</Text>
                <Text style={styles.text}>{this.state.values[0]}</Text>
                <Text style={styles.text}>{this.state.values[1]}</Text> */}
                
        
       
       
       
     

      <View style={{ flexDirection: 'row'}}>
      {/* <RangeSlider
          style={{width: 160, height: 80}}
          gravity={'center'}
          min={200}
          max={1000}
          step={20}
          selectionColor="#3df"
          blankColor="#f618"
          onValueChanged={(low, high, fromUser) => {
              this.setState({rangeLow: low, rangeHigh: high})
          }}
          /> */}
    </View>

    </ScrollView>
    )
  }
 
}

LinksScreen.navigationOptions = {
  title: 'Links',
  headerStyle: {
    backgroundColor: '#2C3E4F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight:<SearchBox />,
  
};
