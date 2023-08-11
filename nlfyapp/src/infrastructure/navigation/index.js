import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { MyStack } from "../../../StackNavigation";
import { AppNavigator } from "./app.navigator";

import { View, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const Navigation = () => {
  const { isAuthenticated, registered } = useContext(AuthenticationContext);
  console.log("isAuthenticated", isAuthenticated, registered);

  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIfFirstLaunch();
  }, []);

  const checkIfFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("firstLaunch");
      if (value === null) {
        // First launch
        await AsyncStorage.setItem("firstLaunch", "false");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error("Error checking first launch:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("First Launch value", isFirstLaunch);

  if (isLoading) {
    // Render a loading state while determining isFirstLaunch
    return (
      <NavigationContainer>
        <LoadingScreen />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      {isAuthenticated && registered ? <AppNavigator /> : <MyStack />}
    </NavigationContainer>
  );
};

const LoadingScreen = () => {
  return (
    // Render your loading screen component here
    // e.g., a spinner or a custom loading animation
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
};
