import * as React from 'react';
import {ScrollView,Text,Button, View,ActivityIndicator,Image,FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';
import {   Card, Title, Paragraph,List } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import PhotoGrid from 'react-native-image-grid';
import SearchBox from '../components/SearchBox';
import { Ionicons } from '@expo/vector-icons';
// import RangeSlider from 'rn-range-slider';
// import RangeSlider from 'rn-range-slider';

export default class SubCategory extends React.Component {

  constructor() {
    super();
    this.state = { 
      cat:0,
      sub:0,
      items: [],
      value:'first',
      loading:true
     };
  }

  async componentDidMount() {
    const cat=this.props.navigation.state.params.cat;
    this.setState({cat:cat});
    // alert(subCat);
    const response = await fetch( 
      `http://huzaifabotique.000webhostapp.com/category?cat=${cat}`
    );
   
    const json = await response.json();
    // console.log(json);
    this.setState(state => ({
      loading:false,
      items: json
    }));
    // alert("home:"+this.state.page);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex:1}}>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
    return(
      <View style={{flex:1}}>
        {/* <RangeSlider
            style={{width: 160, height: 80}}
            gravity={'center'}
            min={200}
            max={1000}
            step={20}
            selectionColor="#3df"
            blankColor="#f618"
            // onValueChanged={(low, high, fromUser) => {
            //     this.setState({rangeLow: low, rangeHigh: high})
            // }}
         /> */}
         
        <FlatList
            data={this.state.items}
            renderItem={({item}) =>  

             <List.Item key={item.id}
              title={item.sub_cat_name}
              onPress={()=> this.props.navigation.navigate('Filter',{cat:this.state.cat,sub:item.id})}
              // description="Item description"
              left={props => <List.Icon {...props} icon="folder" />}
              style={{marginBottom:2,borderBottomWidth:1}}
            />  
            

          }
            // numColumns={3}
            keyExtractor={({id}, index) => '_'+index}
          
          />
        </View>

        
    )
        }
  }
 
  renderItem(item) {
    
    return(
      <Card style={{margin:5}}>           
        <Card.Cover source = {{ uri: item.src }} 
        style = {{ width: 165}}
             resizeMode="cover"  />
         <Card.Content>
           <Title>Jabir Khan</Title>
           <Paragraph>Rs: 1500</Paragraph>
         </Card.Content>
       </Card>
    )
  }
}

SubCategory.navigationOptions = {
  title: 'sub-categories',
  headerStyle: {
    backgroundColor: '#2C3E4F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // headerRight:<SearchBox />,
  
};
