//supports both Android and IOS devices
import React, { useCallback, useState } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";

import { Button, Card, Paragraph } from "react-native-paper";

import { MyPrayerResponseModal } from "./MyPrayerResponseModal.component";

const { height, width } = Dimensions.get("window");

const Item = (props) => {
  const { item, numberOfResponse } = props;

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
    width: width * 0.9,
    backgroundColor: "rgba(242, 105, 36, 0.3)",

    marginLeft: width * 0.04,
    marginRight: width * 0.04,

    shadowColor: "transparent",
    borderRadius: 30,
    marginBottom: width * 0.06,
  };

  const textStyle = {
    lineHeight: 16,
    textAlign: "left",
    padding: 5,
    bottom: 5,
  };

  const setFlex = {
    flex: 1,
    justifyContent: "center",
  };

  const prayerResponse = {
    marginRight: width * 0.08,
    marginTop: width * 0.04,
  };

  return (
    <>
      <View style={setFlex}>
        <Card style={cardStyle}>
          <Card.Content>
            <Paragraph
              onTextLayout={onTextLayout}
              numberOfLines={requestTextShown && props.selected ? undefined : 3}
              style={textStyle}
            >
              {item.requestMessage}
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
      <View style={prayerResponse}>
        <MyPrayerResponseModal
          request={props.item}
          numberOfResponse={numberOfResponse}
        />
      </View>
    </>
  );
};

export const ExpandCollapseList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index, data }) => {
    //const position = index % 2 === 0 ? "left" : "right";
    const numberOfResponse = item.responses.length;

    return (
      <Item
        data={data}
        id={item._id}
        item={item}
        selected={selectedId === item._id}
        onSelect={onSelectItem}
        numberOfResponse={numberOfResponse}
      />
    );
  };

  const onSelectItem = (id) => {
    if (id === selectedId) {
      return setSelectedId(null);
    }
    setSelectedId(id);
  };

  const styles = StyleSheet.create({
    profilePicture: {
      width: width * 0.1,
      height: height * 0.06,
      borderRadius: 20,
      //top: Platform.OS === "ios" ? 60 : width * 0.2, // Add margin top to move the profile down a little
    },
    flatlistWrapper: {
      flex: 1,
      position: "absolute",
      bottom: 0,
      height: height * 0.64,
      overflow: "scroll",
    },
    containerStyle: {
      marginTop: width * 0.05,
    },
  });

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={props.data}
        initialNumToRender={props.data.length}
        contentContainerStyle={{ paddingBottom: 150 }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
