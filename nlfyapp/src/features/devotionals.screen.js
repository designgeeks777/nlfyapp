import React from "react";
import { ExpandCollapseList } from "../components/expandCollapse.component";
import { BackButton } from "../components/backButton";
import { View, Dimensions, SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  top: 20px;
  margin-left: 10px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  justify-content: flex-start;
`;

export const Devotionals = () => {
  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Devotionals" />
        </WrapperView>
        <ExpandCollapseList screenName="devotionals" />
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
