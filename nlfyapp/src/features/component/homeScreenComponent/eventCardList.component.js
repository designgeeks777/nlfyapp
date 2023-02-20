import React from "react";
import styled from "styled-components";
import { Card, Text } from "react-native-paper";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.4;
const EventCard = styled(Card)`
  top: 70px;
  width: ${cardWidth}px;
  height: 115px;
  border-radius: 15px;
  border-width: 1px;
  border-color: [ "#F26924", "rgba(242, 105, 36, 0.40)"];
  background-color: ${(props) => props.theme.colors.bg.primary};
  shadow-color: transparent;
`;

const EventCardTitle = styled(Text)`
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const EventCardContent = styled(Text)`
  padding-top: 4px;
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const EventCardList = () => {
  return (
    <EventCard elevation={0}>
      <Card.Content>
        <EventCardTitle variant="titleLarge">Church Picnic</EventCardTitle>
        <EventCardContent variant="bodyMedium">26th Jan 2023</EventCardContent>
      </Card.Content>
    </EventCard>
  );
};
