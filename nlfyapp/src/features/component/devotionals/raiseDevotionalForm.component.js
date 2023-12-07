import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Text,
  Platform,
} from "react-native";
import { Button } from "../../../components/button";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { SuccessModalContent } from "../../../components/successModalContent.component";

const { width } = Dimensions.get("window");

export const RaiseDevotionalForm = (props) => {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [inputFocusedTitle, setInputFocusedTitle] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    const responseHandler = (response) => {
      if (response.status === 200) {
        setSuccess(true);
      }
    };

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const devotionalUrl = `${BASEURL}/devotionals`;
    const postbody = {
      subject: subject,
      content: text,
      datePosted: formattedDate,
    };

    axios
      .post(devotionalUrl, postbody)
      .then(responseHandler)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    props.handleSuccessChange(success);
  }, [success, props]);

  return (
    <>
      {!success && <Text style={styles.modalTitle}>Write your Devotional</Text>}

      {!success && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <TextInput
            placeholder="Enter Title/Subject here(max 10 words)"
            mode="outlined"
            multiline={true}
            style={styles.titleinp}
            textAlignVertical="top"
            value={subject} // bind text state variable to input field
            onChangeText={(value) => setSubject(value)} // update text state variable whenever user types into input field
            onFocus={() => setInputFocusedTitle(true)} // set inputFocused to true when TextInput is focused
            onBlur={() => setInputFocusedTitle(false)}
          />
        </View>
      )}
      {!success && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <TextInput
            placeholder="Write Content here"
            mode="outlined"
            style={styles.inp}
            textAlignVertical="top"
            multiline={true}
            value={text} // bind text state variable to input field
            onChangeText={(value) => setText(value)} // update text state variable whenever user types into input field
            onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
            onBlur={() => setInputFocused(false)}
          />
        </View>
      )}
      {!success && (
        <View style={styles.buttonwrapper}>
          <Button label="Submit" handleClick={handleSubmit} />
        </View>
      )}

      {success && (
        <SuccessModalContent message="Devotional Posted succesfully" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inp: {
    ...Platform.select({
      ios: {
        height: width * 0.3,
      },
      android: {
        height: width * 0.4,
      },
    }),
    width: width * 0.9,
    borderRadius: width * 0.02,
    borderColor: "gray",
    borderWidth: width * 0.001,
    padding: width * 0.03,
    marginTop: -(width * 0.1),
  },
  titleinp: {
    height: width * 0.1,
    width: width * 0.9,
    borderRadius: width * 0.02,
    borderColor: "gray",
    borderWidth: width * 0.001,
    padding: width * 0.03,
    ...Platform.select({
      ios: {
        marginBottom: width * 0.05,
      },
      android: {
        // No marginBottom for Android
      },
    }),
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
