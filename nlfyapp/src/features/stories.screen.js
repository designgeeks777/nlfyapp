import React from "react";
import styled from "styled-components";
import { BackButton } from "../components/backButton";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { View, Dimensions, StatusBar, SafeAreaView } from "react-native";
import { ExpandCollapseList } from "../components/expandCollapse.component";

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

export const Stories = () => {
  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Stories" />
        </WrapperView>
        <ExpandCollapseList screenName="stories" />
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
