import React, { useCallback, useState } from "react";
import { FlatList, View, StyleSheet, Dimensions, Text } from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const Item = (props) => {
  const { item } = props;

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
    width: width * 0.85,
    backgroundColor:"rgba(242, 105, 36, 0.3)",// "#F26924",
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    shadowColor: "transparent",
    borderRadius:width * 0.05,
    marginBottom: width * 0.06,
  };

  const textStyle = {
    lineHeight: width * 0.045,
    textAlign: "left",
    padding: width * 0.02,
    bottom: width * 0.02,
    color: "black",//"white",
  };

  const setFlex = {
    flex: 1,
    justifyContent: "center",
  };

  const prayerHeading = {
    lineHeight: width * 0.045,
    textAlign: "left",
    padding: width * 0.02,
    marginLeft: width * 0.02,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: width * 0.01,
  };

  return (
    <>
      <View style={setFlex}>
        <Text style={prayerHeading}>
          {item.responseBy.name}'s Prayer - {item.dateOfResponse}
        </Text>
        <Card style={cardStyle}>
          <Card.Content>
            <Paragraph
              onTextLayout={onTextLayout}
              numberOfLines={requestTextShown && props.selected ? undefined : 3}
              style={textStyle}
            >
              {item.responseMessage}
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
                {requestTextShown && props.selected ? "See Less" : "See More"}
              </Button>
            </Card.Actions>
          ) : null}
        </Card>
      </View>
    </>
  );
};

export const ExpandCollapseList = (props) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index, data }) => {
  
    return (
      <Item
        data={data}
        id={index}
        item={item}
        selected={selectedId === index}
        onSelect={onSelectItem}
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
    containerStyle: {
      marginTop: width * 0.05,
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.containerStyle}>
      <FlatList
        data={props.data}
        initialNumToRender={props.data.length}
        contentContainerStyle={{ paddingBottom: width * 0.01}}
        renderItem={renderItem}
        extraData={selectedId}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
