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
import { FailureModalContent } from "../../../components/failureModalContent.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const { width } = Dimensions.get("window");

const ButtonWrapper = styled(View)`
  padding-bottom: 30px;
  align-items: center;
`;
export const RaisePrayerForm = (props) => {
  const { user } = useContext(AuthenticationContext);
  console.log("User in Raise Prayer", user);
  //console.log(null === user);
  const [text, setText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [error, setError] = useState(false);
  const [inputBorderColor, setInputBorderColor] = useState("gray");
  const [valid, setValid] = useState(true);

  const MAX_INPUT_LENGTH = 1000; // Maximum allowed length of input
  // Error messages
  const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
  const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

  const handleTextChange = (value) => {
    // setText(value);
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

  const handleSubmit = () => {
    console.log("Submit clicked");
    if (text.trim() === "") {
      return; // return early if text is empty or only contains whitespace
    }

    const responseHandler = (response) => {
      console.log("Response:", response.status);
      if (response.status === 200) {
        console.log("Success");
        setSuccess(true);
        setError(false);
      }
    };

    //get current date and add
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const url = `${BASEURL}prayerRequests/`;
    console.log("url:", url);

    console.log("Function start");
    console.log("Before HTTP request");

    const postbody = {
      raisedBy: user.displayName,
      raisedByUid: user.uid,
      requestMessage: text,
      dateOfPosting: formattedDate,
    };

    console.log("Post body:", postbody);

    axios
      .post(url, postbody, { timeout: 5000 })
      .then(responseHandler)
      .catch((err) => {
        console.log("POST Error:", err);
        setError(true); // Set error state to true
      });
  };
  console.log("AFTER HTTP request");

  useEffect(() => {
    props.handleSuccessChange(success);
  }, [success, props]);

  useEffect(() => {
    console.log("Calling handle error change", error);
    props.handleErrorChange(error);
  }, [error, props]);

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
                //style={styles.inp}
                style={[
                  styles.inp,
                  {
                    borderColor: inputBorderColor,
                  },
                ]}
                multiline={true} // enable multiline
                textAlignVertical="top"
                value={text} // bind text state variable to input field
                onChangeText={handleTextChange}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
              {valid !== "" && <Text style={styles.errorMessage}>{valid}</Text>}
            </View>
          )}
          {!success && !error && (
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

          {success && (
            <SuccessModalContent message="Prayer request sent succesfully" />
          )}
          {error && (
            <FailureModalContent message="Sorry, we couldnt process the request Please try after sometime." />
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
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: width * 0.05,
  },
  errorMessage: {
    color: "red",
  },
});

//========================================================
// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Dimensions,
//   Text,
//   Alert,
// } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";
// import { SuccessModalContent } from "../../../components/successModalContent.component";
// import { FailureModalContent } from "../../../components/failureModalContent.component";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";
// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled(View)`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const RaisePrayerForm = (props) => {
//   const { user } = useContext(AuthenticationContext);
//   console.log("User in Raise Prayer", user);
//   //console.log(null === user);
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [disableSubmit, setDisableSubmit] = useState(true);
//   const [error, setError] = useState(false);
//   const [inputBorderColor, setInputBorderColor] = useState("gray");
//   const [valid, setValid] = useState(true);

//   const MAX_INPUT_LENGTH = 1000; // Maximum allowed length of input
//   // Error messages
//   const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
//   const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

//   const handleTextChange = (value) => {
//     // setText(value);
//     if (value.trim().length <= MAX_INPUT_LENGTH) {
//       setText(value);
//       setValid(""); // Clear error message when user starts typing
//     }

//     // Check if input value is valid or not
//     if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
//       setValid(INVALID_PRAYER_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }
//     // Check if input value exceeds maximum allowed length
//     if (value.trim().length > MAX_INPUT_LENGTH) {
//       setValid(MAX_LENGTH_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }

//     // Clear error message and reset input border color if no errors
//     setValid("");
//     setInputBorderColor("gray");
//     setDisableSubmit(false);
//   };

//   const handleSubmit = () => {
//     console.log("Submit clicked");
//     if (text.trim() === "") {
//       return; // return early if text is empty or only contains whitespace
//     }
//     console.log("props.request", props.request);

//     const responseHandler = (response) => {
//       console.log("Response:", response.status);
//       if (response.status === 200) {
//         console.log("Success");
//         setSuccess(true);
//         setError(false);
//       }
//     };

//     //get current date and add
//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     //   let userDetails = {};
//     //   const url = `${BASEURL}users/${props.user.uid}`;
//     //   console.log("UID : ", props.user.uid);
//     //   console.log("Start");
//     //   axios
//     //     .get(url)
//     //     .then(async (response) => {
//     //       //set the username for posting prayer request
//     //       userDetails = {
//     //         name: response.data.name,
//     //       };

//     //       const prayerRequesturl = `${BASEURL}prayerRequests/`;
//     //       console.log("prayerRequesturl:", prayerRequesturl);
//     //       const postbody = {
//     //         uid: props.user.uid,
//     //         raisedBy: userDetails.name,
//     //         requestMessage: text,
//     //         dateOfPosting: formattedDate,
//     //       };
//     //       console.log("Post call", postbody);

//     //       console.log("Function start");
//     //       console.log("Before HTTP request");
//     //       axios
//     //         .post(prayerRequesturl, postbody)
//     //         .then(responseHandler)
//     //         //.catch((err) => console.log(err));
//     //         .catch((err) => {
//     //           console.log("POST ERROR ", err);
//     //           setError(true);
//     //           setSuccess(false);
//     //         });
//     //       // try {
//     //       //   const postResponse = await axios.post(prayerRequesturl, postbody);
//     //       //   responseHandler(postResponse);
//     //       //   //.catch((err) => console.log(err));
//     //       //   console.log("AFTER HTTP request");
//     //       // } catch (err) {
//     //       //   console.log("POST ERROR ", err);
//     //       //   setError(true);
//     //       //   setSuccess(false);
//     //       // }
//     //       console.log("AFTER HTTP request");
//     //     })
//     //     .catch((err) => console.log("GET ERROR ", err));
//     const url = `${BASEURL}prayerRequests/`;
//     console.log("url:", url);
//     const postbody = {
//       raisedBy: user.displayName,
//       raisedByUid: user.uid,
//       requestMessage: text,
//       dateOfPosting: formattedDate,
//     };

//     axios
//       .post(url, postbody)
//       .then(responseHandler)
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     props.handleSuccessChange(success);
//   }, [success, props]);

//   useEffect(() => {
//     console.log("Calling handle error change", error);
//     props.handleErrorChange(error);
//   }, [error, props]);

//   return (
//     <>
//       {user ? (
//         <>
//           {!success && !error && (
//             <Text style={styles.modalTitle}>Write your Prayer Request</Text>
//           )}
//           {!success && !error && (
//             <View style={{ flex: 1, alignItems: "center" }}>
//               <TextInput
//                 placeholder="Enter your prayer here"
//                 mode="outlined"
//                 // style={styles.inp}
//                 style={[
//                   styles.inp,
//                   {
//                     borderColor: inputBorderColor,
//                   },
//                 ]}
//                 multiline={true} // enable multiline
//                 textAlignVertical="top"
//                 value={text} // bind text state variable to input field
//                 onChangeText={handleTextChange}
//                 onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//                 onBlur={() => setInputFocused(false)}
//               />
//               {valid !== "" && <Text style={styles.errorMessage}>{valid}</Text>}
//             </View>
//           )}
//           {!success && !error && (
//             <ButtonWrapper
//               style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
//             >
//               <Button
//                 label="Submit"
//                 handleClick={handleSubmit}
//                 disabled={disableSubmit}
//               />
//             </ButtonWrapper>
//           )}

//           {success && (
//             <SuccessModalContent message="Prayer request sent succesfully" />
//           )}
//           {error && (
//             <FailureModalContent message="Sorry, we couldnt process the request Please try after sometime." />
//           )}
//         </>
//       ) : (
//         Alert.alert("Please login/signup to Raise a Prayer Request")
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   inp: {
//     height: 200,
//     width: "100%",
//     borderRadius: 10,
//     borderColor: "gray",
//     borderWidth: 1,
//     padding: 10,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: width * 0.05,
//   },
//   errorMessage: {
//     color: "red",
//   },
// });
