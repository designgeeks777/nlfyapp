import React, { useContext, useEffect, useState, useRef } from "react";
import { ExpandCollapseList } from "../components/expandCollapse.component";
import { BackButton } from "../components/backButton";
import {
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import styled from "styled-components/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { AuthenticationContext } from "../services/authentication/authentication.context";

import { adminPhones } from "../../APIKey";

import { Button } from "../components/button";
import { RaiseDevotionalForm } from "./component/devotionals/raiseDevotionalForm.component";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const padding = width * 0.1;
const top = width * 0.05;
const marginLeft = width * 0.05;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  padding-bottom: ${padding * 0.2}px;
  top: ${top}px;
  margin-left: ${marginLeft}px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

const ButtonView = styled(View)`
  padding-bottom: ${padding * 0.9}px;
  align-items: center;
`;

export const Devotionals = () => {
  const { user } = useContext(AuthenticationContext);
  //const adminPhones = process.env.REACT_APP_ADMIN_PHONES.split(",");
  useEffect(() => {
    if (user) {
      console.log("User phoneNumber", user.phoneNumber);
    }
  }, [user]);

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
  const handleClick = () => {
    setModalVisible(true);
    handleOpenModal();
  };

  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Devotionals" />
        </WrapperView>
        <ExpandCollapseList screenName="devotionals" />
        {user === null || user?.isAnonymous ? null : adminPhones.includes(
            user.phoneNumber
          ) ? (
          <ButtonView>
            <Button label="Share devotional" handleClick={handleClick} />
          </ButtonView>
        ) : null}
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
                <RaiseDevotionalForm
                  handleSuccessChange={handleSuccessChange}
                />
              </Animated.View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: width * 0.07,
    borderTopRightRadius: width * 0.07,
    padding: width * 0.08,
    minHeight: Dimensions.get("window").height * 0.58, // set the minimum height to 60% of the screen height
    paddingBottom: width * 0.001, // adding some bottom padding for the submit button
  },
});
