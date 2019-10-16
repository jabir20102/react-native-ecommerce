import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
           <AppNavigator />
       </Provider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


// import React, { Component } from 'react';
 
// import { StyleSheet, Text, View, PixelRatio, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
 
// import ImagePicker from 'react-native-image-picker';
 
// import RNFetchBlob from 'rn-fetch-blob';
 
// export default class App extends Component {
 
//   constructor() {
 
//     super();
 
//     this.state = {
 
//       ImageSource: null,
 
//       data: null,
 
//       email: ''
 
//     }
//   }
 
//   selectPhotoTapped() {
//     const options = {
//       quality: 1.0,
//       maxWidth: 500,
//       maxHeight: 500,
//       storageOptions: {
//         skipBackup: true
//       }
//     };
 
//     ImagePicker.showImagePicker(options, (response) => {
//       console.log('Response = ', response);
 
//       if (response.didCancel) {
//         console.log('User cancelled photo picker');
//       }
//       else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       }
//       else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       }
//       else {
//         let source = { uri: response.uri };
 
//         this.setState({
 
//           ImageSource: source,
//           data: response.data
 
//         });
//       }
//     });
//   }
 
//   uploadImageToServer = () => {
 
//     RNFetchBlob.fetch('POST', 'http://huzaifabotique.000webhostapp.com/upload_profile', {
//       Authorization: "Bearer access-token",
//       otherHeader: "foo",
//       'Content-Type': 'multipart/form-data',
//     }, [
//         { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
//         { name: 'email', data: this.state.email }
//       ]).then((resp) => {
 
//         var tempMSG = resp.data;
 
//         tempMSG = tempMSG.replace(/^"|"$/g, '');
 
//         Alert.alert(tempMSG);
 
//       }).catch((err) => {
//         // ...
//       })
 
//   }
 
//   render() {
//     return (
//       <View style={styles.container}>
 
//         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
 
//           <View style={styles.ImageContainer}>
 
//             {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
//               <Image style={styles.ImageContainer} source={this.state.ImageSource} />
//             }
 
//           </View>
 
//         </TouchableOpacity>
 
 
//         <TextInput
 
//           placeholder="Enter Image Name "
 
//           onChangeText={data => this.setState({ email: data })}
 
//           underlineColorAndroid='transparent'
 
//           style={styles.TextInputStyle}
//         />
 
 
//         <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >
 
//           <Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>
 
//         </TouchableOpacity>
 
//       </View>
//     );
//   }
 
// }
 
// const styles = StyleSheet.create({
 
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#FFF8E1',
//     paddingTop: 20
//   },
 
//   ImageContainer: {
//     borderRadius: 10,
//     width: 250,
//     height: 250,
//     borderColor: '#9B9B9B',
//     borderWidth: 1 / PixelRatio.get(),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#CDDC39',
 
//   },
 
//   TextInputStyle: {
 
//     textAlign: 'center',
//     height: 40,
//     width: '80%',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#028b53',
//     marginTop: 20
//   },
 
//   button: {
 
//     width: '80%',
//     backgroundColor: '#00BCD4',
//     borderRadius: 7,
//     marginTop: 20
//   },
 
//   TextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//     padding: 10
//   }
 
// });