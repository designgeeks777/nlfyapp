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
} from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import { PrayerForm } from "../features/component/prayerRequest/prayerForm.component";
import { NLFModal } from "./NLFModal.component";

const Item = (props) => {
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
    width: "70%",
    backgroundColor: "rgba(242, 105, 36, 0.3)",
    alignSelf: props.position === "left" ? "flex-end" : "flex-start",
    marginLeft: props.position === "left" ? 0 : 10,
    marginRight: props.position === "left" ? 10 : 0,
    shadowColor: "transparent",
    borderRadius: 30,
  };

  const containerStyle = {
    flexDirection: props.position === "left" ? "row" : "row-reverse",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: props.position === "left" ? 30 : 30, // align profile and name side by side to the requestmessage
    marginTop: Platform.OS === "ios" ? 0 : 10, // add top margin for android devices
  };

  const nameStyle = {
    marginRight: props.position === "left" ? 0 : -40,
    marginLeft: props.position === "left" ? -40 : 0,
    top: Platform.OS === "ios" ? 95 : 85, // Add margin top to move the name down a little
  };
  const textStyle = {
    lineHeight: 16,
    textAlign: "left",
    padding: 5,
    bottom: 5,
  };

  const styles = StyleSheet.create({
    profilePicture: {
      width: 45,
      height: 45,
      borderRadius: 30,
      top: Platform.OS === "ios" ? 60 : 70, // Add margin top to move the profile down a little
    },
  });

  return (
    <>
      <View style={containerStyle}>
        <Image
          style={styles.profilePicture}
          source="nlfyapp/assets/profile1.jpg"
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
          <Card.Actions style={{ justifyContent: "flex-end", marginTop: -25 }}>
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
      <NLFModal />
    </>
  );
};

export const ExpandCollapseList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index }) => {
    const position = index % 2 === 0 ? "left" : "right";
    return (
      <Item
        item={item}
        selected={selectedId === item._id}
        onSelect={onSelectItem}
        id={item._id}
        position={position}
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
