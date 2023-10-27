import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Linking,
} from "react-native";

import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";
import { Button } from "../components/button";

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
  margin-left: ${marginLeft}px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  justify-content: flex-start;
`;

export const Give = () => {
  const openWebsite = () => {
    Linking.openURL("https://nlfyelahanka.com/give");
  };
  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Give" />
        </WrapperView>

        <View style={styles.container}>
          <Text style={styles.text}>
            The Bible encourages us to be generous with others as we are able
            and willing within our possessions and hearts. {""}
            <Text style={styles.boldText}>
              "Each one must give as he has decided in his heart, not
              reluctantly or under compulsion, for God loves a cheerful giver."
              (2 Corinthians 9:7)
            </Text>
          </Text>
          <Image
            source={require("nlfyapp/assets/Give.png")}
            style={styles.image}
          />
          <Button label="Proceed" handleClick={openWebsite} />
        </View>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  image: {
    width: 360,
    height: 290,
  },
};
