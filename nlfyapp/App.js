import React, { useEffect, useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { View } from "react-native";
import { Give } from "./src/features/give.screen";
import { LifeGroups } from "./src/features/lifeGroups.screen";

import {
  gettingData,
  storingData,
} from "./src/components/asyncstorage.component";
import { Home } from "./src/features/home.screen";

import styled from "styled-components";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Sermons } from "./src/features/sermons.screen";
import { Events } from "./src/features/events.screen";
import { Stories } from "./src/features/stories.screen";
import { Navigation } from "./src/infrastructure/navigation";
import { Devotionals } from "./src/features/devotionals.screen";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { HomeStackNavigation } from "./HomeNavigation";

import { PrayerRequestNavigation } from "./PrayerRequestNavigation";

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

const App = () => {
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

  const Tab = createBottomTabNavigator();
  console.log("hasLaunched", hasLaunched);
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          {hasLaunched ? (
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={createScreenOptions}
                id="MainBottomTab"
              >
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
          ) : (
            <Navigation />
          )}
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default App;
