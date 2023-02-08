import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { Button } from "../components/button";
import { Home } from "./home.screen";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

const Slide1 = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Slide2 = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Slide3 = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Slide4 = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Slide1Image = styled(Image)`
  height: 500px;
  width: 500px;
  align-self: center;
  position: absolute;
  top: 0;
`;

const Slide2Image = styled(Image)`
  height: 250px;
  width: 250px;
`;

const TextSlide1 = styled(Text)`
  align-items: center;
  top: 190px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const TextSlide2 = styled(Text)`
  top: 190px;
  padding-top: 16px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

const TextScreen2 = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
`;

const TextScreen2Orange = styled(Text)`
  top: 20px;
  padding-top: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const Onboarding = () => {
  const [showPagination, setShowPagination] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const setPaginationState = (index) => {
    if (index === 3) {
      setShowPagination(false);
      setScrollEnabled(false);
    } else {
      setShowPagination(true);
      setScrollEnabled(true);
    }
  };

  return (
    <SafeArea>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        activeDotColor="red"
        loop={false}
        onIndexChanged={(index) => setPaginationState(index)}
        showsPagination={showPagination}
        scrollEnabled={scrollEnabled}
      >
        <Slide1>
          <Slide1Image source={require("nlfyapp/assets/onboarding1.jpg")} />
          <TextSlide1>You Matter to God</TextSlide1>
          <TextSlide1>You Matter to Us</TextSlide1>
          <TextSlide2>
            Join this beautiful family to experience spiritual richness,
            healing, fellowship, community and much more
          </TextSlide2>
        </Slide1>
        <Slide2>
          <Slide2Image source={require("nlfyapp/assets/onboarding2.jpg")} />
          <TextScreen2>
            Easily join this spiritual family which is not just a Sunday church
            but cares about you..
          </TextScreen2>

          <TextScreen2Orange>
            Sign Up to have a customized experience or swipe
          </TextScreen2Orange>
          <Button label="Sign Up" />
        </Slide2>
        <Slide3>
          <Slide2Image source={require("nlfyapp/assets/onboarding3.jpg")} />
          <TextScreen2>
            Have fellowship, listen sermons,be part of life groups,give easily
            as God leads you
          </TextScreen2>
          <Button label="Get Started" />
        </Slide3>
        <Slide4>
          <Home />
        </Slide4>
      </Swiper>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
});
