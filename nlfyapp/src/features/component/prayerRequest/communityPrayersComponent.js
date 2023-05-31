import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { Button } from "../../../components/button";
import { ExpandCollapseListCommunityPrayer } from "../../../components/expandCollapse.CommunityPrayer.component";
import { RaisePrayerForm } from "./raisePrayerForm.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
const { width } = Dimensions.get("window");

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  padding-top: ${StatusBar.currentHeight}px;
  margin-top: ${StatusBar.currentHeight - 35 || 0}px;
  justify-content: center;
  align-items: center;
`;

const ButtonView = styled(View)`
  padding-bottom:${width * 0.08}px;  
  align-items: center;
`;

export const CommunityPrayers = () => {
  const url = `${BASEURL}prayerRequests`;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled");
        } else {
          console.error(error);
        }
      }
    };

    loadData();

    const intervalId = setInterval(loadData, 60000);

    return () => {
      clearInterval(intervalId);
      source.cancel("Component unmounted");
    };
  }, [url]);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthenticationContext);
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

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
      setErr(false);
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
    setErr(errorValue);
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
  const handleClick = () => {
    setModalVisible(true);
    handleOpenModal();
  };
  return (
    <>
      <SafeAreaViewWrapper>
        {isLoading ? (
          <Text>Loading All Prayer Requests...</Text>
        ) : (
          <ExpandCollapseListCommunityPrayer data={data} />
        )}
      </SafeAreaViewWrapper>
      {user === null || user?.isAnonymous ? null : (
        <ButtonView>
          <Button label="Raise Prayer Request" handleClick={handleClick} />
        </ButtonView>
      )}

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
              <RaisePrayerForm
                handleSuccessChange={handleSuccessChange}
                handleErrorChange={handleErrorChange}
                user={user}
              />
            </Animated.View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

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
