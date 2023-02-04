/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Pressable,
} from "react-native";
import Swiper from "react-native-swiper";
import { Onboarding } from "./src/features/onboarding.screen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";

const App = () => {
  const [latoLoaded] = useFonts({
    Lato_400Regular,
  });

  if (!latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Onboarding />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default App;
