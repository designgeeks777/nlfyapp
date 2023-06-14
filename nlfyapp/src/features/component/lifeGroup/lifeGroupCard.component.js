import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  Alert,
} from "react-native";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { Divider } from "../../../components/divider.component";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import styled from "styled-components";
import { JoinButton } from "./joinButton.component";

const { width } = Dimensions.get("window");
const padding = width;

const ViewLifeGroupCard = styled(SafeAreaView)`
padding: ${padding * 0.04}px; 
`;

const LifeGroupName = styled(Text)`
  padding-top: ${padding * 0.04}px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  padding-bottom: ${padding * 0.01}px; 
`;

const LifeGroupLeaders = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  padding-bottom: ${padding * 0.01}px;
`;

const LifeGroupMeetingTime = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  padding-bottom:${padding * 0.05}px;
`;

const FlexView = styled(View)`
  flex-direction: row;
`;

const LeftContent = styled(View)`
  width: ${width * 0.58}px;
`;

const LeadersWillContactView = styled(View)`
  flex-direction: column;
  top: ${width * 0.08}px;
`;

const LeadersText = styled(Text)`
  color: ${(props) => props.color || props.theme.colors.text.success};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  text-align: center;
`;

// Animation added for Blinking text for "Our Leaders will contact you shortly"
const BlinkingText = ({ children }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  });

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
};

const BlinkingLeadersText = ({ children, color }) => (
  <BlinkingText>
    <LeadersText color={color}>{children}</LeadersText>
  </BlinkingText>
);

const LifeGroupItem = ({ lifeGroup, user, setIsApiResponseSuccessful }) => {
  const [isJoinButtonVisible, setIsJoinButtonVisible] = useState(true);
  let isButtonVisible = true;
  let isMember = false;

  //chekk if the user already exists in the joining requests,join button shouldnt apppear for them
  if (lifeGroup.joiningRequests.find((request) => request.uid === user.uid)) {
    isButtonVisible = false;
  }

  //check if the user already exists in the members list,join button shouldnt apppear for them
  if (lifeGroup.members.find((request) => request.uid === user.uid)) {
    isButtonVisible = false;
    isMember = true;
  }

  const joinLifeGroup = () => {
    let userDetails = {};

    const url = `${BASEURL}users/${user.uid}`;
    axios
      .get(url)
      .then((response) => {
        //set the userDetails for joiningRequest

        userDetails = {
          uid: response.data.uid,
          name: response.data.name,
          mobileNumber: response.data.mobileNumber,
          accepted: "false",
        };

        //Create the update Body for joining Request
        let joiningRequests = lifeGroup.joiningRequests;
        joiningRequests.push(userDetails);

        //Call lifegroup API to update the joiningRequests body

        const lifeGroupUrl = `${BASEURL}lifeGroups/${lifeGroup._id}`;
        const updateBody = { joiningRequests };

        axios
          .patch(lifeGroupUrl, updateBody)
          .then((apiresponse) => {
            setIsApiResponseSuccessful(apiresponse.status === 200);
            Alert.alert(
              "Joining request sent successfully.",
              "Our leaders will connect with you shortly."
            );
            setIsJoinButtonVisible(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <FlexView>
        <LeftContent>
          <LifeGroupName>{lifeGroup.place}</LifeGroupName>
          <LifeGroupLeaders>Leaders: {lifeGroup.leaders}</LifeGroupLeaders>
          <LifeGroupMeetingTime>{lifeGroup.meetingDay}</LifeGroupMeetingTime>
        </LeftContent>

        {isJoinButtonVisible && isButtonVisible && (
          <View>
            <JoinButton label="Join" handleClick={joinLifeGroup} />
          </View>
        )}

        {!isButtonVisible && !isMember && (
          <LeadersWillContactView>
            <BlinkingLeadersText color="green">
              Our leaders will
            </BlinkingLeadersText>
            <BlinkingLeadersText color="green">
              contact you shortly
            </BlinkingLeadersText>
          </LeadersWillContactView>
        )}

        {isMember && (
          <>
            <LeadersWillContactView>
              <LeadersText>You are part of the</LeadersText>
              <LeadersText> group </LeadersText>
            </LeadersWillContactView>
          </>
        )}
      </FlexView>
      <Divider />
    </>
  );
};

export const LifeGroupCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isApiResponseSuccessful, setIsApiResponseSuccessful] = useState(false);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${BASEURL}lifeGroups/`;
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
  }, []);

  return (
    <>
      <ViewLifeGroupCard>
        {isLoading ? (
          <Text>Loading lifeGroups...</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <LifeGroupItem
                lifeGroup={item}
                user={user}
                setIsApiResponseSuccessful={setIsApiResponseSuccessful}
              />
            )}
            initialNumToRender={data.length}
            contentContainerStyle={{ paddingBottom: width * 0.01 }}
          />
        )}
      </ViewLifeGroupCard>
    </>
  );
};
