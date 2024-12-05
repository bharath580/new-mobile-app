import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator,Colors } from 'react-native-paper'

const Loader = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator animating={true} theme={{ colors: { primary: 'green' } }} size="large" />
    </View>
  )
}

export default Loader