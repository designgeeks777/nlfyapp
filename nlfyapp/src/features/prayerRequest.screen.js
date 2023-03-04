/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, Dimensions, StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CommunityPrayers } from "./component/prayerRequest/communityPrayersComponent";
import { ChurchPrayers } from "./component/prayerRequest/churchPrayersComponent";
import { NavigationContainer } from "@react-navigation/native";

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
`;

const MyPrayersScreen = () => {
  return (
    <View>
      <Text>My Prayers</Text>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

export const PrayerRequest = ({ route }) => {
  return (
    <>
      <WrapperView>
        <BackButton text="Prayer Requests" />
      </WrapperView>
      <SafeAreaViewWrapper>
        <View style={{ flex: 1 }}>
          <NavigationContainer independent={true}>
            <Tab.Navigator
              initialRouteName="Community Prayers"
              screenOptions={{
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: { fontSize: 12 },
                tabBarItemStyle: { width: 140 },
                tabBarStyle: { backgroundColor: "white" },
                tabPressToFocus: true,
              }}
            >
              <Tab.Screen name="Church Prayers" component={ChurchPrayers} />
              <Tab.Screen
                name="Community Prayers"
                component={CommunityPrayers}
              />
              <Tab.Screen name="My Prayers" component={MyPrayersScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
