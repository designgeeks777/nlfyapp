import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Button } from "../../../components/button";
import styled from "styled-components";

const ButtonWrapper = styled(View)`
  padding-top: 60px;
`;
export const PrayerForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    // handle the submission of the prayer request here
    console.log("Submit");
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TextInput
        placeholder="Enter your prayer request here"
        mode="outlined"
        style={styles.inp}
        textAlignVertical="top"
      />
      <ButtonWrapper>
        <Button label="Submit" handleClick={handleSubmit} />
      </ButtonWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  inp: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});
