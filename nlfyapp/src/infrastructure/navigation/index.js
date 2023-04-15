import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { MyStack } from "../../../StackNavigation";
import { AppNavigator } from "./app.navigator";

export const Navigation = () => {
  const { isAuthenticated, registered } = useContext(AuthenticationContext);
  console.log("isAuthenticated", isAuthenticated, registered);

  return (
    <NavigationContainer>
      {isAuthenticated && registered ? <AppNavigator /> : <MyStack />}
    </NavigationContainer>
  );
};
