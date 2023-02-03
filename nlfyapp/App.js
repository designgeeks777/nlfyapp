import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Pressable,
} from "react-native";
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
  image2: {
    height: 250,
    width: 250,
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
  textscreen2: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "medium",
  },
  textscreen2orange: {
    color: "#EF6C00",
    fontSize: 14,
    fontWeight: "medium",
    top: 20,
    paddingTop: 16,
  },
  button: {
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    backgroundColor: "#EF6C00",
    top: 50,
    width: 320,
    height: 56,
  },
  textbutton: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
        <Image
          style={styles.image2}
          source={require("./assets/onboarding2.jpg")}
        />
        <Text style={styles.textscreen2}>
          Easily join this spiritual family which is not just a Sunday church
          but cares about you..
        </Text>

        <Text style={styles.textscreen2orange}>
          Sign Up to have a customized experience or swipe
        </Text>
        <Pressable style={styles.button}>
          <Text style={styles.textbutton}>Sign Up</Text>
        </Pressable>
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  );
};

export default App;
