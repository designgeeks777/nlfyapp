import React, { useEffect, useState, useContext } from "react";
import { View, Text, Dimensions, SafeAreaView, StatusBar } from "react-native";
import { BackButton } from "../../../components/backButton";
import { TabButton } from "../../../components/tabButton";
import { TabButtonUnselected } from "../../../components/TabButtonUnselected";
import styled from "styled-components";

import axios from "axios";
import { BASEURL } from "../../../../APIKey";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import { ExpandCollapseList } from "../../../components/expandCollapse.myPrayerComponent";

import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const marginRight = width * 0.05;
const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
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
  justify-content: center;
  margin-right: ${marginRight}px;
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
        //console.log("Filtered Data", filteredData);

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
          <View>
            {isLoading}
            <ExpandCollapseList data={data} />
          </View>
        </View>
      </SafeAreaViewWrapper>
    </>
  );
};
