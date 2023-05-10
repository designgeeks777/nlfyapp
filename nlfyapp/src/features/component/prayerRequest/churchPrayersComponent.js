import React, { useState, useEffect } from "react";
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

import { BackButton } from "../../../components/backButton";
import { TabButtonUnselected } from "../../../components/TabButtonUnselected";
import { TabButton } from "../../../components/tabButton";

import { useNavigation } from "@react-navigation/native";

import { BASEURL } from "../../../../APIKey";
import axios from "axios";

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

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  margin-top: -15px;
  z-index: 2;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const ButtonsWrapper = styled(View)`
  flex-direction: row;
  margin-left: ${width * 0.03}px;
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
  const url = `${BASEURL}churchPrayers`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        //console.log("Church Prayer Response", response.data.reverse());
        setData(response.data.reverse());

        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled");
        } else {
          console.error(error);
        }
      }
    };

    loadData();

    const intervalId = setInterval(loadData, 60000);

    return () => {
      clearInterval(intervalId);
      source.cancel("Component unmounted");
    };
  }, [url]);

  //const { wrapperwidth } = Dimensions.get("window");
  //const wrapperWidth = wrapperwidth * 0.9;

  const WrapperView = styled(View)`
    width: 900px;
    border-radius: 10px;
    margin-left: 10px;
    padding-top: 51px;
  `;
  const navigation = useNavigation();
  const navigateToCommunityPrayers = () => {
    navigation.navigate("PrayerRequest");
  };

  const navigateToMyPrayers = () => {
    navigation.navigate("MyPrayers");
  };

  return (
    <>
      <WrapperView>
        <BackButton text="Prayer Requests" />
      </WrapperView>
      <SafeAreaViewWrapper>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <ButtonsWrapper>
            <TabButton label="Church" />
            <TabButtonUnselected
              label="Community"
              handleClick={navigateToCommunityPrayers}
            />
            <TabButtonUnselected
              label="My Prayers"
              handleClick={navigateToMyPrayers}
            />
          </ButtonsWrapper>
          <Container>
            {isLoading ? (
              <Text>Loading church Prayers</Text>
            ) : (
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <ChurchPrayerCard title={item.prayerPoint} />
                )}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{
                  paddingBottom: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
          </Container>
        </View>
      </SafeAreaViewWrapper>
    </>
  );
};
