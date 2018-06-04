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

import Expo from 'expo';
import { ImagePicker, Camera, Permissions } from 'expo';

import Clarifai from "clarifai";



export default class CameraApp extends React.Component {


  constructor(){
    super();
    this.state = {

      hasCameraPermission: null,
      loading: false,
      type: Camera.Constants.Type.back
  }
  // this.generateBreed = this.generateBreed.bind(this);
  this.takePicture = this.takePicture.bind(this);
  this.choosePicture = this.choosePicture.bind(this);
}

async  alertIfRemoteNotificationsDisabledAsync() {
  const { Permissions } = Expo;
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('OH GOD LET ME USE IT');
  }
}

 async componentWillMount() {

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    // this.takePicture();
    // console.log(takePicture());
  }

  componentWillUnmount (){
    // this.generateBreed()
  }

choosePicture = async () => {
  this.setState({ loading: true}, () => console.log('selecting a pic'))
  let imageInfo = await ImagePicker.launchImageLibraryAsync({
       quality: 1.0,
          base64: true
    })
    this.setState({loading: false}, () => console.log('binary image'))
    if (!imageInfo.cancelled) {
      this.props.navigation.navigate('Prediction', {
        base64: imageInfo
      })

    }
  }


  // takePicture = async () => {
  //   this.setState({loading: true})
  //   const {
  //     cancelled,
  //     uri,
  //     image
  //   } = await Expo.ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     base64: true,
  //     allowsEditing: false,
  //     aspect: [4, 3],
  //   });
  //   if (cancelled) {
  //     this.setState({ loading: false });
  //   } else {
  //     const { navigate } = this.props.navigation
  //       navigate('Prediction', { image: this.ImagePicker })
  //       this.setState({ loading: false })

  //   }

  // }

// takePicture() {
//     this.setState({ loading: true })
//     Expo.ImagePicker.launchCameraAsync(this.options, response => {
//       if (response.didCancel) {
//         this.setState({ loading: false })
//       } else if (response.error) {
//         Alert.alert('Erreur', 'Vérifiez vos permissions aux albums photos et à la caméra.', { cancelable: false })
//         this.setState({ loading: false })
//       } else {
//         this.props.navigation.navigate("Prediction", { image: response })
//         this.setState({ loading: false })
//       }
//     })
//   }

  async takePicture() {

      if (this.camera) {
        console.log('camera engaged')
        this.setState({ loading: false}, () => console.log('camera working'))
        let imageInfo = await this.camera.takePictureAsync({
          quality: 1.0,
          base64: true
        })
        console.log('sending over')
        this.props.navigation.navigate('Prediction', {
          base64: imageInfo
        })
      }
    }

  // _onClick() {
  //   this.setState({ loading: true })
  //   ImagePicker.showImagePicker(this.options, response => {
  //     if (response.didCancel) {
  //       this.setState({ loading: false })
  //     } else if (response.error) {
  //       Alert.alert('Erreur', 'Vérifiez vos permissions aux albums photos et à la caméra.', { cancelable: false })
  //       this.setState({ loading: false })
  //     } else {
  //       const { navigate } = this.props.navigation
  //       navigate('Prediction', { image: response })
  //       this.setState({ loading: false })
  //     }
  //   })
  // }




render() {
    // console.log(this.state.imgUri)
    // console.log(this.state.data)
    console.log(this.state.takePicture)
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref
            }}
            style={{ flex: 1 }}
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent'
              }}>
              {this.state.loading ? (
                <View style={styles.cameraLoad}>
                  <ActivityIndicator size="large" color="#FFF" />
                </View>
              ) : (
                <View>
                  <TouchableHighlight onPress={this.choosePicture }>
                    <Text style={styles.select}>SELECT FROM GALLERY</Text>
                  </TouchableHighlight>
                </View>
              )}
              <View style={styles.snap}>
                <Button
                  onPress={this.takePicture}
                  title="TAKE PICTURE"
                  color="#d6492c"
                />
              </View>
            </View>
          </Camera>
        </View>
      )
    }
  }
}



CameraApp.propTypes = {
  navigation: PropTypes.object,
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




// generateBreed =  () => {
  //   const app = new Clarifai.App({
  // apiKey: "c362597d65354a998a07e5c6ba1da882"})

  //   // const data = this.state.imgUri;
  //   // data.append('photo', {
  //   //     uri: data,
  //   //     type: 'image/jpeg',
  //   //     name: 'testPhotoName'
  //   //   });

  //   process.nextTick = setImmediate

  //  app.models.predict(Clarifai.GENERAL_MODEL, data )
  //     .then(response => {
  //           // do something with response
  //           console.log("response from clarifai ", response);
  //           this.setState({

  //             imgUri: response,
  //             data: response,
  //             conceptsLoaded: true

  //           });
  //           // console.log(imgUri)

  //         })
  //     .catch(err => console.log(err))
  //       }



// // save to CameraRoll
    // CameraRoll.saveToCameraRoll(this.state.path);
    // // convert the image to base64 data
    // RNFetchBlob.fs
    //   .readFile(this.state.path, "base64")
    //   .then(data => {
    //     app.models
    //       .predict(Clarifai.GENERAL_MODEL, { base64: data })
    //       .then(response => {
    //         // do something with response
    //         console.log("response from clarifai ", response);
    //         this.setState({
    //           data: response,
    //           conceptsLoaded: true
    //         });
    //         this.createStringOfNames();
    //       });

    //   })
    //   .catch(error => {
    //     // error on converting image to base64 data
    //     console.log(error);
    //   });



