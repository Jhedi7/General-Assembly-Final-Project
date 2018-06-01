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

   } from 'react-native'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker'

// import RNFetchBlob from "react-native-fetch-blob";
import Clarifai from "clarifai";



export default class Camera extends React.Component {
    static navigationOptions = {
        header: <Header title='seepizz' subtitle='"The Shazam for Pizza"' />,
      }

      constructor() {
        super()

        this.state = {
          loading: false,
        }

        this._onClick = this._onClick.bind(this)

        this.options = {
          title: 'Sélectionner une image',
          takePhotoButtonTitle: 'Prendre une photo',
          chooseFromLibraryButtonTitle: 'Choisir depuis la galerie',
          cancelButtonTitle: 'Annuler',
          cameraType: 'back',
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
            path: 'Seepizz'
          }
        }
      }

      _onClick() {
        this.setState({ loading: true })
        ImagePicker.showImagePicker(this.options, response => {
          if (response.didCancel) {
            this.setState({ loading: false })
          } else if (response.error) {
            Alert.alert('Erreur', 'Vérifiez vos permissions aux albums photos et à la caméra.', { cancelable: false })
            this.setState({ loading: false })
          } else {
            const { navigate } = this.props.navigation
            navigate('Prediction', { image: response })
            this.setState({ loading: false })
          }
        })
      }

      render() {
        return (
          <View style={styles.container}>
              <StatusBar hidden />

                {
                  !this.state.loading ?
                      <XPButton
                        title='Analyser une image'
                        onPress={this._onClick}
                      />
                  : <ActivityIndicator size="large" color="#e74c3c" />
                }

          </View>
        )
      }
    }

    HomeScreen.propTypes = {
      navigation: PropTypes.object
    }

    export default Camera

//   constructor(props) {
//   super(props)
//   this.state = {

//     loading: false // initializing loading state
//   }
//   this.onClick = this.onClick.bind(this)
//   // this.imagePicker = this.imagePicker.bind(this)


//   this.options = {
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
//   this.setState({loading: true}) // set loading state to true

//   // It will display picker passing my defined options
//   ImagePicker.showImagePicker(this.options, response => {
//     if (response.didCancel) {
//       // If user cancel the picker
//       this.setState({loading: false})
//     } else if (response.error) {
//       // If an error occurred during picking/taking a picture, display a native Alert that the user cannot cancel
//       Alert.alert('Erreur', 'Vérifiez vos permissions aux albums photos et à la caméra.', {cancelable: false})
//       this.setState({loading: false})
//     } else {
//       // Everything is fine, go to predict screen passing response (the picture however user has selected it)
//       const { navigate } = this.props.navigation
//       navigate('Prediction', { image: response })
//       this.setState({loading: false})
//     }

//   })
// }




// render() {
//     return (
//       <View style={styles.container}>
//           <StatusBar hidden />

//             {
//               !this.state.loading ?
//                   <Button
//                     title='Analyser une image'
//                     onPress={this.onClick}
//                   />
//               : <ActivityIndicator size="large" color="#e74c3c" />

//             }

//       </View>
//     )
//   }
// }



// Camera.propTypes = {
//   navigation: PropTypes.object,
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 350,
//     width: 350
//   },
//   Button:{
//     borderColor: 'grey',
//     backgroundColor: '#666',
//     height: 50,
//     margin: 10,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })









