import React, { useContext } from "react";
import { View, Dimensions, StatusBar, SafeAreaView, Alert } from "react-native";
import styled from "styled-components";
import { BackButton } from "../components/backButton";
import { CommunityPrayers } from "./component/prayerRequest/communityPrayersComponent";
import { TabButton } from "../components/tabButton";
import { TabButtonUnselected } from "../components/TabButtonUnselected";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const wrapperPadding = width * 0.13;
const wrapperMargin = width * 0.03;

const WrapperView = styled(View)`
  width:${wrapperWidth * 0.9}px;
  margin-left: ${wrapperMargin }px;
  padding-top:${wrapperPadding }px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  margin-top: ${StatusBar.currentHeight - 35 || 0}px;
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
      Alert.alert("Kindly login/signup to see My Prayers");
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
