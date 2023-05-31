import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Paragraph } from "react-native-paper";

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
    borderRadius:width * 0.06,
    marginBottom: width * 0.06,
  };

  const textStyle = {
    lineHeight:width * 0.045,
    textAlign: "left",
    padding: width * 0.02,
    bottom: width * 0.02,
  };

  const setFlex = {
    flex: 1,
    justifyContent: "center",
  };

  const prayerResponse = {
    marginRight: width * 0.08,
    marginTop: width * 0.04,
  };

  const spacing = {
    marginTop: -width * 0.1,
    marginBottom: width * 0.1,
  };

  const buttonText = {
    color: "#008BE2",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  };

  const navigation = useNavigation();
  const navigateToResponses = () => {
    console.log("item.responses in expand collapse", item.responses);
    navigation.navigate("PrayerResponse", { responses: item.responses });
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
                labelStyle={{ color: "black" , fontWeight: "normal" }}
              >
                {requestTextShown && props.selected ? "collapse" : "expand"}
              </Button>
            </Card.Actions>
          ) : null}
        </Card>
      </View>
      <View style={prayerResponse}>
        <TouchableOpacity onPress={navigateToResponses} style={spacing}>
          <Text style={buttonText}>{numberOfResponse} Responses </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export const ExpandCollapseListMyPrayers = (props) => {
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

  return (
    <View>
      <FlatList
        data={props.data}
        initialNumToRender={props.data.length}
        contentContainerStyle={{ paddingBottom: width * 0.01 }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
