import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
  Alert,
} from "react-native";
import { Button } from "../../../components/button";
import styled from "styled-components";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { SuccessModalContent } from "../../../components/successModalContent.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const { width } = Dimensions.get("window");

export const RaisePrayerForm = (props) => {
  const { user } = useContext(AuthenticationContext);
  console.log("User in Raise Prayer", user);
  //console.log(null === user);
  const [text, setText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    console.log("Submit clicked");

    const responseHandler = (response) => {
      console.log("Response:", response.status);
      if (response.status === 200) {
        console.log("Success");
        setSuccess(true);
      }
    };

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const url = `${BASEURL}prayerRequests/`;
    console.log("url:", url);
    const postbody = {
      raisedBy: user.displayName,
      raisedByUid: user.uid,
      requestMessage: text,
      dateOfPosting: formattedDate,
    };

    axios
      .post(url, postbody)
      .then(responseHandler)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    props.handleSuccessChange(success);
  }, [success, props]);

  return (
    <>
      {user ? (
        <>
          {!success && (
            <Text style={styles.modalTitle}>Write your Prayer Request</Text>
          )}
          {!success && (
            <View style={{ flex: 1, alignItems: "center" }}>
              <TextInput
                placeholder="Enter your prayer here"
                mode="outlined"
                style={styles.inp}
                textAlignVertical="top"
                value={text}
                onChangeText={(value) => setText(value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
            </View>
          )}
          {!inputFocused && !success && (
            <View style={styles.buttonwrapper}>
              <Button label="Submit" handleClick={handleSubmit} />
            </View>
          )}
          {success && (
            <SuccessModalContent message="Prayer request sent succesfully" />
          )}
        </>
      ) : (
        Alert.alert("Please login/signup to Raise a Prayer Request")
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
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: width * 0.05,
  },
});
