import React, { useState, useRef, useContext, useEffect } from "react";

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
} from "react-native";
import { PrayerForm } from "../features/component/prayerRequest/prayerForm.component";
import { SuccessModalContent } from "./successModalContent.component";
import { FailureModalContent } from "./failureModalContent.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#333333",
    borderRadius: 24,
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

export const NLFModal = (props) => {
  const { user } = useContext(AuthenticationContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // initialize errorMessage state

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const handleOpenModal = () => {
    if (user === null) {
      Alert.alert("Please Login/Signup to Write Prayer");
    } else {
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
      setSuccess(false);
      setError(false);
      setErrorMessage("");
    });
  };

  const handleSuccessChange = (successValue) => {
    setSuccess(successValue);
    if (successValue) {
      setTimeout(() => {
        //setSuccess(false);
        handleCloseModal();
      }, 2000);
    }
  };

  const handleErrorChange = (errorValue) => {
    // use useCallback to memoize the function
    setError(errorValue);
    setErrorMessage(errorMessage);
    if (errorValue) {
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }
  };

  const modalTranslateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <>
      <TouchableOpacity onPress={handleOpenModal} style={styles.spacing}>
        <Text style={styles.buttonText}>Write Prayer </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleCloseModal}
            style={styles.modalOverlay}
          >
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{ translateY: modalTranslateY }],
                },
              ]}
            >
              {!success && !error && (
                <Text style={styles.modalTitle}>
                  Pray for {props.request.raisedBy}
                </Text>
              )}

              {!success && !error && (
                <PrayerForm
                  request={props.request}
                  //handleCloseModal={handleCloseModal}
                  handleSuccessChange={handleSuccessChange}
                  handleErrorChange={handleErrorChange}
                />
              )}

              {success && (
                <SuccessModalContent message="Prayer response sent succesfully" />
              )}

              {error && (
                <FailureModalContent message="Sorry, we couldnt process the request Please try after sometime." />
              )}
            </Animated.View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};
