import React from "react";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CommunityPrayers } from "./component/prayerRequest/communityPrayersComponent";
import { ChurchPrayers } from "./component/prayerRequest/churchPrayersComponent";
import { NavigationContainer } from "@react-navigation/native";
import { TabButton } from "../components/tabButton";
import { TabButtonUnselected } from "../components/TabButtonUnselected";
import { MyPrayersScreen } from "./component/prayerRequest/myPrayersComponent";

import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  margin-left: 10px;
  padding-top: 51px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  margin-top: -15px;
  z-index: 2;
`;

const ButtonsWrapper = styled(View)`
  flex-direction: row;
`;

export const PrayerRequest = ({ route }) => {
  const navigation = useNavigation();
  const navigateToChurchPrayers = () => {
    navigation.navigate("ChurchPrayers");
  };
  const navigateToMyPrayers = () => {
    navigation.navigate("MyPrayers");
  };
  return (
    <>
      <WrapperView>
        <BackButton text="Prayer Requests" />
      </WrapperView>
      <SafeAreaViewWrapper>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <ButtonsWrapper>
            <TabButtonUnselected
              label="Church"
              handleClick={navigateToChurchPrayers}
            />
            <TabButton label="Community" />
            <TabButtonUnselected
              label="My Prayers"
              handleClick={navigateToMyPrayers}
            />
          </ButtonsWrapper>

          <View style={{ flex: 1 }}>
            <CommunityPrayers />
          </View>
        </View>
      </SafeAreaViewWrapper>
    </>
  );
};
