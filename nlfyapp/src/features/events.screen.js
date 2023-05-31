import React, { useState } from "react";
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";
import { EventDateCard } from "./component/event/eventDateCard.component";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const wrapperPadding = width * 0.05;
const wrapperMargin = width * 0.03;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: ${width * 0.9}px; //10px;
  margin-left: ${wrapperMargin }px;
  padding-top:${wrapperPadding}px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

export const Events = () => {
  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Events" />
        </WrapperView>
        <EventDateCard />
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
