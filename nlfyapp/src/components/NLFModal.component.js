import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
} from "react-native";
import { PrayerForm } from "../features/component/prayerRequest/prayerForm.component";
import { SuccessModalContent } from "./successModalContent.component";

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
  const [modalVisible, setModalVisible] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSuccessChange = (successValue) => {
    setSuccess(successValue);
    if (successValue) {
      setTimeout(() => {
        //setSuccess(false);
        handleCloseModal();
      }, 2000);
    }
  };
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const handleOpenModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSuccess(false); // reset the success state
    });
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
                height: 500, // set the height as per your requirement
              },
            ]}
          >
            {!success && (
              <Text style={styles.modalTitle}>
                Pray for {props.request.raisedBy}
              </Text>
            )}

            {!success && (
              <PrayerForm
                request={props.request}
                //handleCloseModal={handleCloseModal}
                handleSuccessChange={handleSuccessChange}
              />
            )}
            {success && (
              <SuccessModalContent message="Prayer response sent succesfully" />
            )}
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
