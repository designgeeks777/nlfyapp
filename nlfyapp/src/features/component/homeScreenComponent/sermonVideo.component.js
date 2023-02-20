import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  videoContainer: {
    top: 40,
    width: 360,
    height: 200,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  playButton: {
    alignSelf: "center",
    position: "absolute",
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
