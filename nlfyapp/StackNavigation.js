import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Onboarding } from "./src/features/onboarding.screen";
import { SignUp } from "./src/features/signup.screen";

const Stack = createStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};