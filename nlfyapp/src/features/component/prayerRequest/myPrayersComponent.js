import React, { useEffect, useState, useContext } from "react";
import { View, Text, Dimensions, SafeAreaView, StatusBar } from "react-native";
import { BackButton } from "../../../components/backButton";
import { TabButton } from "../../../components/tabButton";
import { TabButtonUnselected } from "../../../components/TabButtonUnselected";
import { BASEURL } from "../../../../APIKey";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ExpandCollapseListMyPrayers } from "../../../components/expandCollapse.myPrayerComponent";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import axios from "axios";

const { width } = Dimensions.get("window");

const wrapperWidth = width * 0.9;
const wrapperPadding = width * 0.13;
const wrapperMargin = width * 0.03;

const WrapperView = styled(View)`
  width:${wrapperWidth * 0.9}px;
  margin-left: ${wrapperMargin }px;
  padding-top:${wrapperPadding }px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  margin-top: ${StatusBar.currentHeight - 35 || 0}px;
  z-index: 2;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight* 0.4|| 0}px;
  `;

const ButtonsWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  margin-right: ${width * 0.03}px;
`;

export const MyPrayersScreen = () => {
  const url = `${BASEURL}prayerRequests`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });

        const filteredData = response.data.filter(
          (record) => record.raisedByUid === user.uid
        );

        setData(filteredData);

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
  }, [url, user.uid]);

  const navigation = useNavigation();
  const navigateToChurchPrayers = () => {
    navigation.navigate("ChurchPrayers");
  };
  const navigateToCommunityPrayers = () => {
    navigation.navigate("PrayerRequest");
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
          <Container>
            {isLoading}
            <ExpandCollapseListMyPrayers data={data} />
          </Container>
        </View>
      </SafeAreaViewWrapper>
    </>
  );
};
