import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions
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
import { Give } from "./give.screen";
import { LifeGroups } from "./lifeGroups.screen";
import { Stories } from "./stories.screen";
import { useNavigation } from "@react-navigation/native";
import { Devotionals } from "./devotionals.screen";
import { PrayerRequestNavigation } from "../../PrayerRequestNavigation";

const { width } = Dimensions.get("window");
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
  top:  ${width * 0.01}px;
  justify-content: center;
  align-items: center;
`;

const Slide1Image = styled(Image)`
  height:  ${width * 1.2}px; 
  width: ${width}px; 
  align-self: center;
  position: absolute;
  top:  ${width * 0.05}px; 
`;

const SlideImage = styled(Image)`
   height: ${width * 0.7}px;
   width:  ${width * 0.7}px;
`;


const TextSlide1 = styled(Text)`
  align-items: center;
  top: ${width * 0.5}px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const JoinText = styled(Text)`
  top: ${width * 0.6}px;
  padding-top: ${width * 0.01}px;
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
  top: ${width * -0.01}px;
`;
const TextScreen3 = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  top: ${width * 0.1}px;
`;

const MemberText = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  top: ${width * 0.11}px;
`;

const TextScreen2Orange = styled(Text)`
  top:  ${width * 0.01}px;
  padding-top: ${width * 0.1}px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const TextScreen1Orange = styled(Text)`
  top: ${width * 0.65}px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const TextScreen3Orange = styled(Text)`
  top:  ${width * 0.3}px;
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
          <Slide1Image source={require("nlfyapp/assets/onboarding1.jpg")} />
          <TextSlide1>You Matter to God</TextSlide1>
          <TextSlide1>You Matter to Us</TextSlide1>
          <JoinText>
            Join this beautiful family to experience spiritual richness,
            healing, fellowship, community and much more
          </JoinText>
          <TextScreen1Orange>Swipe</TextScreen1Orange>
        </Slide1>
        <Slide2>
          <SlideImage source={require("nlfyapp/assets/onboarding2.png")} />
          <TextScreen2>
            Easily join this spiritual family which is not just a Sunday church
            but cares about you..
          </TextScreen2>

          <TextScreen2Orange>
            Sign Up to have a customized experience or swipe
          </TextScreen2Orange>
          <Button label="Sign Up" handleClick={navigateToSignUp} />
          <MemberText >
            Already a member?
            <TextScreen2Orange  onPress={navigateToLogin}>
              Log in
            </TextScreen2Orange>
          </MemberText>
        </Slide2>
        <Slide3>
          <SlideImage source={require("nlfyapp/assets/onboarding3.png")} />
          <TextScreen3>
            Have fellowship, listen sermons, be part of life groups, give easily
            as God leads you
          </TextScreen3>
          <TextScreen3Orange>Swipe to get started</TextScreen3Orange>
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
              component={PrayerRequestNavigation}
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
            <Tab.Screen
              name="Devotionals"
              component={Devotionals}
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
