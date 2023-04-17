import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { BackButton } from "../components/backButton";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { ExpandCollapseList } from "../components/expandCollapse.component";
import { RaiseStoryForm } from "./component/stories/raiseStoryForm.component";
import { Button } from "../components/button";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  top: 20px;
  margin-left: 10px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  justify-content: flex-start;
`;

const ButtonView = styled(View)`
  padding-bottom: 30px;
  align-items: center;
`;

export const Stories = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthenticationContext);

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
          <BackButton text="Stories" />
        </WrapperView>
        <ExpandCollapseList screenName="stories" />
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
      {user === null || user?.isAnonymous ? null : (
        <ButtonView>
          <Button label="Raise Story Request" handleClick={handleClick} />
        </ButtonView>
      )}
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
            <RaiseStoryForm
              handleSuccessChange={handleSuccessChange}
              user={user}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#333333",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
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
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  spacing: {
    marginTop: -40,
    marginBottom: 40,
  },
});
