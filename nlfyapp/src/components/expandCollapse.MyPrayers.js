//=========expandCollapse.MyPrayers.js

import React, { useCallback, useState } from "react";
import { Text, FlatList, View, Dimensions } from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";
import styled from "styled-components";
import { NLFModal } from "./NLFModal.component";
const { height, width } = Dimensions.get("window");

const FlexRow = styled(View)`
  flex-direction: ;
`;

const Item = (props) => {
  const { data, id, position } = props;
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to Expand or Collapse
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    props.onSelect(props.id);
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);

  // const cardStyle = {
  //   width: width * 0.74,
  //   //backgroundColor: "rgba(242, 105, 36, 0.3)",
  //   //marginLeft: props.position === "left" ? width * 0.02 : 0,
  //   //shadowColor: "transparent",
  //   borderRadius: 15,
  //   marginBottom: height * 0.05,
  //   alignItem: "center",
  // };
  const cardStyle = {
    width: width * 0.9,
    borderRadius: 15,
    marginBottom: height * 0.05,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const textStyle = {
    // lineHeight: 16,
    lineHeight: 21,
    textAlign: "left",
    padding: 3,
    bottom: 5,
  };

  const responses = {
    marginRight: position === "Right" ? width * 0.1 : width * 0.09,
  };

  return (
    <>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#F26924" }}> {props.item.date}</Text>
        <Card style={cardStyle}>
          <Card.Content>
            <Paragraph
              onTextLayout={onTextLayout}
              numberOfLines={textShown && props.selected ? undefined : 4}
              //style={{ lineHeight: 21 }}
              style={textStyle}
            >
              {props.item.myPrayers}
            </Paragraph>
          </Card.Content>
          {lengthMore ? (
            <Card.Actions>
              <Button
                mode="text"
                icon={props.selected ? "chevron-up" : "chevron-down"}
                onPress={toggleNumberOfLines}
              >
                {textShown && props.selected ? "Collapse" : "Expand"}
              </Button>
            </Card.Actions>
          ) : null}
        </Card>
      </View>

      <View style={responses}>
        <NLFModal request={props.item} />
      </View>
    </>
  );
};
export const ExpandCollapseListMyPrayers = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        selected={selectedId === item.id}
        onSelect={onSelectItem}
        id={item.id}
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
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
  );
};
