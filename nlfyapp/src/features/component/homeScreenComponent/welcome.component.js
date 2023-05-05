import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import styled from "styled-components";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormData from "form-data";
import mime from "mime";

const { width, height } = Dimensions.get("window");

const WelcomeText = styled(Text)`
  position: absolute;
  top: 10px;
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;
const Profile = styled(View)`
  margin-left: 10px;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;
const ProfilePic = styled(Image)`
  height: 100%;
  width: 100%;
  border-radius: 20px;
`;

const ModalContainer = styled(View)`
  padding: 36px;
  height: ${height}px;
  background-color: ${(props) =>
    props.profilePicVisibleBgColor
      ? props.theme.colors.border.primary
      : props.theme.colors.bg.primary};
`;
const Heading = styled(Text)`
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text.title};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;
const Caption = styled(Text)`
  color: ${(props) => props.theme.colors.text.caption};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  line-height: ${(props) => props.theme.lineHeights.button};
  letter-spacing: ${(props) => props.theme.space[1]};
  margin-top: 8px;
`;
const RowView = styled(View)`
  flex-direction: row;
  align-self: ${(props) => (props.modalIcon ? "flex-start" : "flex-end")};
  align-items: center;
  justify-content: space-between;
  top: 8px;
`;
const ModalProfilePicContainer = styled(View)`
  align-self: center;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.border.primary};
  height: 200px;
  width: 200px;
  border-radius: 100px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;
const TouchableOpacityIcon = styled(TouchableOpacity)`
  align-self: flex-end;
  position: relative;
  bottom: ${(props) => (props.modalIcon ? "0px" : width * 0.14 + "px")};
  right: ${(props) => (props.modalIcon ? "0px" : width * 0.2 + "px")};
  margin-right: ${(props) => (props.modalIcon ? "42px" : "0px")};
`;
const FontAwesome5Icon = styled(FontAwesome5)`
  color: ${(props) => props.theme.colors.bg.primary};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 28px;
  align-self: center;
  padding: 12px;
`;
const ButtonView = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 42px;
`;
const StyledTextInput = styled(TextInput).attrs({
  selectionColor: "#D9D9D9",
  underlineColor: "transparent",
  activeUnderlineColor: "transparent",
  outlineColor: "transparent",
  activeOutlineColor: "transparent",
  placeHolderTextColor: "#676767",
})`
  margin-bottom: 42px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
  border-bottom-width: 1px;
  background-color: "transparent";
