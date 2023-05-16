import React, { useContext } from "react";
import { View, Dimensions, StatusBar, SafeAreaView, Alert } from "react-native";
import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";

import { CommunityPrayers } from "./component/prayerRequest/communityPrayersComponent";

import { TabButton } from "../components/tabButton";
import { TabButtonUnselected } from "../components/TabButtonUnselected";

import { AuthenticationContext } from "../services/authentication/authentication.context";

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
  const { user } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const navigateToChurchPrayers = () => {
    navigation.navigate("ChurchPrayers");
  };
  const navigateToMyPrayers = () => {
    if (null === user) {
      Alert.alert("KIndly login/signup to see My Prayers");
    } else {
      navigation.navigate("MyPrayers");
    }
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
