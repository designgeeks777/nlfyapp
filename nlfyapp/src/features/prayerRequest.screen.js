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

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  margin-left: 10px;
  padding-top: 51px;
`;

const CommunityPrayerWrapper = styled(View)`
  top: 60px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  margin-top: -15px;
  z-index: 2;
`;

const MyPrayersScreen = () => {
  return (
    <View>
      <Text>My Prayers</Text>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const ButtonsWrapper = styled(View)`
  flex-direction: row;
`;

export const PrayerRequest = ({ route }) => {
  return (
    <>
      <WrapperView>
        <BackButton text="Prayer Requests" />
      </WrapperView>
      <SafeAreaViewWrapper>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <ButtonsWrapper>
            <TabButtonUnselected label="Church" />
            <TabButton label="Community" />
            <TabButtonUnselected label="My Prayers" />
          </ButtonsWrapper>

          <View style={{ flex: 1 }}>
            <CommunityPrayers />
          </View>
        </View>
      </SafeAreaViewWrapper>
    </>
  );
};
