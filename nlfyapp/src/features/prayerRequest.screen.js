import React, { useContext } from "react";
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Alert,
  Platform,
} from "react-native";
import styled from "styled-components";
import { BackButton } from "../components/backButton";
import { CommunityPrayers } from "./component/prayerRequest/communityPrayersComponent";
import { TabButton } from "../components/tabButton";
import { TabButtonUnselected } from "../components/TabButtonUnselected";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { useNavigation } from "@react-navigation/native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const padding = width * 0.1;
const top = width * 0.05;
const marginLeft = width * 0.05;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  padding-bottom: ${padding}px; 
  top: ${top}px; 
  margin-left:${marginLeft}px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: flex-start;
`;

const ButtonsWrapper = styled(View)`
  flex-direction: row;
  margin-bottom: ${Platform.OS === "ios" ? `${width * 0.1}px` : "0px"};
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
     <SafeAreaViewWrapper>
      <WrapperView>
        <BackButton text="Prayer Requests" />
      </WrapperView>
     
        <View style={{ flexDirection: "column", flex: 1, paddingTop: StatusBar.currentHeight * 0.1, paddingBottom: StatusBar.currentHeight * 0.9 }}>
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
      <ExpoStatusBar style="auto" />
    </>
  );
};
