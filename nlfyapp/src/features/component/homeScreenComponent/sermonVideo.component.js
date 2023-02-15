import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  videoContainer: {
    top: 40,
    width: 360,
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
