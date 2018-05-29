import React from 'react';
import { Alert,
  View,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  CameraRoll } from 'react-native'
import PropTypes from 'prop-types'
import { Camera, Permissions } from 'expo';
import Expo from 'expo';
import { ImagePicker } from 'expo';







export default class CameraApp extends React.Component {

async  alertIfRemoteNotificationsDisabledAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Hey! You might want to enable notifications for my app, they are good.');
  }
}

 async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ permissionsGranted: status === 'granted' });
  }


  state = {
    // imgUri: null,
    topText: '',
    bottomText: '',
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
            Image Picker
        </Text>

        // The image to display (null by default)
        <Image ref={(ref) => this.imageView = ref}
          style={{ width: 300, height: 300, backgroundColor: '#dddddd' }}
          source={{ uri: this.state.imgUri }}
        />

        // Make a row of buttons
        <View style={{ flexDirection: 'row' }}>

          // "Choose" button
          <TouchableOpacity
            style={styles.button}
            onPress={this._onChoosePic}>
            <Text style={styles.buttonText}>Choose</Text>
          </TouchableOpacity>

          // "Take" button
          <TouchableOpacity
            style={styles.button}
            onPress={this._onTakePic}>
            <Text style={styles.buttonText}>Take</Text>
          </TouchableOpacity>

          // "Save" button
          <TouchableOpacity
            style={styles.button}
            onPress={this._onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }


  // When "Choose" is pressed, we show the user's image library
  // so they may show a photo from disk inside the image view.
  _onChoosePic = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      this.setState({ imageUri: uri });
      // console.log(uri) // this logs correctly
      // TODO: why isn't this showing up inside the Image on screen?
    }
  }

  // When "Take" is pressed, we show the user's camera so they
  // can take a photo to show inside the image view on screen.
  _onTakePic = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
    }
  }

  // When "Save" is pressed, we snapshot whatever is shown inside
  // of "this.imageView" and save it to the device's camera roll.
  _onSave = async () => {
    const uri = await Expo.takeSnapshotAsync(this.imageView, {});
    await CameraRoll.saveToCameraRoll(uri);
    // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
  }



}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    margin: 20,
  },
  buttonText: {
    fontSize: 21,
  },
  button: {
    padding: 13,
    margin: 15,
    backgroundColor: '#dddddd',
  },
  container: {
    marginTop: Expo.Constants.statusBarHeight + 40,
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});


// export default class CameraApp extends React.Component {
//   constructor(props){
//     super(props);

//     state = {
//     imgUri: null,
//     topText: '',
//     bottomText: '',
//     }

// }


// componentDidMount(){

//   // When "Choose" is pressed, we show the user's image library
//   // so they may show a photo from disk inside the image view.
//   _onChoosePic = async () => {
//     const {
//       cancelled,
//       uri,
//     } = await Expo.ImagePicker.launchImageLibraryAsync();
//     if (!cancelled) {
//       this.setState({ imageUri: uri });
//       // console.log(uri) // this logs correctly
//       // TODO: why isn't this showing up inside the Image on screen?
//     }
//   }

//   // When "Take" is pressed, we show the user's camera so they
//   // can take a photo to show inside the image view on screen.
//   _onTakePic = async () => {
//     const {
//       cancelled,
//       uri,
//     } = await Expo.ImagePicker.launchCameraAsync({});
//     if (!cancelled) {
//       this.setState({ imgUri: uri });
//     }
//   }

//   // When "Save" is pressed, we snapshot whatever is shown inside
//   // of "this.imageView" and save it to the device's camera roll.
//   _onSave = async () => {
//     const uri = await Expo.takeSnapshotAsync(this.imageView, {});
//     await CameraRoll.saveToCameraRoll(uri);
//     // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
//   }

// }


//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>
//             Image Picker
//         </Text>


//         <Image ref={(ref) => this.imageView = ref}
//           style={{ width: 300, height: 300, backgroundColor: '#dddddd' }}
//           source={{ uri: this.state.imgUri }}
//         />


