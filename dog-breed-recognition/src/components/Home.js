import React from 'react';
import { Alert, View, StatusBar, ActivityIndicator, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker'

 export default class Home extends React.Component {

  render() {
    return (
      <View>
        <Text>AT THE HOME PAGE!!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    justifyContent: 'center'
  }
})






