import React, { useEffect, useState } from "react";
import { Onboarding } from "./src/features/onboarding.screen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { useFonts, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { View } from "react-native";
import {
  gettingData,
  storingData,
} from "./src/components/asyncstorage.component";
import { Home } from "./src/features/home.screen";
import styled from "styled-components";

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

  const HomeView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  `;

  return (
    <>
      <ThemeProvider theme={theme}>
        {hasLaunched ? (
          <HomeView>
            <Home />
          </HomeView>
        ) : (
          <Onboarding />
        )}
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default App;
