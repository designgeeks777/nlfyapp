import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert, Dimensions, Image, TouchableOpacity, View } from "react-native";
import {
  Modal,
  Portal,
  Text,
  Provider,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { Button } from "../components/button";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import axios from "axios";
import { BASEURL } from "../../APIKey";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import mime from "mime";
import { SecondaryButton } from "../components/secondaryButton.component";

const { width } = Dimensions.get("window");

const ContainerView = styled(SafeAreaView)`
  margin-left: ${width * 0.1}px;
  margin-right: ${width * 0.1}px;
  margin-bottom: ${width * 0.4}px;
  flex: 1;
  justify-content: space-around;
`;

const Heading = styled(Text)`
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
`;

const ProfilePicContainer = styled(View)`
  align-self: center;
  border-width: ${width * 0.001}px;
  border-color: ${(props) => props.theme.colors.border.primary};
  height: ${width * 0.5}px;
  width: ${width * 0.5}px;
  border-radius: ${width * 0.9}px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const ProfilePic = styled(Image)`
  height: ${width * 0.6}px;
  width: ${width * 0.6}px;
  border-radius: ${width * 0.5}px;
`;

const OptionsContainer = styled(View)`
  align-items: center;
  bottom: ${width * 0.1}px;
`;

const ModalHeading = styled(Text)`
  color: ${(props) => props.theme.colors.text.caption};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.bodylarge};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  margin-bottom: ${width * 0.05}px;
`;

const TouchableOpacityIcon = styled(TouchableOpacity)`
  margin-right: ${(props) => (props.modalIcon ? "42px" : "0px")};
  align-self: flex-end;
  position: relative;
  bottom: ${(props) => (props.modalIcon ? "0px" : width * 0.14 + "px")};
  right: ${(props) => (props.modalIcon ? "0px" : width * 0.2 + "px")};
`;

const FontAwesome5Icon = styled(FontAwesome5)`
  color: ${(props) =>
    props.modalIcon
      ? props.theme.colors.bg.primary
      : props.theme.colors.bg.primary};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${width * 0.1}px;
  align-self: center;
  padding: ${width * 0.03}px;
`;

const ModalIconCaption = styled(Text)`
  color: ${(props) => props.theme.colors.text.caption};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  line-height: ${(props) => props.theme.lineHeights.button};
  letter-spacing: ${(props) => props.theme.space[1]};
  text-align: center;
`;

const RowView = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
`;

const SkipForNow = styled(Text)`
  top: ${width * 0.09}px;
  color: ${(props) => props.theme.colors.text.title};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const UploadPicSignUp = (props) => {
  const {
    user,
    setRegistered,
    isDataPostInLocalAPICompleted,
    isLoading,
    setIsLoading,
  } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  console.log("In UPLOAD PIC");
  const userName = props?.route?.params?.userName
    ? props.route.params.userName
    : "User";
  const gender = props?.route?.params?.gender
    ? props.route.params.gender
    : "male";
  const maleDefaultProfilePic = require("nlfyapp/assets/upload-pic-sign-up-male.png");
  const femaleDefaultProfilePic = require("nlfyapp/assets/upload-pic-sign-up-female.png");
  let icon =
    gender === "male" ? maleDefaultProfilePic : femaleDefaultProfilePic;
  const [image, setImage] = useState(null);

  const onRegisterUser = async (def) => {
    setIsLoading(true);
    const imageData = new FormData();
    imageData.append("uid", user.uid);
    imageData.append("name", userName);
    imageData.append("gender", gender);
    imageData.append("mobileNumber", user.phoneNumber);

    if (def === "Def") {
      const postbody = {
        uid: user.uid,
        name: userName,
        gender: gender,
        mobileNumber: user.phoneNumber,
      };
      await axios
        .post(`${BASEURL}users/default`, postbody)
        .then((response) => {
          console.log("USERS", response.data);
          if (response.data) {
            console.log("INSIDE POST", response.data);

            const HomeStackModalNavigator = navigation.getId();

            console.log("Home Stack Modal Navigator", HomeStackModalNavigator);

            if (HomeStackModalNavigator === "HomeStackModal") {
              isDataPostInLocalAPICompleted(true);
              setRegistered(true);
              setIsLoading(false);
              navigation.navigate("HomeStack");
            } else {
              setRegistered(true);
              setIsLoading(false);
              navigation.navigate("Home");
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("POST error", error);
        });
    } else {
      const newImageUri = "file:///" + image.split("file:/").join("");
      imageData.append("profilePic", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });

      await axios
        .post(`${BASEURL}users`, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("USERS", response.data);
          if (response.data) {
            console.log("INSIDE POST", response.data);

            const HomeStackModalNavigator = navigation.getId();

            console.log("Home Stack Modal Navigator", HomeStackModalNavigator);

            if (HomeStackModalNavigator === "HomeStackModal") {
              //onSetUserData();
              isDataPostInLocalAPICompleted(true);
              setRegistered(true);
              setIsLoading(false);
              navigation.navigate("HomeStack");
            } else {
              //onSetUserData();
              setRegistered(true);
              setIsLoading(false);
              navigation.navigate("Home");
            }

            //navigation.navigate("Home");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("POST error", error);
        });
    }

    console.log("imageData", imageData);
  };

  const onOpenGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Gallery open", status);
    if (status !== "granted") {
      console.log(status);
      Alert.alert("Sorry, we need camera permissions to make this work!");
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
        hideModal();
        setImage(response.assets[0].uri);
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
        hideModal();
        setImage(response.assets[0].uri);
        console.log("RESPONSE CAMERA", response.assets[0].uri);
      }
      console.log("Camera open", image);
    }
  };
  const onPressSkipForNow = () => {
    onRegisterUser("Def");
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    //padding: width * 0.02,
    position: "absolute",
    bottom: 0,
    width: width,
  };
  if (isLoading) {
    // Render a loading state while navigating to Home
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator color="#F26924" />
      </SafeAreaView>
    );
  }
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View>
            <ModalHeading>Profile photo</ModalHeading>
          </View>
          <RowView>
            <TouchableOpacityIcon modalIcon={true} onPress={onOpenCamera}>
              <FontAwesome5Icon
                modalIcon={true}
                name="camera"
                size={width * 0.06}
              />
              <ModalIconCaption>Camera</ModalIconCaption>
            </TouchableOpacityIcon>
            <TouchableOpacityIcon modalIcon={true} onPress={onOpenGallery}>
              <FontAwesome5Icon
                modalIcon={true}
                name="image"
                size={width * 0.06}
              />
              <ModalIconCaption>Gallery</ModalIconCaption>
            </TouchableOpacityIcon>
          </RowView>
        </Modal>
      </Portal>
      <ContainerView>
        <Heading>One last step</Heading>
        <Caption>
          Having a face to your profile can give you an entire different
          experience.
        </Caption>
        <View>
          <ProfilePicContainer>
            {image !== null ? (
              <ProfilePic source={{ uri: image }} />
            ) : (
              <ProfilePic source={icon} />
            )}
          </ProfilePicContainer>
          <TouchableOpacityIcon onPress={showModal}>
            <FontAwesome5Icon name="camera" size={width * 0.06} />
          </TouchableOpacityIcon>
        </View>
        <OptionsContainer>
          <Button
            label="Upload Profile Pic"
            handleClick={onRegisterUser}
            disabled={image === null}
          />
          <View style={{ margin: width * 0.004 }}>
            <SecondaryButton
              label=" Skip for now"
              handleClick={onPressSkipForNow}
            />
          </View>
        </OptionsContainer>
      </ContainerView>
    </Provider>
  );
};
