import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { Button } from "../components/button";
import { Home } from "./home.screen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Sermons } from "./sermons.screen";
import { Events } from "./events.screen";
import { PrayerRequest } from "./prayerRequest.screen";
import { Give } from "./give.screen";
import { LifeGroups } from "./lifeGroups.screen";
import { Stories } from "./stories.screen";

import { PrayerRequestNavigation } from "../../PrayerRequestNavigation";

const { width, height } = Dimensions.get("window");
const slide1ImageWidth = width * 1;
const slide1ImageHeight = height * 0.5;
const slide2ImageWidth = width * 0.5;
const slide2ImageHeight = height * 0.3;
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

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
  top: -20px;
  justify-content: center;
  align-items: center;
`;

const Slide1Image = styled(ImageBackground)`
  height: ${slide1ImageHeight}px;
  width: ${slide1ImageWidth}px;
  align-self: center;
  position: absolute;
  top: 0;
`;
const OverlaySlide1ImageView = styled(View)`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba(242, 105, 36, 0.4);
`;

const Slide2ImageConatinerView = styled(View)`
  height: ${slide2ImageHeight}px;
  width: ${slide2ImageWidth}px;
  border-radius: 10px;
  top: 0px;
  margin-bottom: 32px;
`;
const Slide2Image = styled(Image)`
  height: 100%;
  width: 100%;
`;

const TextSlide1 = styled(Text)`
  align-items: center;
  top: 132px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const TextSlide2 = styled(Text)`
  top: 140px;
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
  margin-top: 24px;
`;

const TextScreen2Orange = styled(Text)`
  top: 20px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const TextScreen1Orange = styled(Text)`
  top: 160px;
  padding-top: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  if (iconName === "md-home") {
    return {
      tabBarIcon: ({ size, color }) => (
        <Ionicons name={iconName} size={size} color={color} />
      ),
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        display: "flex",
      },
    };
  } else if (
    iconName === "pray" ||
    iconName === "people-arrows" ||
    iconName === "donate" ||
    iconName === "bible"
  ) {
    return {
      tabBarIcon: ({ size, color }) => (
        <FontAwesome5 name={iconName} size={size} color={color} />
      ),
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        display: "flex",
      },
    };
  }
};

const TAB_ICON = {
  Home: "md-home",
  "Prayer Request": "pray",
  Give: "donate",
  Sermons: "bible",
  "Life Groups": "people-arrows",
};

const Tab = createBottomTabNavigator();
export function HomeWrapper() {
  return (
    <Slide4>
      <Home />
    </Slide4>
  );
}

export const Onboarding = () => {
  const [showPagination, setShowPagination] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const setPaginationState = (index) => {
    if (index === 3) {
      setShowPagination(false);
      setScrollEnabled(false);
    }
  };
  const navigation = useNavigation();
  const navigateToSignUp = () => {
    console.log("NavigateToSignUp");
    navigation.navigate("SignUp");
  };
  const navigateToLogin = () => {
    console.log("NavigateToLogin");
    navigation.navigate("Login");
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
          <Slide1Image
            source={require("nlfyapp/assets/onboarding1.jpg")}
            resizeMode="cover"
          >
            <OverlaySlide1ImageView />
          </Slide1Image>
          <TextSlide1>You Matter to God</TextSlide1>
          <TextSlide1>You Matter to Us</TextSlide1>
          <TextSlide2>
            Join this beautiful family to experience spiritual richness,
            healing, fellowship, community and much more
          </TextSlide2>
          <TextScreen1Orange>Swipe to learn more</TextScreen1Orange>
        </Slide1>
        <Slide2>
          <Slide2ImageConatinerView>
            <Slide2Image source={require("nlfyapp/assets/onboarding2.png")} />
          </Slide2ImageConatinerView>
          <TextScreen2>
            Easily join this spiritual family which is not just a Sunday church
            but cares about you..
          </TextScreen2>

          <TextScreen2Orange>
            Sign Up to have a customized experience or swipe
          </TextScreen2Orange>
          <Button label="Sign Up" />
          <TextScreen2>
            Already a member?
            <TextScreen1Orange onPress={navigateToLogin}>
              Log in
            </TextScreen1Orange>
          </TextScreen2>
        </Slide2>
        <Slide3>
          <Slide2ImageConatinerView>
            <Slide2Image source={require("nlfyapp/assets/onboarding3.png")} />
          </Slide2ImageConatinerView>
          <TextScreen2>
            Have fellowship, listen sermons,be part of life groups,give easily
            as God leads you
          </TextScreen2>
          {/* <TextScreen2Orange>Swipe to get started</TextScreen2Orange> */}
        </Slide3>

        <NavigationContainer independent={true}>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen
              name="Home"
              component={HomeWrapper}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Prayer Request"
              component={{ PrayerRequestNavigation }}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Give"
              component={Give}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Sermons"
              component={Sermons}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Life Groups"
              component={LifeGroups}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Events"
              component={Events}
              options={{
                tabBarButton: () => null,
                tabBarVisible: false,
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Stories"
              component={Stories}
              options={{
                tabBarButton: () => null,
                tabBarVisible: false,
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Swiper>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
});
