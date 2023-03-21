import React, { useEffect, useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import { View } from "react-native";
import styled from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  gettingData,
  storingData,
} from "../../components/asyncstorage.component";
import { theme } from "../theme";
import { Home } from "../../features/home.screen";
import { PrayerRequest } from "../../features/prayerRequest.screen";
import { Give } from "../../features/give.screen";
import { Sermons } from "../../features/sermons.screen";
import { LifeGroups } from "../../features/lifeGroups.screen";
import { Events } from "../../features/events.screen";
import { Stories } from "../../features/stories.screen";
import { Onboarding } from "../../features/onboarding.screen";

const HomeView = styled(View)`
  flex: 1;
  top: 10px;
  align-items: center;
`;
const TAB_ICON = {
  Home: "md-home",
  "Prayer Request": "pray",
  Give: "donate",
  Sermons: "bible",
  "Life Groups": "people-arrows",
};

function HomeWrapper() {
  return (
    <HomeView>
      <Home />
    </HomeView>
  );
}

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

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();
  const [hasLaunched, setHasLaunched] = useState(false);
  const [latoLoaded] = useFonts({ Lato_400Regular });
  const HAS_LAUNCHED = "HAS_LAUNCHED";

  useEffect(() => {
    const getData = async () => {
      const storedData = await gettingData(HAS_LAUNCHED);
      if (storedData) {
        setHasLaunched(true);
      } else {
        await storingData(HAS_LAUNCHED, "true");
      }
    };

    getData().catch((error) => {
      console.log(error);
    });
  }, []);

  if (!latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {hasLaunched && (
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
        )}
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};
