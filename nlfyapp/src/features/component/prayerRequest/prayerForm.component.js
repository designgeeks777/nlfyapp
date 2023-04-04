import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import { Button } from "../../../components/button";
import styled from "styled-components";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";

const { width } = Dimensions.get("window");

const ButtonWrapper = styled(View)`
  padding-bottom: 30px;
  align-items: center;
`;

export const PrayerForm = (props) => {
  const [text, setText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    // handle the submission of the prayer request here

    console.log("props.request", props.request);

    const responseHandler = (response) => {
      console.log("Response:", response.status);
      if (response.status === 200) {
        console.log("Success");
        setSuccess(true);
      }
    };

    const existingresponses = [];
    props.request.responses.map((response) => {
      existingresponses.push(response);
    });
    const newresponse = {
      responseBy: "Tia",
      responseMessage: text,
      dateOfResponse: "23/11/2023",
    };
    existingresponses.push(newresponse);

    const updateBody = {
      responses: existingresponses,
    };

    console.log("Existing Responses:", existingresponses);
    const url = `${BASEURL}prayerRequests/${props.request._id}`;
    console.log("url:", url);
    axios
      .patch(url, updateBody)
      .then(responseHandler)
      .catch((err) => console.log(err));
    //console.log("Response Data", data);
    //props.handleCloseModal();
  };

  useEffect(() => {
    props.handleSuccessChange(success);
  }, [success, props]);

  return (
    <>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TextInput
          placeholder="Enter your prayer here"
          mode="outlined"
          style={styles.inp}
          textAlignVertical="top"
          value={text} // bind text state variable to input field
          onChangeText={(value) => setText(value)} // update text state variable whenever user types into input field
          onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
          onBlur={() => setInputFocused(false)}
        />
      </View>
      {!inputFocused && (
        <View style={styles.buttonwrapper}>
          <Button label="Submit" handleClick={handleSubmit} />
        </View>
      )}
    </>
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
  buttonwrapper: {
    paddingBottom: width * 0.1,
    alignItems: "center",
  },
});
