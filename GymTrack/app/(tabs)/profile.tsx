import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const profile = () => {
  return (
    <TouchableOpacity>
    //TODO: Cambiar imagen por la del usuario
      <Image source={images.logo} className="size-3 rounded-full" resizeMode="contain"></Image>
    </TouchableOpacity>  
  )
}

export default profile