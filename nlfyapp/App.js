import React, { useEffect, useState } from "react";
import { Onboarding } from "./src/features/onboarding.screen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { View } from "react-native";
//import { HomeWrapper } from "./src/features/homeWrapper";

import {
  gettingData,
  storingData,
} from "./src/components/asyncstorage.component";
import { Home } from "./src/features/home.screen";
import { PrayerRequest } from "./src/features/prayerRequest.screen";
import styled from "styled-components";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeView = styled(View)`
  flex: 1;
  top: 10px;
  align-items: center;
`;
const TAB_ICON = {
  Home: "md-home",
  PrayerRequest: "pray",
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
  return {
    tabBarIcon: ({ size, color }) =>
      route.name === "Home" ? (
        <Ionicons name={iconName} size={size} color={color} />
      ) : (
        <FontAwesome5 name={iconName} size={size} color={color} />
      ),
  };
};

export const App = () => {
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

  return (
    <>
      <ThemeProvider theme={theme}>
        {hasLaunched ? (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={createScreenOptions}
              tabBarOptions={{
                activeTintColor: "tomato",
                inactiveTintColor: "gray",
              }}
            >
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
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <Onboarding />
        )}
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default App;
