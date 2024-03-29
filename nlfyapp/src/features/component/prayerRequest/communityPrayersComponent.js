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
  Alert,
} from "react-native";
import { Button } from "../../../components/button";
import { ExpandCollapseListCommunityPrayer } from "../../../components/expandCollapse.CommunityPrayer.component";
import { RaisePrayerForm } from "./raisePrayerForm.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
const { width } = Dimensions.get("window");

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  //padding-top: ${StatusBar.currentHeight * 0.9}px;
  padding-bottom: ${StatusBar.currentHeight * 0.1}px;
  margin-top: ${StatusBar.currentHeight - 35 || 0}px;
`;

const Container = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight * 0.9 || 0}px;
  //margin-bottom: ${StatusBar.currentHeight * 0.4 || 0}px;
`;

const ButtonView = styled(View)`
  padding-bottom: ${width * 0.01}px;
  align-items: center;
  margin-bottom: ${Platform.OS === "ios" ? `${width * 0.1}px` : "0px"};
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
        setData(response.data.reverse());

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
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Container>
            {isLoading ? (
              <Text>Loading All Prayer Requests...</Text>
            ) : (
              <ExpandCollapseListCommunityPrayer data={data} />
            )}
          </Container>
        </View>
      </SafeAreaViewWrapper>
      {user === null || user?.isAnonymous ? (
        <ButtonView>
          <Button
            label="Raise Prayer Request"
            handleClick={() =>
              Alert.alert("Kindly login/signup to Raise your Prayer Request")
            }
          />
        </ButtonView>
      ) : (
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
    paddingBottom: width * 0.16, // adding some bottom padding for the submit button
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
