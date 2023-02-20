import React from "react";
import { ScrollView, View, StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { Devotional } from "./component/homeScreenComponent/devotional.component";
import { Sermon } from "./component/homeScreenComponent/sermon.component";
import { Event } from "./component/homeScreenComponent/event.component";
import { Welcome } from "./component/homeScreenComponent/welcome.component";
import { PrayerRequest } from "./component/homeScreenComponent/prayerRequest.component";

const WrapperView = styled(View)`
  width: 360px;
  border-radius: 10px;
  padding-bottom: 400px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

export const Home = () => {
  return (
    <>
      <SafeAreaViewWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WrapperView>
            <Welcome />
            <Devotional />
            <Sermon />
            <Event />
            <PrayerRequest />
          </WrapperView>
        </ScrollView>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
