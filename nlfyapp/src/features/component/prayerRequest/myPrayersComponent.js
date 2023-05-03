import React from "react";
import { View, Text, Dimensions, SafeAreaView, StatusBar } from "react-native";
import { BackButton } from "../../../components/backButton";
import { TabButton } from "../../../components/tabButton";
import { TabButtonUnselected } from "../../../components/TabButtonUnselected";
import styled from "styled-components";

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
  margin-right: 2px;
`;

const ButtonsWrapper = styled(View)`
  flex-direction: row;
`;

export const MyPrayersScreen = () => {
  const navigation = useNavigation();
  const navigateToChurchPrayers = () => {
    navigation.navigate("ChurchPrayers");
  };
  const navigateToCommunityPrayers = () => {
    navigation.navigate("PrayerRequest");
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
            <TabButtonUnselected
              label="Community"
              handleClick={navigateToCommunityPrayers}
            />
            <TabButton label="My Prayers" />
          </ButtonsWrapper>
          <Text>Content</Text>
        </View>
      </SafeAreaViewWrapper>
    </>
  );
};
