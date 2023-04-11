import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import styled from "styled-components";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

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
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

const ModalContainer = styled(View)`
  padding: 52px;
  height: ${height}px;
  background-color: ${(props) => props.theme.colors.bg.primary};
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
  margin-bottom: 12px;
  margin-top: 20px;
`;
const RowView = styled(View)`
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;
  top: 8px;
`;
export const Welcome = (props) => {
  const [userData, setUserData] = useState(null);
  const { onLogout, user, isAuthenticated } = useContext(AuthenticationContext);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  console.log("IN WELCOME", isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${BASEURL}/users/${user?.phoneNumber}`)
        .then((response) => {
          if (response.data) {
            console.log("Welcome response", response.data);
            setUserData(response.data);
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
    hideModal();
  };
  const handleLogout = () => {
    onLogout();
    hideModal();
  };
  const showModal = () => {
    console.log("opened modal");
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  return (
    <>
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
        <ModalContainer>
          <Heading>Account Settings</Heading>

          {user === null || user?.isAnonymous ? (
            <Caption onPress={navigateToSignUp}> Login</Caption>
          ) : (
            <>
              <Caption>Name</Caption>
              <TextInput placeholder="Name" value={userData?.name} />
              <Caption>Mobile Number</Caption>
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                placeholder="+9199999990"
                value={userData?.mobileNumber}
              />
              <Caption></Caption>
              <TouchableOpacity onPress={handleLogout}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
            </>
          )}
        </ModalContainer>
      </Modal>
      <>
        <WelcomeText>Welcome {userData?.name}</WelcomeText>
        <RowView>
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
              <TouchableOpacity onPress={showModal}>
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