//         <View style={{ flexDirection: 'row' }}>


//           <TouchableOpacity
//             style={styles.button}
//             onPress={this._onChoosePic}>
//             <Text style={styles.buttonText}>Choose</Text>
//           </TouchableOpacity>


//           <TouchableOpacity
//             style={styles.button}
//             onPress={this._onTakePic}>
//             <Text style={styles.buttonText}>Take</Text>
//           </TouchableOpacity>


//           <TouchableOpacity
//             style={styles.button}
//             onPress={this._onSave}>
//             <Text style={styles.buttonText}>Save</Text>
//           </TouchableOpacity>

//         </View>
//       </View>
//     );
//   }

// }


// const styles = StyleSheet.create({
//   text: {
//     fontSize: 28,
//     margin: 20,
//   },
//   buttonText: {
//     fontSize: 21,
//   },
//   button: {
//     padding: 13,
//     margin: 15,
//     backgroundColor: '#dddddd',
//   },
//   container: {
//     marginTop: Expo.Constants.statusBarHeight + 40,
//     flex: 1,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//   },
// });





// export default class CameraExample extends React.Component {
//   state = {
//     hasCameraPermission: null,
//     type: Camera.Constants.Type.back,
//   };

//   async componentWillMount() {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasCameraPermission: status === 'granted' });
//   }

//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera style={{ flex: 1 }} type={this.state.type}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity
//                 style={{
//                   flex: 0.1,
//                   alignSelf: 'flex-end',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => {
//                   this.setState({
//                     type: this.state.type === Camera.Constants.Type.back
//                       ? Camera.Constants.Type.front
//                       : Camera.Constants.Type.back,
//                   });
//                 }}>
//                 <Text
//                   style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                   {' '}Flip{' '}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }
// }




// export default class Camera extends React.Component {
//   constructor() {
//   super()
//   this.state = {

//     loading: false // initializing loading state
//   }
//   this.imagePicker = this.imagePicker.bind(this)
// }

  // this.options = {
  //     title: 'Sélectionner une image',
  //     takePhotoButtonTitle: 'Prendre une photo',
  //     chooseFromLibraryButtonTitle: 'Choisir depuis la galerie',
  //     cancelButtonTitle: 'Annuler',
  //     cameraType: 'back',
  //     mediaType: 'photo',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'Seepizz'
  //     }
  //   }
  // }




  // onClick() {
  //     this.setState({ loading: true })
  //     ImagePicker.showImagePicker(this.options, response => {
  //       if (response.didCancel) {
  //         this.setState({ loading: false })
  //       } else if (response.error) {
  //         Alert.alert('Erreur', 'Vérifiez vos permissions aux albums photos et à la caméra.', { cancelable: false })
  //         this.setState({ loading: false })
  //       } else {
  //         const { navigate } = this.props.navigation
  //         navigate('Prediction', { image: response })
  //         this.setState({ loading: false })
  //       }
  //     })
  //   }






//   imagePicker () {

//     const options = {
//       quality: 1.0,
//       // maxWidth: 500,
//       // maxHeight: 500,
//       storageOptions: {
//         skipBackup: true
//       }
//     }


//     // Display the image picker menu, and log the response based on the user's actions
//     ImagePickerManager.showImagePicker(options, response => {
//       console.log('Image Picker Response:', response);
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         // Update the state
//         this.setState({
//           photoInfo: response
//         })
//       }
//     })
//   };

// componentDidMount () {
//   this.imagePicker ()
// }



//   render() {
//     return (
//     <View style={styles.container}>
//       <StatusBar hidden />

//       {
//         !this.state.loading ?
//         <Button
//          title='Analyse a picture!'
//          onPress={this.imagePicker().bind(this)}
//         /> :
//         <ActivityIndicator size="large" color="#e74c3c" />
//       }

//     </View>
//   )
// }






// }

// // <BackgroundImage source={require('../../../wireframes/priority-matrix.JPG')}>

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     width: '100%',
//     flex: 1,
//     justifyContent: 'center'
//   }
// })
