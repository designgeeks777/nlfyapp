import React, { useState, useEffect, useContext } from "react";
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
  Alert,
} from "react-native";
import { BackButton } from "../../../components/backButton";
import { TabButtonUnselected } from "../../../components/TabButtonUnselected";
import { TabButton } from "../../../components/tabButton";
import { useNavigation } from "@react-navigation/native";
import { BASEURL } from "../../../../APIKey";
import axios from "axios";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const { width } = Dimensions.get("window");

const cardWidth = width * 0.9;
const cardHeight = width * 0.2;
const cardContentWidth = width * 0.8;
const wrapperWidth = width * 0.9;
const wrapperPadding = width * 0.13;
const wrapperMargin = width * 0.03;

const ChurchPrayersCard = styled(Card)`
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  border-radius: ${width *0.03}px;
  justify-content: center;
  align-items: center;
`;
const StyledLinearGradient = styled(LinearGradient)`
  border-radius: ${width *0.03}px;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  padding: ${StatusBar.currentHeight * 0.35}px;
`;

const PrayerContent = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  width: ${cardContentWidth + 32}px;
  text-align: center;
  padding: ${StatusBar.currentHeight * 0.2}px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  margin-top: ${StatusBar.currentHeight - 35 || 0}px;
  z-index: 5;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight* 0.4|| 0}px;
`;

const ButtonsWrapper = styled(View)`
  flex-direction: row;
  margin-left: ${width * 0.03}px;
`;

const ChurchPrayerCard = ({ title }) => (
  <View style={{ paddingVertical: width *0.03, top: width *0.001 }}>
    <ChurchPrayersCard>
      <StyledLinearGradient
        start={{ x: 180, y: 0.1 }}
        end={{ x: 180, y: 0.9 }}
        colors={["#F22424", "rgba(242, 105, 36, 0.80)"]}
      >
        <PrayerContent numberOfLines={2} variant="bodyMedium">
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

  const { user } = useContext(AuthenticationContext);

  const WrapperView = styled(View)`
    width:${wrapperWidth * 0.9}px;
    margin-left: ${wrapperMargin }px;
    padding-top:${wrapperPadding }px;
  `;
  const navigation = useNavigation();
  
  const navigateToCommunityPrayers = () => {
    navigation.navigate("PrayerRequest");
  };

  const navigateToMyPrayers = () => {
    if (null === user) {
      Alert.alert("Kindly login/signup to see My Prayers");
    } else {
      navigation.navigate("MyPrayers");
    }
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
                  paddingBottom:width *0.01,
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