import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const MenuContainer = ({title, imageSrc, type, setType}) => {
    HandlePress = () => {
        setType(title.toLowerCase())
    }
  return (
    <TouchableOpacity className="items-center justify-center space-y-2"onPress={HandlePress}>
      <View className={`w-24 h-24 shadow-sm rounded-full items-center justify-center ${type === title.toLowerCase() ? "border-red-400":""}`}>
        <Image 
        source={imageSrc}
        className="w-full h-full object-contain"
        />
      </View>
      <Text className="text-[#00BCC9] text-xl font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}

export default MenuContainer