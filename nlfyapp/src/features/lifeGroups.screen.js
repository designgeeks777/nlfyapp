import React from "react";
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";

import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";
import { LifeGroupCard } from "./component/lifeGroup/lifeGroupCard.component";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  padding-bottom: ${width * 0.05}px;
  top: ${width * 0.05}px;
  margin-left: 10px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;
export const LifeGroups = () => {
  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Life Groups" />
        </WrapperView>

        <LifeGroupCard />
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
