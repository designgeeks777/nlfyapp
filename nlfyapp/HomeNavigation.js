import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/features/home.screen";
import { Login } from "./src/features/login.screen";
import { LoginSecondScreen } from "./src/features/loginSecondScreen.screen";
import { SignUp } from "./src/features/signup.screen";
import { Stepper } from "./src/features/signupSecondScreen.screen";
import { UploadPicSignUp } from "./src/features/uploadPicSignUp.screen";
import { HasLaunchedOnboarding } from "./src/features/hasLaunchedOnboarding.screen";
const Stack = createStackNavigator();

export const HomeStackNavigation = () => {
  return (
    <Stack.Navigator id="HomeStackModal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="OnboardingStack" component={HasLaunchedOnboarding} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Stepper" component={Stepper} />
      <Stack.Screen name="UploadPicSignUp" component={UploadPicSignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginSecondScreen" component={LoginSecondScreen} />
    </Stack.Navigator>
  );
};
