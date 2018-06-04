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
import { ImagePicker, Camera, Permissions } from 'expo';
// import RNFetchBlob from "react-native-fetch-blob";
import Clarifai from "clarifai";

//  this.app = new Clarifai.App({
//   apiKey: "c362597d65354a998a07e5c6ba1da882"
// });

export default class CameraApp extends React.Component {


  constructor(){
    super();
    this.state = {
      imageInfo: null,
      loading: false
  }
  // this.generateBreed = this.generateBreed.bind(this);
  this.takePicture = this.takePicture.bind(this);

  this.options = {


      base64: true


    }

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
    // this.takePicture();
    // console.log(takePicture());
  }

  componentWillUnmount (){
    // this.generateBreed()
  }

choosePicture = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });
    if (!cancelled) {
      this.setState({ loading: false, imageInfo: uri });
      console.log(uri) // this logs correctly

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

  takePicture() {
    this.setState({ loading: true })
    Expo.ImagePicker.launchCameraAsync( {}, response => {
      if (response.didCancel) {
        this.setState({ loading: false, imageInfo: uri })
        this.setState({ loading: false })
      } else if (response.error) {
        Alert.alert('Erreur', 'Vérifiez vos permissions aux albums photos et à la caméra.', { cancelable: false })
        this.setState({ loading: false })
      } else {
        const { navigate } = this.props.navigation
        navigate('Prediction', { image: response })

        this.setState({ loading: false, imageInfo: uri })
      }
    })
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



  savePicture = async () => {
    const uri = await Expo.takeSnapshotAsync(this.imageView, {
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });
    await CameraRoll.saveToCameraRoll(uri);

  }
render() {
    // console.log(this.state.imgUri)
    // console.log(this.state.data)
    console.log(this.state.takePicture)

    return (
      <View style={styles.container}>


        // The image to display (null by default)
        <Image ref={(ref) => this.imageView = ref}
          style={{ width: 400, height: 400, backgroundColor: '#dddddd' }}
          source={{ uri: this.state.imageInfo }}
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
            onPress={this.generateBreed}
            >
            <Text style={styles.buttonText}>LOOK UP SOME DOGS!</Text>
          </TouchableOpacity>

      </View>
    );
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



