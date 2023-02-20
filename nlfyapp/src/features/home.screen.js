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

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;

const WrapperView = styled(View)`
  top: 40px;
  width: ${wrapperWidth}px;
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
            <Give />
            <Story />
          </WrapperView>
        </ScrollView>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
