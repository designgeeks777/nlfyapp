import React from "react";
import { Text, SafeAreaView, StyleSheet, View, Image } from "react-native";
import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 500,
    width: 500,
    alignSelf: "center",
    position: "absolute",
    top: 0,
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },
  textslide1: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "semibold",
    alignItems: "center",
    top: 180,
  },
  textslide2: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "medium",
    top: 190,
    paddingTop: 16,
  },
});

const App = () => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} activeDotColor="red">
      <View style={styles.slide1}>
        <Image
          style={styles.image}
          source={require("./assets/onboarding1.jpg")}
        />
        <Text style={styles.textslide1}>You Matter to God</Text>
        <Text style={styles.textslide1}>You Matter to Us</Text>
        <Text style={styles.textslide2}>
          Join this beautiful family to experience spiritual richness, healing,
          fellowship, community and much more
        </Text>
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  );
};

export default App;
