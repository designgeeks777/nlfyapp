import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Dimensions, Text } from "react-native";
import { Button } from "../../../components/button";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { SuccessModalContent } from "../../../components/successModalContent.component";

const { width } = Dimensions.get("window");

export const RaiseStoryForm = (props) => {
  const [text, setText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
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
    const formattedDate = `${day}-${month}-${year}`;

    const url = `${BASEURL}/stories`;
    const postbody = {
      submittedBy: "Jude",
      content: text,
      datePosted: formattedDate,
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
      {!success && (
        <Text style={styles.modalTitle}>Write your Story Request</Text>
      )}
      {!success && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <TextInput
            placeholder="Enter your Story here"
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
        <SuccessModalContent message="Story request sent succesfully" />
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
