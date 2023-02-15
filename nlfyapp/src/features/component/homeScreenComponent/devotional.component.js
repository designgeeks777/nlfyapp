/* eslint-disable prettier/prettier */
import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import { HomePageDevotionalCard } from "./devotionalCard.component";

const MessageText = styled(Text)`
  top: 10px;
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
