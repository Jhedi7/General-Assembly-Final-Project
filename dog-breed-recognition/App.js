import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { colors } from './src/themes';
import Login from './src/components/Login'
import Home from './src/components/Home'
import Spinner  from './src/components/Spinner'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: null};
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


          <Home />
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
      <View style={styles.container}>


         {this.renderContent()}


      </View>
    );
  }
}






const styles = StyleSheet.create({
  button:{
    backgroundColor: 'white',
    height: 50,
    margin: 10,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
