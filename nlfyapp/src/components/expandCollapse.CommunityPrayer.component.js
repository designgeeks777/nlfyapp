//supports both Android and IOS devices
import React, { useCallback, useState, useRef } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
} from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import { PrayerForm } from "../features/component/prayerRequest/prayerForm.component";
import { NLFModal } from "./NLFModal.component";
import styled from "styled-components";

const { height, width } = Dimensions.get("window");

const FlexRow = styled(View)`
  flex-direction: ;
`;

const Item = (props) => {
  const { data, id, position } = props;

  const [requestTextShown, setRequestTextShown] = useState(false);
  const [requestLengthMore, setRequestLengthMore] = useState(false);

  const slideAnimation = useRef(new Animated.Value(0)).current;

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
    //alignSelf: props.position === "left" ? "flex-end" : "flex-start",
    marginLeft: props.position === "left" ? width * 0.02 : 0,
    //marginRight: props.position === "left" ? width * 0.05 : 0,
    shadowColor: "transparent",
    borderRadius: 30,
    marginBottom: height * 0.05,
  };

  const containerStyle = {
    flexDirection: props.position === "left" ? "row" : "row-reverse",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 0 : height * 0.06,
    marginLeft: width * 0.04,
    marginRight: width * 0.04, // align profile and name side by side to the requestmessage
    //marginTop: Platform.OS === "ios" ? 0 : 80, // add top margin for android devices
    //marginTop: Platform.OS === "ios" ? 0 : height * 0.04,
  };

  const nameStyle = {
    marginRight: props.position === "left" ? 0 : -40,
    marginLeft: props.position === "left" ? -40 : 0,
    top: width * 0.1, // Add margin top to move the name down a little
  };
  const textStyle = {
    lineHeight: 16,
    textAlign: "left",
    padding: 5,
    bottom: 5,
  };

  const setFlex = {
    flexDirection: props.position === "left" ? "row" : "row-reverse",
  };

  //marginRight: props.position === "left" ? 0 : -40,
  //marginLeft: props.position === "left" ? width * 0.1 : width * 0.09,
  //flexDirection: props.position === "left" ? "row-reverse" : "row",
  const writeprayer = {
    marginLeft: position === "left" ? width * 0.1 : width * 0.09,
    flexDirection: position === "left" ? "row-reverse" : "row",
  };

  const styles = StyleSheet.create({
    profilePicture: {
      width: width * 0.1,
      height: height * 0.06,
      borderRadius: 20,
      //top: Platform.OS === "ios" ? 60 : width * 0.2, // Add margin top to move the profile down a little
    },
  });

  return (
    <>
      <View style={setFlex}>
        <View style={containerStyle}>
          <Image
            style={styles.profilePicture}
            source={require("nlfyapp/assets/profile1.jpg")}
          />
          <Text style={nameStyle}>{props.item.raisedBy}</Text>
        </View>

        <Card style={cardStyle}>
          <Card.Content>
            <Paragraph
              onTextLayout={onTextLayout}
              numberOfLines={requestTextShown && props.selected ? undefined : 3}
              style={textStyle}
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
              >
                {requestTextShown && props.selected ? "collapse" : "expand"}
              </Button>
            </Card.Actions>
          ) : null}
        </Card>
      </View>

      <View style={writeprayer}>
        <NLFModal request={props.item} />
      </View>
    </>
  );
};

export const ExpandCollapseList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index }) => {
    const position = index % 2 === 0 ? "left" : "right";
    return (
      <Item
        data={props.data}
        id={item._id}
        position={position}
        item={item}
        selected={selectedId === item._id}
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
      data={props.data}
      initialNumToRender={props.data.length}
      contentContainerStyle={{ paddingBottom: 150 }}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      extraData={selectedId}
    />
  );
};
