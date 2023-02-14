import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  videoContainer: {
    top: 320,
    position: "absolute",
    width: 360,
    height: 200,
    borderRadius: 30,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -36.5 }, { translateY: -38.5 }],
  },
});

export const SermonVideo = () => {
  return (
    <View style={styles.videoContainer}>
      <Image
        style={styles.video}
        source={require("nlfyapp/assets/blackscreen.jpg")}
      />
      <View style={styles.playButton}>
        <Ionicons name="play-circle-sharp" size={65} color="#F26924" />
      </View>
    </View>
  );
};
