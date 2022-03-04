import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import useCachedResources from './hooks/useCachedResources'
import Main from './screens/Main'
import fetchData from './api'

const fetchFonts = () => {
  return Font.loadAsync({
    Acme: require('./assets/fonts/acme-400.ttf'),
    Poppins: require('./assets/fonts/poppins-400.ttf')
  })
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const isLoadingComplete = useCachedResources()
  const [data, setData] = useState([])

  const _preloadAsync = async () => {
    const fonts = fetchFonts()
    const data = await fetchData()
    setData(data)
    await Promise.all([fonts, data])
  }

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={_preloadAsync}
        onError={() => console.log('ERROR')}
        onFinish={() => {
          setIsLoaded(true)
        }}
      />
    )
  }

  if (!isLoadingComplete) {
    return null
  } else {
    return <Main data={data} addData={setData} />
  }
}
