import React, { useCallback, useState } from "react";
import { Text, FlatList } from "react-native";
import { Button, Card, Paragraph } from "react-native-paper";

const Item = (props) => {
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
  return (
    <>
      <Text> {props.item.date}</Text>
      <Card>
        <Card.Title title={props.item.title} />
        <Card.Content>
          <Paragraph
            onTextLayout={onTextLayout}
            numberOfLines={textShown && props.selected ? undefined : 4}
            style={{ lineHeight: 21 }}
          >
            {props.item.textInfo}
          </Paragraph>
          {/* <Paragraph numberOfLines={props.selected ? null : 3}> */}
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

        {/* <Card.Content>
        <Paragraph numberOfLines={props.selected ? null : 3}>
          {props.item.textInfo}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          style={styles.expandCollapseButton}
          mode="text"
          icon={props.selected ? "chevron-up" : "chevron-down"}
          onPress={() => props.onSelect(props.id)}
        >
          {props.selected ? "Collapse" : "Expand"}
        </Button>
      </Card.Actions> */}
      </Card>
    </>
  );
};
export const ExpandCollapseList = (props) => {
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
    if (id === selectedId) return setSelectedId(null);
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
