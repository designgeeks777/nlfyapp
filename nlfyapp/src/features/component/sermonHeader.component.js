import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

const SermonText = styled(Text)`
  position: absolute;
  top: 285px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.bodylarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const SermonSeeAll = styled(Text)`
  position: absolute;
  top: 290px;
  color: ${(props) => props.theme.colors.text.seeall};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  align-self: flex-end;
`;

export const HeaderSermon = () => {
  return (
    <>
      <SermonText>Latest Sermon</SermonText>
      <SermonSeeAll>See All... </SermonSeeAll>
    </>
  );
};
