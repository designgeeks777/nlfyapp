import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PrayerRequest } from "./src/features/prayerRequest.screen";
import { ChurchPrayers } from "./src/features/component/prayerRequest/churchPrayersComponent";
import { MyPrayersScreen } from "./src/features/component/prayerRequest/myPrayersComponent";

const Stack = createStackNavigator();

export const PrayerRequestNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PrayerRequest"
        component={PrayerRequest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChurchPrayers"
        component={ChurchPrayers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyPrayers"
        component={MyPrayersScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
