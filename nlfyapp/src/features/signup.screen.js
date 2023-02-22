import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";

export const SignUp = () => {
  const navigation = useNavigation();
  const navigateToSignUpSecondScreen = () => {
    console.log("Navigation to Second Screen triggered");
    navigation.navigate("SignUpSecondScreen");
  };
  return (
    <SafeAreaView>
      <View>
        <Text>SignUp</Text>
        <Button
          label="Sign Up with Mobile"
          handleClick={navigateToSignUpSecondScreen}
        />
      </View>
    </SafeAreaView>
  );
};
