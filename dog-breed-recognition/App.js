
// import Navigator from './src/AppTabNavigator';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, } from 'react-native';
import * as firebase from 'firebase';
import Login from './src/components/Login'
import Camera from './src/components/Camera'
import Home from './src/components/Home'
import Favorites from './src/components/Favorites'
import Prediction from './src/components/Prediction'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation'

  const config = {
    apiKey: "AIzaSyD_rLUfWQQ9leNSsBx4O5vQZpafFKG7enY",
    authDomain: "dog-breed-8db94.firebaseapp.com",
    databaseURL: "https://dog-breed-8db94.firebaseio.com",
    projectId: "dog-breed-8db94",
    storageBucket: "dog-breed-8db94.appspot.com",
    messagingSenderId: "839736665271"
  }

  firebase.initializeApp(config);

  const Navigator = createMaterialTopTabNavigator({
  Home: {screen: Home,
  navigationOptions:{
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-home-outline" color={tintColor} size={26} />
    )
  }
},

  Login: {screen: Login,
  navigationOptions:{
    tabBarLabel: 'Login',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-settings-outline" color={tintColor} size={26} />
    )
  }
},


  Favorites: {screen: Favorites,
  navigationOptions:{
    tabBarLabel: 'Favorites',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-heart-outline" color={tintColor} size={26} />
    )
  }
},

Prediction: {screen: Prediction,
  navigationOptions:{
    tabBarLabel: 'Favorites',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-heart-outline" color={tintColor} size={26} />
    )
  }
},

Camera: {screen: Camera,
  navigationOptions:{
    tabBarLabel: 'Take a picture',
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-camera-outline" color={tintColor} size={26} />
    )
  }
}


}, {
  initialRouteName: 'Camera',
  navigationOptions: {},
  order: ['Login', 'Home', 'Favorites', 'Camera', 'Prediction'],
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'grey',
    labelStyle: {
      fontSize: 9,
    },
    iconStyle:{

    },
    style:{
      backgroundColor: 'white',
      borderTopWidth: 0.5,
      borderTopColor: 'grey'
    },
  indicatorStyle: {
    height: 0
    },
  showIcon: true
  }
})




export default Navigator;




  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ loggedIn: true });
  //     } else {
  //       this.setState ({ loggedIn: false });
  //     }
  //   })

  // }
// }

//   renderContent() {
//     switch (this.state.loggedIn) {
//       case true:
//         return  (
//           <View>
//             <TouchableOpacity onPress={() => firebase.auth().signOut()}>
//               <View style={styles.button}>
//                 <Text style={styles.buttonText}> Log Out </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         );
//       case false:
//         return <Login />;
//       default:
//         return <Spinner />;
//     }
//   }




//   render() {
//       return (
//           <Navigator />
//       );
//     }
// }
















// const styles = StyleSheet.create({

//   container: {
//     backgroundColor: 'white',
//     marginTop: 100,
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
