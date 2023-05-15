import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
} from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  erroricon: {
    width: width * 0.1 + 2,
    height: height * 0.05 + 0.9,
    //borderRadius: 20,
    //top: Platform.OS === "ios" ? 60 : width * 0.2, // Add margin top to move the profile down a little
  },

  displaycenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export const FailureModalContent = ({ message }) => {
  return (
    <>
      <View style={styles.displaycenter}>
        <Image
          style={styles.erroricon}
          source={require("nlfyapp/assets/failure-icon.png")}
        />
        <Text>{message}</Text>
      </View>
    </>
  );
};
