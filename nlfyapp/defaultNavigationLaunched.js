import React, { useEffect, useState, useContext } from "react";

import { Give } from "./src/features/give.screen";
import { LifeGroups } from "./src/features/lifeGroups.screen";
import { Announcements } from "./src/features/announcements.screen";
import { AuthenticationContext } from "./src/services/authentication/authentication.context";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Sermons } from "./src/features/sermons.screen";
import { Events } from "./src/features/events.screen";
import { Stories } from "./src/features/stories.screen";

import { Devotionals } from "./src/features/devotionals.screen";

import { HomeStackNavigation } from "./HomeNavigation";

import { PrayerRequestNavigation } from "./PrayerRequestNavigation";

import { MyPrayersScreen } from "./src/features/component/prayerRequest/myPrayersComponent";

const TAB_ICON = {
  Home: "md-home",
  "Prayer Request": "pray",
  Give: "donate",
  Sermons: "bible",
  "Life Groups": "people-arrows",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  if (iconName === "md-home") {
    return {
      tabBarIcon: ({ size, color }) => (
        <Ionicons name={iconName} size={size} color={color} />
      ),
      tabBarActiveTintColor: "#D03925",
      tabBarInactiveTintColor: "#767676",
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
      tabBarActiveTintColor: "#D03925",
      tabBarInactiveTintColor: "#767676",
      tabBarStyle: {
        display: "flex",
      },
    };
  }
};

export const DeafultNavigationLaunched = () => {
  const Tab = createBottomTabNavigator();
  const { user } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={createScreenOptions} id="MainBottomTab">
        <Tab.Screen
          name="Home"
          component={HomeStackNavigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Prayer Request"
          component={PrayerRequestNavigation}
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
        {user ? (
          <Tab.Screen
            name="Life Groups"
            component={LifeGroups}
            options={{ headerShown: false }}
          />
        ) : null}

        <Tab.Screen
          name="Announcements"
          component={Announcements}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MyPrayers"
          component={MyPrayersScreen}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            headerShown: false,
          }}
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
        <Tab.Screen
          name="Devotionals"
          component={Devotionals}
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
