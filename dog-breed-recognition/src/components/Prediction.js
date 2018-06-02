import React, { Component } from 'react'
import { ActivityIndicator, View, Text, StatusBar, Alert, } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import Clarifai from 'clarifai'
import { createMaterialTopTabNavigator } from 'react-navigation'

import AnswerNotification from './AnswerNotification'
// import Camera from './components/Camera'


class Prediction extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      result: '',
    }

    this._cancel = this._cancel.bind(this)
    this.props.navigation.state.params.image = this.props.navigation.state.params.image.bind(this)
  }

  componentDidMount() {
    const app = new Clarifai.App({
    apiKey: "c362597d65354a998a07e5c6ba1da882"})

    process.nextTick = setImmediate // RN polyfill

    const { data } = this.props.navigation.state.params.image;
    const file = { base64: data }

    app.models.predict(Clarifai.GENERAL_MODEL, data )
      .then(response => {
        const { concepts } = response.outputs[0].data

        if (concepts && concepts.length > 0) {
          for (const prediction of concepts) {
            if (prediction.name === 'pizza' && prediction.value >= 0.99) {
              return this.setState({ loading: false, result: 'Pizza' })
            }
            this.setState({ result: 'Not Pizza' })
          }
        }

        this.setState({ loading: false })
      })
      .catch(e => {
        Alert.alert(
          'Une erreur est survenue',
          'Désolé, le quota est peut-être dépassé, réessaye plus tard !',
          [
            { text: 'OK', onPress: () => this._cancel() },
          ],
          { cancelable: false }
        )
      })
  }


// generateBreed =  () => {
//     const app = new Clarifai.App({
//   apiKey: "c362597d65354a998a07e5c6ba1da882"})

//     // const data = this.state.imgUri;
//     // data.append('photo', {
//     //     uri: data,
//     //     type: 'image/jpeg',
//     //     name: 'testPhotoName'
//     //   });

//     process.nextTick = setImmediate

//    app.models.predict(Clarifai.GENERAL_MODEL, data )
//       .then(response => {
//             // do something with response
//             console.log("response from clarifai ", response);
//             this.setState({

//               imgUri: response,
//               data: response,
//               conceptsLoaded: true

//             });
//             // console.log(imgUri)

//           })
//       .catch(err => console.log(err))
//         }




  _cancel() {
    const backAction = NavigationActions.back()
    this.props.navigation.dispatch(backAction)
  }

  render() {
    const {type, data } = this.props.navigation.state.params.image
    const sourceImage = `data:${type};base64,${data}`

    return (
      <BackgroundImage source={{uri: sourceImage}} resizeMode='cover'>
        <StatusBar hidden />
        {
          this.state.loading ?
            <View style={styles.loader}>
              <ActivityIndicator size={75} color='#95a5a6' />
              <Text style={styles.loaderText}>Analyse en cours...</Text>
            </View> :
            <View style={styles.container}>
              <AnswerNotification answer={this.state.result} />
              <CaptureAndShare
                title='Partager'
                color='#3498db'
                image={sourceImage}
                onCancel={this._cancel}
              />
              <XPButton
                title='Non merci'
                color='black'
                textOnly
                onPress={this._cancel}
              />
            </View>
        }
      </BackgroundImage>
    )
  }
}

Prediction.propTypes = {
  navigation: PropTypes.object
}

export default Prediction

