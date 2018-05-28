import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Spinner from './Spinner';
import * as firebase from 'firebase';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,

  }


  onSubmit = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
      })

  }

  onLoginSuccess(){
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFail(){
    this.setState({
      error: 'Authentication Failed.',
      loading: false
    });
  }

  renderButton() {

    if (this.state.loading){
      return <Spinner />
    }
    else {
      return (
        <TouchableOpacity onPress={this.onSubmit.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Log in </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Breed easy </Text>

        <TextInput
          style={styles.input}
          placeholder= 'Email'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          style={styles.input}
          placeholder= 'Password'
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          secureTextEntry={ true }
        />


          {this.renderButton()}




      </View>


    );
  }
}



const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    margin: 10,
    paddingHorizontal: 8,
    height: 50
  },
  button: {
    borderColor: 'grey',
    backgroundColor: '#666',
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonText: {
    color: 'white'
  },
  container: {
    backgroundColor: 'white',
    width: 420,
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
    margin: 40
  }

})
