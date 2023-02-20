import React from "react";
import styled from "styled-components";
import { Card, Text } from "react-native-paper";

const StoryCard = styled(Card)`
  top: 70px;
  width: 225px;
  height: 100px;
  border-radius: 15px;
  border-width: 1px;
  border-color: #ccc;
  background-color: ${(props) => props.theme.colors.bg.primary};
  shadow-color: transparent;
`;

const StoryCardContent = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StoryCardContentExpand = styled(Text)`
  padding-right: 10px;
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const StoryCardList = () => {
  return (
    <StoryCard elevation={0}>
      <Card.Content>
        <StoryCardContent variant="bodyMedium" numberOfLines={2}>
          "Had an amazing time growing..." - by Anna
        </StoryCardContent>
      </Card.Content>
      <Card.Actions>
        <StoryCardContentExpand variant="bodyMedium">
          Read On
        </StoryCardContentExpand>
      </Card.Actions>
    </StoryCard>
  );
};
