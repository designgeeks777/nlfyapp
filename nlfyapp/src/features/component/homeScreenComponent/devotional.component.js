import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { HomePageDevotionalCard } from "./devotionalCard.component";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const textTop = width * 0.04;

const MessageText = styled(Text)`
  top: ${textTop}px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const Devotional = () => {
  return (
    <>
      <MessageText>Today's Message for you</MessageText>
      <HomePageDevotionalCard />
    </>
  );
};
