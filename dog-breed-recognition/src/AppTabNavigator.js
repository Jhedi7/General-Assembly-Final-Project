import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAeraView } from 'react-native';
import { colors } from './themes';
import Login from './components/Login'
import Home from './components/Home'
import Favorites from './components/Favorites'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation'


const Navigator = createBottomTabNavigator({
  Home: {screen: Home,
  navigationOptions:{
    tabBarLabel: 'Home',
    tabBarIcon: () => (
      <Icon name="ios-home" size={24} />
    )
  }
},

  Login: {screen: Login,
  navigationOptions:{
    tabBarLabel: 'Login',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-settings" size={24} />
    )
  }
},


  Favorites: {screen: Favorites,
  navigationOptions:{
    tabBarLabel: 'Favorites',
    tabBarIcon: () => (
      <Icon name="ios-home" size={24} />
    )
  }
}

}, {
  initialRouteName: 'Home',
  navigationOptions: {
  tabBarVisible: true
  }
})




export default Navigator;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})



