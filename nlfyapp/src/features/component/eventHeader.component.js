/* eslint-disable prettier/prettier */
import React from "react";
import styled from "styled-components";
import { Text } from "react-native";

const EventText = styled(Text)`
  position: absolute;
  top: 540px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.bodylarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const EventSeeAll = styled(Text)`
  position: absolute;
  top: 545px;
  color: ${(props) => props.theme.colors.text.seeall};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  align-self: flex-end;
`;
export const EventHeader = () => {
    return (
        <>
            <EventText>What are we upto</EventText>
            <EventSeeAll> See All Events for this year...</EventSeeAll>
        </>
    );
};
