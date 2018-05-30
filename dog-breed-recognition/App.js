import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Navigator from './src/AppTabNavigator';
import * as firebase from 'firebase';
import ImagePicker from 'react-native-image-picker'




export default class App extends React.Component {
state = {

    loggedIn: null
  }

  componentDidMount () {

    firebase.initializeApp ({
    apiKey: "AIzaSyD_rLUfWQQ9leNSsBx4O5vQZpafFKG7enY",
    authDomain: "dog-breed-8db94.firebaseapp.com",
    databaseURL: "https://dog-breed-8db94.firebaseio.com",
    projectId: "dog-breed-8db94",
    storageBucket: "dog-breed-8db94.appspot.com",
    messagingSenderId: "839736665271"
  });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState ({ loggedIn: false });
      }
    })

  }


  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return  (
          <View>
            <TouchableOpacity onPress={() => firebase.auth().signOut()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}> Log Out </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case false:
        return <Login />;
      default:
        return <Spinner />;
    }
  }
  render() {
      return (
          <Navigator />
      );
    }
  }

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    marginTop: 100,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
