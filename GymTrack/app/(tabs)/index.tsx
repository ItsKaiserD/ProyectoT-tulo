import "./global.css"
import { FlatList, Pressable, Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { images } from "@/constants";
import { Fragment } from "react";
import { maquinas } from "@/constants";

 
export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={maquinas}
        renderItem={({ item,index }) => {

          return(
            <View>
              <Pressable className="bg-gray-200 offer-card flex-row-reverse" android_ripple={{ color: '#fffff22'}}>
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <Image source={item.image} className="size-full" resizeMode="contain"></Image>
                    </View>

                    <View className="offer-card__info pl-10">
                      <Text className="h1-bold leading-tight">{item.title}</Text>
                    </View>
                  </Fragment>
              )}
              </Pressable>
            </View>
          )  }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5 px-5">
            <View className="flex-start">
              <Text className="small-bold text-blue">GymTrack</Text>
                <Image source={images.logo} className="size-3" resizeMode="contain"></Image>
            </View>
          </View> )}
      />
    </SafeAreaView>
  );
}