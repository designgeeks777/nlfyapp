import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Onboarding } from "./src/features/onboarding.screen";
import { SignUp } from "./src/features/signup.screen";
import { Home } from "./src/features/home.screen";
import {
  SignUpSecondScreen,
  Stepper,
} from "./src/features/signupSecondScreen.screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

import { PrayerRequest } from "./src/features/prayerRequest.screen";
import { Events } from "./src/features/events.screen";
import { Give } from "./src/features/give.screen";
import { Stories } from "./src/features/stories.screen";
import { Sermons } from "./src/features/sermons.screen";
import { LifeGroups } from "./src/features/lifeGroups.screen";

import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

import styled from "styled-components";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();

const Slide4 = styled(View)`
  flex: 1;
  top: -20px;
  justify-content: center;
  align-items: center;
`;

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  if (iconName === "md-home") {
    return {
      tabBarIcon: ({ size, color }) => (
        <Ionicons name={iconName} size={size} color={color} />
      ),
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        display: "flex",
      },
    };
  } else if (
    iconName === "pray" ||
    iconName === "people-arrows" ||
    iconName === "donate" ||
    iconName === "bible"
  ) {
    return {
      tabBarIcon: ({ size, color }) => (
        <FontAwesome5 name={iconName} size={size} color={color} />
      ),
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        display: "flex",
      },
    };
  }
};

const TAB_ICON = {
  Home: "md-home",
  "Prayer Request": "pray",
  Give: "donate",
  Sermons: "bible",
  "Life Groups": "people-arrows",
};

const Tab = createBottomTabNavigator();
export function HomeWrapper() {
  return (
    <>
      <Slide4>
        <SafeAreaView>
          <Home />
        </SafeAreaView>
      </Slide4>

      <ExpoStatusBar style="auto" />
    </>
  );
}

const TabNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={createScreenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeWrapper}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Prayer Request"
          component={PrayerRequest}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Give"
          component={Give}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Sermons"
          component={Sermons}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Life Groups"
          component={LifeGroups}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Stories"
          component={Stories}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

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
        name="Home"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
