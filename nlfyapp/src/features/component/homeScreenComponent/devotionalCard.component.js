import React from "react";
import styled from "styled-components";
import { Card, Text } from "react-native-paper";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;
const cardContentWidth = width * 0.8;

const DevotionalCard = styled(Card)`
  top: 20px;
  width: ${cardWidth}px;
  height: 210px;
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
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
  width: ${cardContentWidth}px;
  top: 5px;
`;

const CardReadmore = styled(Text)`
  align-self: flex-end;
  text-align: right;
  top: 10px;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StyledLinearGradient = styled(LinearGradient)`
  border-radius: 10px;
  width: ${cardWidth}px;
  height: 210px;
  padding: 5px;
`;

export const HomePageDevotionalCard = ({ devotional = {} }) => {
  const cardContentText =
    "Your road led through the sea, your pathway through the mighty waters - a pathway no one knew was there - Psalms 77:19(NLT) Godactively works through your circumstances. But you cannot judge your situation apart from God’s";
  const cardContentTitle = "God's Plan for you is great - Rick Warren";
  const navigation = useNavigation();
  const goToDevotionalsScreen = () => {
    navigation.navigate("Devotionals");
  };
  return (
    <DevotionalCard>
      <StyledLinearGradient
        start={{ x: 180, y: 0.4 }}
        end={{ x: 180, y: 0.6 }}
        colors={
          (["#F22424", "rgba(242, 36, 36, 1)"],
          ["#F26924", "rgba(242, 105, 36, 0.80)"])
        }
      >
        <Card.Content>
          <CardTitle variant="titleLarge">{cardContentTitle}</CardTitle>
          <CardContent numberOfLines={5} variant="bodyMedium">
            {cardContentText}
          </CardContent>
        </Card.Content>
        <Card.Actions>
          <CardReadmore variant="bodyMedium" onPress={goToDevotionalsScreen}>
            Read More...
          </CardReadmore>
        </Card.Actions>
      </StyledLinearGradient>
    </DevotionalCard>
  );
};
