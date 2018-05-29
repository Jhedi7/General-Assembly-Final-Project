import React from 'react';
import { Alert,
  View,
  StatusBar,
  ActivityIndicator,
  StyleSheet, Text, Button, TouchableHighlight, TouchableOpacity, Image,  Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker'
import ImagePickerManager from 'react-native-image-picker'
import Camera from "react-native-camera";



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
