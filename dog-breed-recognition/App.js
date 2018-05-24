import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login'
import Home from './src/components/Home'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <Login />
        <Home />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
