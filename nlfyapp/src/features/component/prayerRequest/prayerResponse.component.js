import React from "react";
import { BackButton } from "../../../components/backButton";
import { View, Dimensions, SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ExpandCollapseList } from "../../../components/expandCollapse.prayerResponse.component";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const wrapperPadding = width * 0.05;
const wrapperMargin = width * 0.03;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  margin-left: ${wrapperMargin}px;
  padding-top:${wrapperPadding}px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  justify-content: flex-start;
`;

const ListWrapper = styled(View)`
  flex: 1;
  margin-top: ${wrapperPadding * 0.3}px;
  align-items: center;
`;

export const PrayerResponse = ({ route }) => {
  const { responses } = route.params;

  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Responses" />
        </WrapperView>
        <ListWrapper>
          <ExpandCollapseList data={responses} />
        </ListWrapper>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
