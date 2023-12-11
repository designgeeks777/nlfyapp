
import React, { useCallback, useState, useEffect, useContext } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BASEURL } from "../../APIKey";
import { Button, Card, Paragraph } from "react-native-paper";
import { NLFModal } from "./NLFModal.component";
import styled from "styled-components";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const { height, width } = Dimensions.get("window");
 
const Item = React.memo((props) => {
  const { position, item, user, userList } = props;

  const getUserProfilePic = () => {
    const foundUser = userList.find((u) => u.uid === item.raisedByUid);
    
    if (foundUser) {
      return foundUser.profilePic
        ? { uri: foundUser.profilePic }
        : foundUser.gender === "male"
        ? require("nlfyapp/assets/upload-pic-sign-up-male.png")
        : require("nlfyapp/assets/upload-pic-sign-up-female.png");
    }

    return require("nlfyapp/assets/upload-pic-sign-up-male.png");
  };

  const [requestTextShown, setRequestTextShown] = useState(false);
  const [requestLengthMore, setRequestLengthMore] = useState(false);

  const toggleRequestNumberOfLines = () => {
    props.onSelect(props.id);
    setRequestTextShown(!requestTextShown);
  };

  const onTextLayout = useCallback((e) => {
    setRequestLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  const cardStyle = {
    width: width * 0.74,
    backgroundColor: "rgba(242, 105, 36, 0.3)",
    shadowColor: "transparent",
    borderRadius: width * 0.07,
    marginBottom: height * 0.05,
  };

  const containerStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: height * 0.01,
  };

  const nameStyle = {
    textAlign: "center",
    width: 100,
  };
  const textStyle = {
    lineHeight: 16,
    textAlign: "left",
    padding: width * 0.02,
    bottom: width * 0.02,
  };

  const setFlex = {
    padding: 20,
    paddingBottom: 0,
    flex: 1,
    flexDirection: position === "left" ? "row" : "row-reverse",
  };

  const writeprayer = {
    marginLeft: position === "left" ? width * 0.1 : width * 0.1,
    flexDirection: position === "left" ? "row-reverse" : "row",
  };

  const styles = StyleSheet.create({
    profilePicture: {
      width: width * 0.1,
      height: height * 0.06,
      borderRadius: 20,
    },
  });

  return (
    <>
      <View style={setFlex}>
        <View style={containerStyle}>
          <Image style={styles.profilePicture} source={getUserProfilePic()} />
          <Text style={nameStyle} accessibilityLabel={props.item.raisedBy}>
            {props.item.raisedBy}
          </Text>
        </View>

        <Card style={cardStyle}>
          <Card.Content>
            <Paragraph
              onTextLayout={onTextLayout}
              numberOfLines={requestTextShown && props.selected ? undefined : 3}
              style={textStyle}
              accessibilityLabel={props.item.requestMessage}
            >
              {props.item.requestMessage}
            </Paragraph>
          </Card.Content>
          {requestLengthMore ? (
            <Card.Actions
              style={{ justifyContent: "flex-end", marginTop: -25 }}
            >
              <Button
                mode="text"
                icon={props.selected ? "chevron-up" : "chevron-down"}
                onPress={toggleRequestNumberOfLines}
                labelStyle={{ color: "#46458C", fontWeight: "normal" }}
              >
                {requestTextShown && props.selected ? "collapse" : "expand"}
              </Button>
            </Card.Actions>
          ) : null}
        </Card>
      </View>

      <View style={writeprayer} accessibilityLabel="Tap me to Write a Prayer">
        <NLFModal request={props.item} />
      </View>
    </>
  );
});

export const ExpandCollapseListCommunityPrayer = (props) => {
  const { user } = useContext(AuthenticationContext);
  const [selectedId, setSelectedId] = useState(null);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers(); // Call the fetchUsers function on component mount
  }, []);

  const fetchUsers = async () => {
    try {
      const url = `${BASEURL}users`;
      const response = await fetch(url);
      const userdata = await response.json();
      setUserList(userdata); // Set the fetched user data in the state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const renderItem = ({ item, index }) => {
    const position = index % 2 === 0 ? "left" : "right";
    return (
      <Item
        data={props.data}
        id={item._id}
        position={position}
        item={item}
        selected={selectedId === item._id}
        onSelect={onSelectItem}
        user={user}
        userList={userList}
      />
    );
  };

  const onSelectItem = (id) => {
    if (id === selectedId) {
      return setSelectedId(null);
    }
    setSelectedId(id);
  };

  return (
    <FlatList
      removeClippedSubviews={false}
      data={props.data}
      initialNumToRender={props.data.length}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ paddingBottom: width * 0.01 }}
      extraData={selectedId}
      showsVerticalScrollIndicator={false}
      accessibilityLabel="All Community Prayers"
    />
  );
};
