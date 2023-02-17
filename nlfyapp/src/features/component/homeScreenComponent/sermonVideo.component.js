import React from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const containerWidth = width * 0.9;

const styles = StyleSheet.create({
  videoContainer: {
    top: 40,
    width: containerWidth,
    height: 200,
    borderRadius: 30,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
});

export const SermonVideo = () => {
  return (
    <View style={styles.videoContainer}>
      <Image
        style={styles.video}
        source={require("nlfyapp/assets/blackscreen.jpg")}
      />
    </View>
  );
};
