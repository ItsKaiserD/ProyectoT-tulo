import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";


import "./global.css";


export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter_28pt-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_28pt-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter_28pt-Regular.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_28pt-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync(); });
  return <Stack screenOptions={{ headerShown: false }} />;
}
