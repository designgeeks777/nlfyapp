import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import { Button } from "../../../components/button";
import styled from "styled-components";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const { width } = Dimensions.get("window");

const ButtonWrapper = styled(View)`
  padding-bottom: 30px;
  align-items: center;
`;

export const PrayerForm = (props) => {
  const { user } = useContext(AuthenticationContext);
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

    const existingresponses = [...props.request.responses];

    //get current date and add
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    console.log("Formatted Date", formattedDate);
    const newresponse = {
      responseBy: {
        uid: user.uid,
        name: user.displayName,
      },
      responseMessage: text,
      dateOfResponse: formattedDate,
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
