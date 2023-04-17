import React from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { TabButton } from "../../../components/tabButton";
import { TabButtonUnselected } from "../../../components/TabButtonUnselected";
import { BackButton } from "../../../components/backButton";
import { useNavigation } from "@react-navigation/native";
import { ExpandCollapseListMyPrayers } from "../../../components/expandCollapse.MyPrayers";
//const { width } = Dimensions.get("window");

const WrapperView = styled(View)`
  width: 900px;
  border-radius: 10px;
  margin-left: 10px;
  padding-top: 51px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  margin-top: -15px;
  z-index: 2;
`;
const ButtonsWrapper = styled(View)`
  flex-direction: row;
`;

export const MyPrayersScreen = () => {
  var data = [
    {
      id: 1,
      date: "Submitted on 23/11/2022",
      myPrayers:
        "Please pray for my health.Have been suffering for quite sometime",
    },
    {
      id: 2,
      date: "Submitted on 05/01/2023",
      myPrayers:
        "I'm struggling with a chronic illness and could use some prayers for physical and emotional healing.",
    },
    {
      id: 3,
      date: "Submitted on 02/02/2023",
      myPrayers:
        "I'm traveling overseas and would appreciate your prayers for protection and safety. I'm traveling overseas and would appreciate your prayers for protection and safety.",
    },
    {
      id: 4,
      date: "Submitted on 23/02/2022",
      myPrayers:
        "I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones, I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones",
    },
    {
      id: 5,
      date: "Submitted on 25/03/2023",
      myPrayers:
        "I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones, I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones",
    },
    {
      id: 6,
      date: "Submitted on 25/03/2023",
      myPrayers:
        "I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones, I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones",
    },
    {
      id: 7,
      date: "Submitted on 25/03/2023",
      myPrayers:
        "I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones, I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones",
    },
    {
      id: 8,
      date: "Submitted on 25/03/2023",
      myPrayers:
        "I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones, I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones",
    },
    {
      id: 9,
      date: "Submitted on 25/03/2023",
      myPrayers:
        "I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones, I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones",
    },
    {
      id: 10,
      date: "Submitted on 25/03/2023",
      myPrayers:
        "I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones, I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones",
    },
    {
      id: 11,
      date: "Submitted on 25/03/2023",
      myPrayers:
        "I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones, I'm trying to deepen my relationship with God and would appreciate your prayers for my spiritual growth and for the salvation of my loved ones",
    },
  ];
  const navigation = useNavigation();
  const navigateToCommunityPrayers = () => {
    navigation.navigate("PrayerRequest");
  };

  const navigateToChurchPrayers = () => {
    navigation.navigate("ChurchPrayers");
  };
  return (
    <>
      <WrapperView>
        <BackButton text="Prayer Requests" />
      </WrapperView>
      <SafeAreaViewWrapper>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <ButtonsWrapper>
            <TabButtonUnselected
              label="Church"
              handleClick={navigateToChurchPrayers}
            />
            <TabButtonUnselected
              label="Community"
              handleClick={navigateToCommunityPrayers}
            />
            <TabButton label="My Prayers" />
          </ButtonsWrapper>
        </View>
        <ExpandCollapseListMyPrayers data={data} />
      </SafeAreaViewWrapper>
    </>
  );
};
