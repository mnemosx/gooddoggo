import React from 'react'
import { StyleSheet, Animated, Text, Pressable } from 'react-native'

const ButtonMain = ({ text, onButtonPress }) => {
  const animation = new Animated.Value(0)
  const inputRange = [0, 1]
  const outputRange = [1, 0.8]
  const scale = animation.interpolate({ inputRange, outputRange })

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true
    }).start()
  }
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true
    }).start()
  }

  return (
    <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
      <Pressable
        style={styles.btn}
        activeOpacity={1}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onButtonPress}
      >
        <Text style={styles.btnText}>{text}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 60, // TODO: should use paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#ffc1c4',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 50
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#ffc1c4',
    fontSize: 20,
    fontFamily: 'Poppins'
  }
})

export default ButtonMain
