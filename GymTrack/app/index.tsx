import "./global.css"
import { FlatList, Pressable, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native";
import { images } from "@/constants";
import { Fragment } from "react";
 
export default function App() {
  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center bg-white">
        <Image source={images.logo} className="w-52 h-52 mb-4" />
        <Text className="text-2xl font-bold mb-2">GymTrack</Text>
        <Text className="text-center text-gray-600 mb-8 px-4">
          Tu compañero ideal para llevar un registro de tus entrenamientos y progresos en el gimnasio.
        </Text>
        <Pressable className="bg-blue-500 px-6 py-3 rounded-full">
          <Text className="text-white text-lg font-semibold">Comenzar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}