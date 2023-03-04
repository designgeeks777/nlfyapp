import React from "react";
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
import styled from "styled-components/native";
//import { LinearGradient } from "expo-linear-gradient";

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
];

const PrayerCard = styled(View)`
  background-color: #e94a27;
  color: #f26924;
  padding: 20px;
  margin-vertical: 8px;
  margin-horizontal: 16px;
  border-radius: 10px;
`;

const PrayerTitle = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const PrayerList = styled(FlatList)`
  flex: 1;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

export const ChurchPrayers = () => {
  const renderItem = ({ item }) => (
    <PrayerCard>
      <PrayerTitle>{item.title}</PrayerTitle>
    </PrayerCard>
  );

  return (
    <Container>
      <PrayerList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </Container>
  );
};
