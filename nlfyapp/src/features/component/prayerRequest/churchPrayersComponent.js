/* eslint-disable react-native/no-inline-styles */
import React from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-paper";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;
const cardHeight = 72;
const cardContentWidth = width * 0.8;

const ChurchPrayersCard = styled(Card)`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
const StyledLinearGradient = styled(LinearGradient)`
  border-radius: 10px;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  padding: 5px;
`;

const PrayerContent = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  width: ${cardContentWidth + 32}px;
  text-align: center;
  padding: 10px;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const ChurchPrayerCard = ({ title }) => (
  <View style={{ paddingVertical: 10, top: -5 }}>
    <ChurchPrayersCard>
      <StyledLinearGradient
        start={{ x: 180, y: 0.1 }}
        end={{ x: 180, y: 0.9 }}
        colors={["#F22424", "rgba(242, 105, 36, 0.80)"]}
      >
        <PrayerContent numberOfLines={3} variant="bodyMedium">
          {title}
        </PrayerContent>
      </StyledLinearGradient>
    </ChurchPrayersCard>
  </View>
);

export const ChurchPrayers = () => {
  const DATA = [
    {
      title: "Pray for Yelahanka and North Bangalore.",
    },
    {
      title: "Pray for Health of church members.",
    },
    {
      title: "Pray for our Nation and Leaders.",
    },
    {
      title:
        "Pray for Yelahanka and North Bangalore. Pray for Health of church members. Pray for Health of church members. Pray for Health of church members.",
    },
    {
      title: "Pray for Health of church members .",
    },
    {
      title: "Pray for our Nation and Leaders .",
    },
    {
      title:
        "Pray for Yelahanka and North Bangalore. Pray for Health of church members. Pray for Health of church members.",
    },
    {
      title: "Pray for Health of church members and there family.",
    },
    {
      title: "Pray for our India and Leaders of the nation.",
    },
  ];

  return (
    <Container>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ChurchPrayerCard title={item.title} />}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{
          paddingBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </Container>
  );
};
