import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAeraView } from 'react-native';
import Login from './components/Login'

import Camera from './components/Camera'
import Home  from './components/Home'
import Favorites from './components/Favorites'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
// import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation'


// const AppTabNavigator = createMaterialTopTabNavigator({
//   Home: {screen: Home,
//   navigationOptions:{
//     tabBarLabel: 'Home',
//     tabBarIcon: ({tintColor}) => (
//       <Icon name="ios-home-outline" color={tintColor} size={26} />
//     )
//   }
// },

//   Login: {screen: Login,
//   navigationOptions:{
//     tabBarLabel: 'Login',
//     tabBarIcon: ({tintColor}) => (
//       <Icon name="ios-settings-outline" color={tintColor} size={26} />
//     )
//   }
// },


//   Favorites: {screen: Favorites,
//   navigationOptions:{
//     tabBarLabel: 'Favorites',
//     tabBarIcon: ({tintColor}) => (
//       <Icon name="ios-heart-outline" color={tintColor} size={26} />
//     )
//   }
// },

// Camera: {screen: Camera,
//   navigationOptions:{
//     tabBarLabel: 'Take a picture',
//     tabBarIcon: ({tintColor}) => (
//       <Icon name="ios-camera-outline" color={tintColor} size={26} />
//     )
//   }
// }


// }, {
//   initialRouteName: 'Login',
//   navigationOptions: {},
//   order: ['Login', 'Home', 'Favorites', 'Camera'],
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     activeTintColor: 'black',
//     inactiveTintColor: 'grey',
//     labelStyle: {
//       fontSize: 9,
//     },
//     iconStyle:{

//     },
//     style:{
//       backgroundColor: 'white',
//       borderTopWidth: 0.5,
//       borderTopColor: 'grey'
//     },
//   indicatorStyle: {
//     height: 0
//     },
//   showIcon: true
//   }
// })




// // export default AppTabNavigator;




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })



