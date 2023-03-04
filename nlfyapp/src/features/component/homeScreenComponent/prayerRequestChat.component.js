import React from "react";
import styled from "styled-components/native";
import { Card } from "react-native-paper";
import { Text, View, Image } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.7;

const Container = styled(View)``;

const PrayerCard = styled(Card)`
  top: ${(props) => props.top}px;
  align-self: ${(props) => (props.isRight ? "flex-end" : "flex-start")};
  width: ${cardWidth}px;

  height: 80px;
  background-color: [ "#F26924", "rgba(242, 105, 36, 0.10)"];
  border-radius: 20px;
  shadow-color: transparent;
  justify-content: center;
`;

const PrayerText = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ProfilePicture = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 30px;
`;
const PrayerCardContent = styled(View)`
  flex-direction: ${(props) => (props.isRight ? "row" : "row-reverse")};
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const NameText = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const PrayerRequestChat = () => {
  const PrayerContentRequest =
    "Keep praying for my job, this is the final week of my presentation.";
  const PrayerContentResponse = "Thanks for your prayers, I have been healed..";
  return (
    <Container>
      <PrayerCard elevation={0} top={95} isRight={true}>
        <PrayerCardContent>
          <PrayerText variant="body">{PrayerContentRequest}</PrayerText>
        </PrayerCardContent>
      </PrayerCard>
      <View style={{ marginLeft: 20, top: 25 }}>
        <ProfilePicture source={require("nlfyapp/assets/profile1.jpg")} />
        <NameText variant="caption">Robin</NameText>
      </View>

      <PrayerCard elevation={0} top={50} isRight={false}>
        <PrayerCardContent>
          <PrayerText variant="body">{PrayerContentResponse}</PrayerText>
        </PrayerCardContent>
      </PrayerCard>
      <View style={{ marginLeft: 300, bottom: 20 }}>
        <ProfilePicture source={require("nlfyapp/assets/profile2.jpg")} />
        <NameText variant="caption">Sandeep</NameText>
      </View>
    </Container>
  );
};
