import React from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

import { Devotional } from "./component/homeScreenComponent/devotional.component";
import { Sermon } from "./component/homeScreenComponent/sermon.component";
import { Event } from "./component/homeScreenComponent/event.component";
import { Give } from "./component/homeScreenComponent/give.component";
import { Story } from "./component/homeScreenComponent/story.component";
import { Welcome } from "./component/homeScreenComponent/welcome.component";
import { LifeGroup } from "./component/homeScreenComponent/lifeGroup.component";
import { PrayerRequest } from "./component/homeScreenComponent/prayerRequest.component";
import { useNavigation } from "@react-navigation/native";
import { LiveStream } from "./component/homeScreenComponent/liveStream.component";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const paddingBottom = width * 0.3;
const top = width * 0.02;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  padding-bottom: ${paddingBottom}px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  top: ${top}px; //top: 10px;
  align-items: center;
  // justify-content: flex-start;
`;
export const Home = (props) => {
  return (
    <>
      <SafeAreaViewWrapper>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <WrapperView>
            <Welcome />
            <LiveStream />
            <Devotional />
            <Sermon />
            <Event />
            <PrayerRequest />
            <Give />
            <Story />
            <LifeGroup />
          </WrapperView>
        </ScrollView>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
