import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Camera extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Take a Picture!</Text>
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
