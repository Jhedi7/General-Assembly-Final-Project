import React, { Component } from 'react'
import { Animated, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'



const ThingToFind = 'Pizza'

class AnswerNotification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slideAnim: new Animated.Value(-100),
    }
  }

  componentDidMount() {
    Animated.spring(
      this.state.slideAnim,
      {
        toValue: 0,
        useNativeDriver: true,
      }
    ).start()
  }

  render () {
    const isValid = this.props.answer === ThingToFind


    const notifStyles = [styles.container]

    if (isValid) {
      notifStyles.push(styles.notifValid)
    } else {
      notifStyles.push(styles.notifError)
    }

    return (
      <Animated.View
        style={[...notifStyles, {transform: [
              { translateY: this.state.slideAnim }
            ]}
        ]}
      >
        <Text style={styles.text}>
          {this.props.answer}
        </Text>
        <Image source={icon} style={styles.icon}/>
      </Animated.View>
    )
  }
}

AnswerNotification.propTypes = {
  answer: PropTypes.string
}



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  notifValid: {
    backgroundColor: 'green',
  },
  notifError: {
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  }
})

export default AnswerNotification
