import React, { useState, useMemo, useRef, createRef } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Pressable
} from 'react-native'
import DoggoCard from 'react-tinder-card'
import styled from 'styled-components' // https://docs.expo.dev/guides/using-styled-components/#considerations
import { LinearGradient } from 'expo-linear-gradient'
import { Shadow } from 'react-native-shadow-2'
import Lottie from '../components/Lottie'
import ButtonMain from '../components/ButtonMain'
import ReturnSvg from '../components/svg/ReturnSvg'
import Header from '../components/Header'
import fetchData from '../api'

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Card = styled.View`
  position: absolute;
  width: 100%;
  height: 320px;
  border-radius: 20px;
  resize-mode: cover;
  z-index: 100;
`

const CardImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
`

const InfoText = styled.Text`
  justify-content: center;
  display: flex;
  z-index: 100;
  margin-top: 30px;
  font-family: Poppins;
  font-size: 20px;
  color: white;
  height: 30px;
`

const Text = styled.Text`
  justify-content: center;
  font-family: Poppins;
  font-size: 20px;
  color: #ffc1c4;
`

const Buttons = styled.View`
  margin: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-top: 50px;
`

export default function Main({ data, addData }) {
  const [lastDirection, setLastDirection] = useState()
  const [currentIndex, setCurrentIndex] = useState(data.length - 1)
  const currentIndexRef = useRef(currentIndex)
  const [textHidden, setTextHidden] = useState(false)
  const timeout = useRef()
  const heartRef = useRef()
  const didMountRef = useRef(false)

  const childRefs = useMemo(() => {
    return Array(data.length)
      .fill(0)
      .map(() => createRef())
  }, [data])

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < data.length - 1

  const canSwipe = currentIndex >= 0

  const fetchMore = async () => {
    if (!canSwipe) {
      const newData = await fetchData()
      await addData(newData)
      updateCurrentIndex(newData.length - 1)
    } else {
      didMountRef.current = true
    }
  }

  const swiped = (direction, nameToDelete, idx) => {
    setLastDirection(direction)
    updateCurrentIndex(idx - 1)
    heartRef.current.resetAnimation()

    setTextHidden(true)
    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = null
    }
    timeout.current = setTimeout(() => {
      setTextHidden(false)
    }, 1000)
  }

  const swipe = async (dir) => {
    if (canSwipe) {
      // heartRef.current.resetAnimation()
      await childRefs[currentIndex].current.swipe(dir)
    }
  }

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <Container>
      <LinearGradient style={styles.bg} colors={['#AA076B', '#61045F']}>
        <SafeAreaView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Header />
          <View
            style={{
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Shadow
              distance={30}
              viewStyle={{
                borderRadius: 20,
                width: Dimensions.get('window').width,
                maxWidth: 290,
                height: 320
              }}
            >
              {canSwipe ? (
                data.map((doggo, idx) => (
                  <DoggoCard
                    ref={childRefs[idx]}
                    key={idx}
                    onSwipe={(dir) => swiped(dir, doggo, idx)}
                    preventSwipe={['up', 'down']}
                  >
                    <Card>
                      <CardImage source={{ uri: doggo }} />
                    </Card>
                  </DoggoCard>
                ))
              ) : (
                <Card
                  style={{
                    backgroundColor: '#61045F',
                    zIndex: -999,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <ButtonMain
                    text="more doggos pls"
                    onButtonPress={fetchMore}
                    // TODO: fix blank white bg before first card shows up
                  />
                </Card>
              )}
            </Shadow>

            <Buttons style={styles.btnContainer}>
              <Shadow distance={30} radius={50} paintInside>
                <Pressable onPress={() => goBack()} hitSlop={20}>
                  <ReturnSvg
                    width={45}
                    height={45}
                    fill={!canGoBack ? 'rgba(195, 196, 211, .6)' : '#ff99ff'}
                  />
                </Pressable>
              </Shadow>
              <Shadow distance={30} radius={50} paintInside>
                <Lottie
                  onAnimationStart={() => swipe('right')}
                  canSwipe={canSwipe}
                  ref={heartRef}
                  styles={{
                    width: 100,
                    height: 100,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: -25
                  }}
                  fileName="lottie_heart"
                />
              </Shadow>
            </Buttons>
            {lastDirection && textHidden ? (
              <InfoText>
                {lastDirection === 'right' ? 'Of course,' : 'No,'} it's a good
                doggo
              </InfoText>
            ) : (
              <InfoText />
            )}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Container>
  )
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%'
  },
  btnContainer: {
    width: 150
  }
})
