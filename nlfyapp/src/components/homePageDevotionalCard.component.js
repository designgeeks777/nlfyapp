import React from "react";
import styled from "styled-components";
import { Card, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

const DevotionalCard = styled(Card)`
  top: 40px;
  position: absolute;
  width: 360px;
  height: 180px;
  border-radius: 10px;
`;

const CardTitle = styled(Text)`
  padding-top: 8px;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const CardContent = styled(Text)`
  padding-top: 8px;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
  width: 340px;
`;

const CardReadmore = styled(Text)`
  position: absolute;
  padding-left: 240px;
  top: 150px;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StyledLinearGradient = styled(LinearGradient)`
  border-radius: 10px;
  width: 360px;
  height: 180px;
`;

export const HomePageDevotionalCard = ({ devotional = {} }) => {
  const cardContentText =
    "Your road led through the sea, your pathway through the mighty waters - a pathway no one knew was there - Psalms 77:19(NLT) Godactively works through your circumstances. But you cannot judge your situation apart from God’s";
  const cardContentTitle = "God's Plan for you is great - Rick Warren";
  return (
    <DevotionalCard>
      <StyledLinearGradient
        start={{ x: 180, y: 0.25 }}
        end={{ x: 180, y: 1.0 }}
        colors={["#E94A27", "#F26924"]}
      >
        <Card.Content>
          <CardTitle variant="titleLarge">{cardContentTitle}</CardTitle>
          <CardContent numberOfLines={5} variant="bodyMedium">
            {cardContentText}
          </CardContent>
          <CardReadmore variant="bodyMedium">Read More...</CardReadmore>
        </Card.Content>
      </StyledLinearGradient>
    </DevotionalCard>
  );
};
