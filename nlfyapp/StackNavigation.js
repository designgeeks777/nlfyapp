import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home } from "./src/features/home.screen";
import { Login } from "./src/features/login.screen";
import { LoginSecondScreen } from "./src/features/loginSecondScreen.screen";
import { Onboarding } from "./src/features/onboarding.screen";
import { SignUp } from "./src/features/signup.screen";
import { Stepper } from "./src/features/signupSecondScreen.screen";
import { UploadPicSignUp } from "./src/features/uploadPicSignUp.screen";

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
      <Stack.Screen
        name="Stepper"
        component={Stepper}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadPicSignUp"
        component={UploadPicSignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginSecondScreen"
        component={LoginSecondScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
