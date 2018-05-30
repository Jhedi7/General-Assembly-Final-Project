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
import RNFetchBlob from "react-native-fetch-blob";
import Clarifai from "clarifai";

export default class CameraApp extends React.Component {
  state = {
    // imgUri: null,
    topText: '',
    bottomText: '',
  }

async  alertIfRemoteNotificationsDisabledAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('OH GOD LET ME USE IT');
  }
}

 async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ permissionsGranted: status === 'granted' });
  }



  generateBreed = async function(){

    // save to CameraRoll
    CameraRoll.saveToCameraRoll(this.state.path);
    // convert the image to base64 data
    RNFetchBlob.fs
      .readFile(this.state.path, "base64")
      .then(data => {
        app.models
          .predict(Clarifai.GENERAL_MODEL, { base64: data })
          .then(response => {
            // do something with response
            console.log("response from clarifai ", response);
            this.setState({
              data: response,
              conceptsLoaded: true
            });
            this.createStringOfNames();
          });

      })
      .catch(error => {
        // error on converting image to base64 data
        console.log(error);
      });

  }





  render() {
    return (
      <View style={styles.container}>


        // The image to display (null by default)
        <Image ref={(ref) => this.imageView = ref}
          style={{ width: 400, height: 400, backgroundColor: '#dddddd' }}
          source={{ uri: this.state.imgUri }}
        />


        <View style={{ flex: 1}}>


          <TouchableOpacity
            style={styles.button}
            onPress={this.choosePicture}>
            <Text style={styles.buttonText}>Choose from your pictures</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.button}
            onPress={this.takePicture}>
            <Text style={styles.buttonText}>Take a picture</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.button}
            onPress={this.savePicture}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

        </View>



        <TouchableOpacity
            style={styles.button}
            onPress={this.generateBreed}>
            <Text style={styles.buttonText}>LOOK UP SOME DOGS!</Text>
          </TouchableOpacity>

      </View>
    );
  }



  choosePicture = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      this.setState({ imageUri: uri });
      console.log(uri) // this logs correctly

    }
  }


  takePicture = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
    }
  }


  savePicture = async () => {
    const uri = await Expo.takeSnapshotAsync(this.imageView, {});
    await CameraRoll.saveToCameraRoll(uri);

  }



}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 15,
  },
  buttonText: {
    fontSize: 13,
    alignItems: 'center'

  },
  button: {
    padding: 8,
    margin: 8,
    backgroundColor: 'white',
  },
  container: {
    marginTop: Expo.Constants.statusBarHeight + 40,
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
});






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
