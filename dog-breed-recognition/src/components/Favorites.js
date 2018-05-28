import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Favorites extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AT Favorites!!</Text>
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
