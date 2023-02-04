/* eslint-disable prettier/prettier */
import React from "react";
import { Text, Image, View, StyleSheet,StatusBar, SafeAreaView, Pressable } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";


const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

// const wrapper = styled(View)``;

const Slide1 = styled(View)`
  flex : 1;
  justify-content : center;
  align-items : center
`;

const Slide2 = styled(View)`
  flex : 1;
  justify-content : center;
  align-items : center
`;

const Slide3 = styled(View)`
  flex : 1;
  justify-content : center;
  align-items : center
`;

const Slide1Image = styled(Image)`
  height: 500px;
  width: 500px;
  align-self: center;
  position: absolute;
  top: 0 
`;

const Slide2Image = styled(Image)`
  height: 250px;
  width: 250px;
`;

const TextSlide1 = styled(Text)`
  align-items: center;
  top: 180px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props)=> props.theme.fontSizes.header};
  font-weight: ${(props)=> props.theme.fontWeights.medium};
  font-family: ${(props)=> props.theme.fonts.body}; 
`;

const TextSlide2 = styled(Text)`
  top: 190px;
  padding-top: 16px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props)=> props.theme.fontSizes.body};
  font-weight: ${(props)=> props.theme.fontWeights.medium};
  font-family: ${(props)=> props.theme.fonts.body}; 
`;

const TextScreen2 = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props)=> props.theme.fontSizes.body};
  font-weight: ${(props)=> props.theme.fontWeights.medium};
  font-family: ${(props)=> props.theme.fonts.body}; 
`;

const TextScreen2Orange = styled(Text)`
  top: 20px;
  padding-top: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props)=> props.theme.fontSizes.caption};
  font-weight: ${(props)=> props.theme.fontWeights.medium};
  font-family: ${(props)=> props.theme.fonts.body}; 
`;

const Button = styled(Pressable)`
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 32px;
  border-radius: 50px;
  top: 50px;
  width: 320px;
  height: 56px;
  background-color: ${(props) => props.theme.colors.bgbutton.primary};
`;

const ButtonText = styled(Text)`
  text-align : center;
  font-size: ${(props)=> props.theme.fontSizes.button};
  line-height: ${(props)=> props.theme.lineHeights.button};
  font-weight: ${(props)=> props.theme.fontWeights.bold};
  letter-spacing: ${(props) => props.theme.space[1]}; 
  color : ${(props) => props.theme.colors.text.inverse};
  font-family: ${(props)=> props.theme.fonts.body}; 
`;


const TextScreen3 = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props)=> props.theme.fontSizes.header};
  font-weight:${(props)=> props.theme.fontWeights.medium};
  font-family: ${(props)=> props.theme.fonts.body};
`;

export const Onboarding = () => {
  return (
    <SafeArea>
    <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="red">
      <Slide1>
        <Slide1Image
          source = {require("nlfyapp/assets/onboarding1.jpg")}
        />
        <TextSlide1>You Matter to God</TextSlide1>
        <TextSlide1>You Matter to Us</TextSlide1>
        <TextSlide2>
          Join this beautiful family to experience spiritual richness, healing,
          fellowship, community and much more
        </TextSlide2>
      </Slide1>
      <Slide2>
        <Slide2Image
          source={require("nlfyapp/assets/onboarding2.jpg")}
        />
        <TextScreen2>
          Easily join this spiritual family which is not just a Sunday church
          but cares about you..
        </TextScreen2>

        <TextScreen2Orange>
          Sign Up to have a customized experience or swipe
        </TextScreen2Orange>
        <Button elevation={3}>
          <ButtonText>Sign Up</ButtonText>
        </Button>
      </Slide2>
      <Slide3>
        <TextScreen3>And simple</TextScreen3>
      </Slide3>
    </Swiper>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
});