`;

export const Welcome = (props) => {
  const [userData, setUserData] = useState(null);
  const { onLogout, user, isAuthenticated } = useContext(AuthenticationContext);
  const [visible, setVisible] = useState(false);
  const [profilePicVisible, setProfilePicVisible] = useState(false);
  const [showUpdateOptions, setShowUpdateOptions] = useState(false);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(null);
  console.log("IN WELCOME", isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${BASEURL}/users/${user?.phoneNumber}`)
        // .get(`${BASEURL}/users/+916309831992`)
        .then((response) => {
          if (response.data) {
            console.log("Welcome response", response.data);
            setUserData(response.data);
            setUsername(response.data.name);
          }
        })
        .catch((err) => {
          console.log(err, "Welcome error");
          setUserData("");
        });
    }
  }, [isAuthenticated, user?.phoneNumber]);

  const navigateToSignUp = () => {
    console.log("GO TO SIGN UP");
    navigation.navigate("OnboardingStack");
    setTimeout(() => {
      hideModal();
    }, 1000);
  };
  const handleLogout = () => {
    onLogout();
    setUserData("");
    hideModal();
  };
  const showModal = () => {
    setVisible(true);
    console.log("opened modal", visible);
  };
  const hideModal = () => setVisible(false);
  const openProfilePicModal = () => {
    console.log("Heere");
    setShowUpdateOptions(true);
    setProfilePicVisible(true);
  };
  const handleNameChange = (newValue) => {
    setUsername(newValue);
    setShowUpdateOptions(true);
  };
  const onCancel = () => {
    setUsername(userData.name);
    setImage(null);
    setUserData({
      ...userData,
      name: userData.name,
      profilePic: userData.profilePic,
    });
    console.log("cancel", userData.name);
    setShowUpdateOptions(false);
  };
  const updateChange = async () => {
    setShowUpdateOptions(false);
    setUserData({ ...userData, name: username });
    console.log("updateChange called");
    const imageData = new FormData();
    imageData.append("name", username);
    if (image !== null) {
      const newImageUri = "file:///" + image.uri.split("file:/").join("");
      imageData.append("profilePic", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });
    }

    try {
      await axios
        .patch(`${BASEURL}/users/${userData._id}`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("USERS", response.data);
          if (response.data) {
            setShowUpdateOptions(false);
            setUserData(response.data);
            console.log("NAME CHANGED", response.data.name);
          }
        })
        .catch((error) => {
          setShowUpdateOptions(false);
          console.log("patch error", error);
        });
    } catch (error) {
      setShowUpdateOptions(false);
      console.log(error);
    }
  };
  const onOpenGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Gallery open", status);
    if (status !== "granted") {
      console.log(status);
      Alert.alert(
        "Gallery Sorry, we need camera roll permissions to make this work!" +
          status
      );
    }

    if (status === "granted") {
      console.log(status);
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!response.canceled) {
        setProfilePicVisible(false);
        setImage(response.assets[0]);
        setShowUpdateOptions(true);
        console.log("RESPONSE GALLERY");
      }
    }
  };
  const onOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Camera Sorry, we need camera roll permissions to make this work!" +
          status
      );
    }

    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!response.canceled) {
        setProfilePicVisible(false);
        setImage(response.assets[0].uri);
        setShowUpdateOptions(true);
        console.log("RESPONSE CAMERA", response.assets[0].uri);
      }
      console.log("Camera open", image);
    }
  };
  return (
    <>
      {visible ? (
        <Modal
          visible={visible}
          // for ios onDismiss={hideModal}
          animationType="slide"
          transparent={false}
          presentationStyle="fullScreen"
          onRequestClose={() => {
            setVisible(!visible);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => {
              setProfilePicVisible(false);
            }}
          >
            <ModalContainer profilePicVisibleBgColor={profilePicVisible}>
              <Heading>Account Settings</Heading>

              {/* {user?.isAnonymous ? ( */}
              {user === null || user?.isAnonymous ? (
                <>
                  <Caption onPress={navigateToSignUp}>Login</Caption>
                </>
              ) : (
                <>
                  <View>
                    <ModalProfilePicContainer>
                      {image !== null ? (
                        <ProfilePic source={{ uri: image.uri }} />
                      ) : (
                        <ProfilePic source={{ uri: userData?.profilePic }} />
                      )}
                    </ModalProfilePicContainer>
                    <TouchableOpacityIcon onPress={openProfilePicModal}>
                      <FontAwesome5Icon name="camera" size={28} />
                    </TouchableOpacityIcon>
                  </View>
                  <Caption>Name</Caption>
                  <StyledTextInput
                    editable={!profilePicVisible}
                    placeholder="Name"
                    value={username}
                    onChangeText={(newVal) => handleNameChange(newVal)}
                  />
                  {showUpdateOptions ? (
                    <ButtonView>
                      <Button
                        mode="contained"
                        buttonColor="#EF6C00"
                        onPress={updateChange}
                        disabled={profilePicVisible}
                      >
                        Update
                      </Button>
                      <Button
                        mode="outlined"
                        textColor="#000000"
                        onPress={onCancel}
                        disabled={profilePicVisible}
                      >
                        Cancel
                      </Button>
                    </ButtonView>
                  ) : null}
                  <Text
                    style={{ alignSelf: "flex-start" }}
                    onPress={handleLogout}
                    disabled={profilePicVisible}
                  >
                    Sign Out
                  </Text>
                </>
              )}
            </ModalContainer>
          </TouchableOpacity>
          {profilePicVisible ? (
            <View
              style={{
                backgroundColor: "white",
                width: width,
                padding: 20,
                bottom: 0,
                position: "absolute",
                elevation: 2,
              }}
            >
              <TouchableWithoutFeedback>
                <View>
                  <Heading>Profile photo</Heading>
                </View>
              </TouchableWithoutFeedback>
              <RowView modalIcon={true}>
                <TouchableOpacityIcon modalIcon={true} onPress={onOpenCamera}>
                  <FontAwesome5Icon name="camera" size={28} />
                  <Caption>Camera</Caption>
                </TouchableOpacityIcon>
                <TouchableOpacityIcon modalIcon={true} onPress={onOpenGallery}>
                  <FontAwesome5Icon name="image" size={28} />
                  <Caption>Gallery</Caption>
                </TouchableOpacityIcon>
              </RowView>
            </View>
          ) : null}
        </Modal>
      ) : null}
      <>
        <WelcomeText>Welcome {userData?.name}</WelcomeText>
        <RowView>
          {/* {user?.isAnonymous ? ( */}
          {user === null || user?.isAnonymous ? (
            <TouchableOpacity onPress={showModal}>
              <Ionicons
                name="person-circle-sharp"
                size={40}
                color="rgba(242, 105, 36, 0.6)"
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity>
                <Ionicons
                  name="notifications"
                  size={32}
                  color="rgba(242, 105, 36, 0.6)"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
              >
                <Profile>
                  <ProfilePic source={{ uri: userData?.profilePic }} />
                </Profile>
              </TouchableOpacity>
            </>
          )}
        </RowView>
      </>
    </>
  );
};
