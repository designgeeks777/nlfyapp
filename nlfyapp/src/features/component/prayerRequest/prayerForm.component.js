import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
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
  const [error, setError] = useState(false);
  const [inputBorderColor, setInputBorderColor] = useState("gray");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [valid, setValid] = useState(true);

  const MAX_INPUT_LENGTH = 1000; // Maximum allowed length of input
  // Error messages
  const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
  const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

  const handleTextChange = (value) => {
    if (value.trim().length <= MAX_INPUT_LENGTH) {
      setText(value);
      setValid(""); // Clear error message when user starts typing
    }

    // Check if input value is valid or not
    if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
      setValid(INVALID_PRAYER_ERROR);
      setInputBorderColor("red");
      setDisableSubmit(true);
      return;
    }
    // Check if input value exceeds maximum allowed length
    if (value.trim().length > MAX_INPUT_LENGTH) {
      setValid(MAX_LENGTH_ERROR);
      setInputBorderColor("red");
      setDisableSubmit(true);
      return;
    }

    // Clear error message and reset input border color if no errors
    setValid("");
    setInputBorderColor("gray");
    setDisableSubmit(false);
  };

  const handleSubmit = async () => {
    console.log("Submit clicked");
    if (text.trim() === "") {
      return; // return early if text is empty or only contains whitespace
    }

    console.log("props.request", props.request);

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

    //Using Promise.race to set a timeout on an axios request and handle the timeout as a rejection
    console.log("Function start");
    console.log("Before HTTP request");

    // Create a new promise that resolves after a certain amount of time
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 3000);
    });

    // Make the axios request and race it against the timeout promise
    Promise.race([axios.patch(url, updateBody), timeoutPromise])
      .then((response) => {
        console.log("Response :", response.status);
        if (response.status === 200) {
          console.log("Success");
          setSuccess(true);
          setError(false);
        }
      })
      .catch((err) => {
        if (err.message === "Request timed out") {
          console.log("Request timed out");
          setError(true);
          setSuccess(false);
        } else {
          console.log("PATCH ERROR", err);
          setError(true);
          setSuccess(false);
        }
      })
      .finally(() => {
        console.log("HTTP request complete");
      });

    console.log("AFTER HTTP request");
  };

  useEffect(() => {
    props.handleSuccessChange(success);
  }, [success, props]);

  useEffect(() => {
    console.log("Calling handle error change", error);
    props.handleErrorChange(error);
  }, [error, props]);

  return (
    <>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TextInput
          placeholder="Enter your prayer here"
          mode="outlined"
          style={[
            styles.inp,
            {
              borderColor: inputBorderColor,
            },
          ]}
          multiline={true} // enable multiline
          textAlignVertical="top"
          value={text}
          onChangeText={handleTextChange}
          onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
          onBlur={() => setInputFocused(false)}
        />
        {valid !== "" && <Text style={styles.errorMessage}>{valid}</Text>}
      </View>
      {!inputFocused && (
        <ButtonWrapper
          style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
        >
          <Button
            label="Submit"
            handleClick={handleSubmit}
            disabled={disableSubmit}
          />
        </ButtonWrapper>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inp: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  errorMessage: {
    color: "red",
  },
});
