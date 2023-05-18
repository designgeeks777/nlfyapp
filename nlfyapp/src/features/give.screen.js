import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";

import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const padding = width * 0.1;
const top = width * 0.05;
const marginLeft = width * 0.05;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  padding-bottom: ${padding}px; 
  top: ${top}px; 
  margin-left:  ${marginLeft}px;// margin-left: 18px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;
export const Give = () => {
  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Give" />
        </WrapperView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.message}>
              We are working on this. You will be able to give your offering/donations seamlessly once this is up !
            </Text>
            <Image
              source={require("nlfyapp/assets/Give.png")}
              style={styles.image}
            />
          </View>
        </ScrollView>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 600,
    marginTop: 20,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
};
