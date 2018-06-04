import React from 'react';
import { Alert, View, StatusBar, ActivityIndicator,StyleSheet, Text, Button} from 'react-native'
import PropTypes from 'prop-types'
import ImagePicker from 'react-native-image-picker'

export default class Home extends React.Component {
  render() {
    return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Camera"
          onPress={() => this.props.navigation.navigate('Camera')}
        />
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




