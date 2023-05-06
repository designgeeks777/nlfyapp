import React, { useState, useRef, useContext } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttonView: {
    //paddingVertical: 16,
    //paddingHorizontal: 32,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#333333",
    borderRadius: 24,
    //paddingVertical: width * 0.2,
    //paddingHorizontal: 32,
  },
  buttonText: {
    color: "#008BE2",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: width * 0.05,
    minHeight: Dimensions.get("window").height * 0.6, // set the minimum height to 60% of the screen height
    paddingBottom: 25, // adding some bottom padding for the submit button
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: width * 0.05,
  },
  spacing: {
    marginTop: -width * 0.1,
    marginBottom: width * 0.1,
  },
});

export const MyPrayerResponseModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const handleOpenModal = () => {
    if (props.numberOfResponse > 0) {
      setModalVisible(true);
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const modalTranslateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <>
      <TouchableOpacity onPress={handleOpenModal} style={styles.spacing}>
        <Text style={styles.buttonText}>
          {props.numberOfResponse} Responses{" "}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            activeOpacity={1}
            // onPress={handleCloseModal}
            onPress={() => {
              if (!scrolling) {
                handleCloseModal();
              }
            }}
            style={styles.modalOverlay}
          >
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{ translateY: modalTranslateY }],
                  //height: 500, // set the height as per your requirement
                },
              ]}
            >
              <ScrollView
                onTouchStartCapture={() => setScrolling(true)}
                onTouchEndCapture={() => setScrolling(false)}
                style={{ flex: 1 }}
              >
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>

                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>

                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>

                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>

                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>

                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
                <Text>Hello world</Text>
              </ScrollView>
            </Animated.View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};
