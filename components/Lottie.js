import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { StyleSheet, View, Button, Pressable } from 'react-native'

import LottieView from 'lottie-react-native'

const Lottie = forwardRef((props, ref) => {
  const { canSwipe, onAnimationStart, fileName, styles } = props
  const animation = useRef(null)
  const files = {
    lottie_heart: require('../assets/lottie_heart.json'),
    lottie_button: require('../assets/lottie_button.json')
  }

  useImperativeHandle(ref, () => ({
    resetAnimation: () => {
      if (canSwipe) {
        animation.current.reset()
        animation.current.play()
      }
    }
  }))
  // const resetAnimation = () => {
  //   if (canSwipe) {
  //     console.log('in heart reseting 22')
  //     animation.current.reset()
  //     animation.current.play()
  //   }
  // }

  return (
    <View style={styles.animationContainer}>
      <Pressable
        onPress={() => {
          // resetAnimation()
          onAnimationStart()
        }}
        hitSlop={20}
      >
        <LottieView
          ref={animation}
          loop={false}
          style={styles}
          source={files[fileName]}
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
      </Pressable>
    </View>
  )
})

const styles = StyleSheet.create({
  animationContainer: {
    // backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
    // flex: 1
  },
  buttonContainer: {
    // paddingTop: 20
  }
})
export default Lottie

// <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
//   <Path
//     fill={props.fill}
//     d="M474.655 74.503C449.169 45.72 413.943 29.87 375.467 29.87c-30.225 0-58.5 12.299-81.767 35.566-15.522 15.523-28.33 35.26-37.699 57.931-9.371-22.671-22.177-42.407-37.699-57.931-23.267-23.267-51.542-35.566-81.767-35.566-38.477 0-73.702 15.851-99.188 44.634C13.612 101.305 0 137.911 0 174.936c0 44.458 13.452 88.335 39.981 130.418 21.009 33.324 50.227 65.585 86.845 95.889 62.046 51.348 123.114 78.995 125.683 80.146a8.592 8.592 0 006.981 0c2.57-1.151 63.637-28.798 125.683-80.146 36.618-30.304 65.836-62.565 86.845-95.889C498.548 263.271 512 219.394 512 174.936c0-37.025-13.612-73.631-37.345-100.433z"
//   />
//   <Path
//     fill={props.fill}
//     d="M160.959 401.243c-36.618-30.304-65.836-62.565-86.845-95.889-26.529-42.083-39.981-85.961-39.981-130.418 0-37.025 13.612-73.631 37.345-100.433 21.44-24.213 49.775-39.271 81.138-43.443a109.262 109.262 0 00-16.082-1.189c-38.477 0-73.702 15.851-99.188 44.634C13.612 101.305 0 137.911 0 174.936c0 44.458 13.452 88.335 39.981 130.418 21.009 33.324 50.227 65.585 86.845 95.889 62.046 51.348 123.114 78.995 125.683 80.146a8.592 8.592 0 006.981 0c.689-.308 5.586-2.524 13.577-6.588-21.813-11.092-66.696-35.976-112.108-73.558z"
//   />
// </Svg>
