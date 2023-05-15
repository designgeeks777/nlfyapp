import React from "react";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import { PrayerRequest } from "./src/features/prayerRequest.screen";
import { ChurchPrayers } from "./src/features/component/prayerRequest/churchPrayersComponent";
import { MyPrayersScreen } from "./src/features/component/prayerRequest/myPrayersComponent";
import { PrayerResponse } from "./src/features/component/prayerRequest/prayerResponse.component";

const Stack = createStackNavigator();

export const PrayerRequestNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [500, 0],
                }),
              },
            ],
          },
        }),
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}
    >
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
      <Stack.Screen
        name="PrayerResponse"
        component={PrayerResponse}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
