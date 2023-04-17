// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TextInput, Dimensions, Text } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";
// import { SuccessModalContent } from "../../../components/successModalContent.component";

// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled(View)`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const RaisePrayerForm = (props) => {
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = () => {
//     console.log("Submit clicked");

//     const responseHandler = (response) => {
//       console.log("Response:", response.status);
//       if (response.status === 200) {
//         console.log("Success");
//         setSuccess(true);
//       }
//     };

//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     const url = `${BASEURL}prayerRequests/`;
//     console.log("url:", url);
//     const postbody = {
//       raisedBy: "Tina",
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

//   return (
//     <>
//       {!success && (
//         <Text style={styles.modalTitle}>Write your Prayer Request</Text>
//       )}
//       {!success && (
//         <View style={{ flex: 1, alignItems: "center" }}>
//           <TextInput
//             placeholder="Enter your prayer here"
//             mode="outlined"
//             style={styles.inp}
//             textAlignVertical="top"
//             value={text} // bind text state variable to input field
//             onChangeText={(value) => setText(value)} // update text state variable whenever user types into input field
//             onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//             onBlur={() => setInputFocused(false)}
//           />
//         </View>
//       )}
//       {!inputFocused && !success && (
//         <View style={styles.buttonwrapper}>
//           <Button label="Submit" handleClick={handleSubmit} />
//         </View>
//       )}

//       {success && (
//         <SuccessModalContent message="Prayer request sent succesfully" />
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
//   buttonwrapper: {
//     paddingBottom: width * 0.1,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: width * 0.05,
//   },
// });

//=================working on this code

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TextInput, Dimensions, Text } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";
// import { SuccessModalContent } from "../../../components/successModalContent.component";

// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled(View)`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const RaisePrayerForm = (props) => {
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [failure, setFailure] = useState(true);
//   const [inputBorderColor, setInputBorderColor] = useState("gray");
//   const [disableSubmit, setDisableSubmit] = useState(true);

//   const MAX_INPUT_LENGTH = 100; // Maximum allowed length of input
//   // Error messages
//   const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
//   const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

//   const handleTextChange = (value) => {
//     // setText(value);
//     if (value.trim().length <= MAX_INPUT_LENGTH) {
//       setText(value);
//       setFailure(""); // Clear error message when user starts typing
//     }

//     // Check if input value is valid or not
//     if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
//       setFailure(INVALID_PRAYER_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }
//     // Check if input value exceeds maximum allowed length
//     if (value.trim().length > MAX_INPUT_LENGTH) {
//       setFailure(MAX_LENGTH_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }

//     // Clear error message and reset input border color if no errors
//     setFailure("");
//     setInputBorderColor("gray");
//     setDisableSubmit(false);
//   };

//   const handleSubmit = () => {
//     console.log("Submit clicked");
//     // if (text.trim() === "") {
//     //   return; // return early if text is empty or only contains whitespace
//     // }

//     const responseHandler = (response) => {
//       console.log("Response:", response.status);
//       if (response.status === 200) {
//         console.log("Success");
//         setSuccess(true);
//       } else {
//         setFailure("An error occurred. Please try again later.");
//         setInputBorderColor("red");
//       }
//     };

//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     const url = `${BASEURL}prayerRequests/`;
//     console.log("url:", url);
//     const postbody = {
//       raisedBy: "Tina",
//       requestMessage: text,
//       dateOfPosting: formattedDate,
//     };

//     axios
//       .post(url, postbody)
//       .then(responseHandler)
//       //.catch((err) => console.log(err));
//       .catch((err) => {
//         console.log(err.message);
//         if (err.response) {
//           console.log("Response Error:", err.response.status);
//           if (err.response.status === 400) {
//             console.log("Request Error: Invalid request. Please try again.");
//             setFailure("Invalid request. Please try again.");
//           } else if (err.response.status === 404) {
//             console.log("Request Error: Request not found. Please try again.");
//             setFailure("Request not found. Please try again.");
//           } else {
//             console.log(
//               "Request Error: An error occurred. Please try again later."
//             );
//             //setFailure("An error occurred. Please try again later.");
//             setFailure(err.response.data.message); // Set failure to the error message returned by the API
//           }
//         } else {
//           console.log(
//             "Network Error: An error occurred. Please check your network connection."
//           );
//           setFailure(
//             "An error occurred. Please check your network connection."
//           );
//         }
//       });
//   };

//   useEffect(() => {
//     props.handleSuccessChange(success);
//   }, [success, props]);

//   return (
//     <>
//       {!success && (
//         <Text style={styles.modalTitle}>Write your Prayer Request</Text>
//       )}
//       {!success && (
//         // <View style={{ flex: 1, alignItems: "center" }}>
//         //   <TextInput
//         //     placeholder="Enter your prayer here"
//         //     mode="outlined"
//         //     style={styles.inp}
//         //     textAlignVertical="top"
//         //     value={text} // bind text state variable to input field
//         //     onChangeText={(value) => setText(value)} // update text state variable whenever user types into input field
//         //     onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//         //     onBlur={() => setInputFocused(false)}
//         //   />
//         // </View>
//         <View style={{ flex: 1, alignItems: "center" }}>
//           <TextInput
//             placeholder="Enter your prayer here"
//             mode="outlined"
//             style={[
//               styles.inp,
//               {
//                 borderColor: inputBorderColor,
//               },
//             ]}
//             multiline={true} // enable multiline
//             textAlignVertical="top"
//             value={text}
//             onChangeText={handleTextChange}
//             onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//             // onBlur={() => setInputFocused(false)}
//             onBlur={() => {
//               setInputFocused(false);
//               console.log("onBlur callback called");
//             }}
//           />
//           {failure !== "" && <Text style={styles.errorMessage}>{failure}</Text>}
//         </View>
//       )}
//       {/* {!inputFocused && !success && (
//         <View style={styles.buttonwrapper}>
//           <Button label="Submit" handleClick={handleSubmit} />
//         </View>
//       )} */}
//       {!inputFocused && (
//         <ButtonWrapper
//           style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
//         >
//           <Button
//             label="Submit"
//             handleClick={handleSubmit}
//             disabled={disableSubmit}
//           />
//         </ButtonWrapper>
//       )}

//       {success && (
//         <SuccessModalContent message="Prayer request sent succesfully" />
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
//   buttonwrapper: {
//     paddingBottom: width * 0.1,
//     alignItems: "center",
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

//===================Fully WORKING CODE PERFECT=================

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TextInput, Dimensions, Text } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";
// import { SuccessModalContent } from "../../../components/successModalContent.component";
// import { FailureModalContent } from "../../../components/failureModalContent.component";

// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled(View)`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const RaisePrayerForm = (props) => {
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [disableSubmit, setDisableSubmit] = useState(true);
//   const [failure, setFailure] = useState(true);
//   const [inputBorderColor, setInputBorderColor] = useState("gray");
//   const [errorMessage, setErrorMessage] = useState("");
//   const MAX_INPUT_LENGTH = 100; // Maximum allowed length of input
//   // Error messages
//   const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
//   const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

//   const handleTextChange = (value) => {
//     // setText(value);
//     if (value.trim().length <= MAX_INPUT_LENGTH) {
//       setText(value);
//       setFailure(""); // Clear error message when user starts typing
//     }

//     // Check if input value is valid or not
//     if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
//       setFailure(INVALID_PRAYER_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }
//     // Check if input value exceeds maximum allowed length
//     if (value.trim().length > MAX_INPUT_LENGTH) {
//       setFailure(MAX_LENGTH_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }

//     // Clear error message and reset input border color if no errors
//     setFailure("");
//     setInputBorderColor("gray");
//     setDisableSubmit(false);
//   };

//   const handleSubmit = () => {
//     console.log("Submit clicked");
//     if (text.trim() === "") {
//       return; // return early if text is empty or only contains whitespace
//     }

//     //console.log("props.request", props.request);

//     // const handleSubmit = () => {
//     //   console.log("Submit clicked");

//     const responseHandler = (response) => {
//       console.log("Response:", response.status);
//       if (response.status === 200) {
//         console.log("Success");
//         setSuccess(true);
//       } else {
//         console.log("Error");
//         setErrorMessage(
//           <FailureModalContent message="Sorry, we couldnt process the request Please try after sometime." />
//         );
//         // setErrorMessage(
//         //   "Sorry, we couldnt process the request Please try after sometime."
//         // );
//         setInputBorderColor("red");
//       }
//     };

//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     const url = `${BASEURL}prayerRequests/`;
//     console.log("url:", url);
//     const postbody = {
//       raisedBy: "Tina",
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

//   return (
//     <>
//       {!success && (
//         <Text style={styles.modalTitle}>Write your Prayer Request</Text>
//       )}
//       {!success && (
//         <View style={{ flex: 1, alignItems: "center" }}>
//           <TextInput
//             placeholder="Enter your prayer here"
//             mode="outlined"
//             // style={styles.inp}
//             style={[
//               styles.inp,
//               {
//                 borderColor: inputBorderColor,
//               },
//             ]}
//             multiline={true} // enable multiline
//             textAlignVertical="top"
//             value={text} // bind text state variable to input field
//             onChangeText={handleTextChange}
//             onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//             onBlur={() => setInputFocused(false)}
//           />
//           {failure !== "" && <Text style={styles.errorMessage}>{failure}</Text>}
//         </View>
//       )}
//       {/* {!inputFocused && (
//       <View style={styles.buttonwrapper}>
//         <Button label="Submit" handleClick={handleSubmit} />
//       </View>
//     )} */}
//       {!inputFocused && !success && (
//         <ButtonWrapper
//           style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
//         >
//           <Button
//             label="Submit"
//             handleClick={handleSubmit}
//             disabled={disableSubmit}
//           />
//         </ButtonWrapper>
//       )}

//       {success && (
//         <SuccessModalContent message="Prayer request sent succesfully" />
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

//===============WORKING ON THE ERRORE FLOW===========

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Dimensions, Text } from "react-native";
import { Button } from "../../../components/button";
import styled from "styled-components";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { SuccessModalContent } from "../../../components/successModalContent.component";
import { FailureModalContent } from "../../../components/failureModalContent.component";

const { width } = Dimensions.get("window");

const ButtonWrapper = styled(View)`
  padding-bottom: 30px;
  align-items: center;
`;

export const RaisePrayerForm = (props) => {
  const [text, setText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [failure, setFailure] = useState(true);
  const [inputBorderColor, setInputBorderColor] = useState("gray");
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_INPUT_LENGTH = 100; // Maximum allowed length of input
  // Error messages
  const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
  const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

  const handleTextChange = (value) => {
    // setText(value);
    if (value.trim().length <= MAX_INPUT_LENGTH) {
      setText(value);
      setFailure(""); // Clear error message when user starts typing
    }

    // Check if input value is valid or not
    if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
      setFailure(INVALID_PRAYER_ERROR);
      setInputBorderColor("red");
      setDisableSubmit(true);
      return;
    }
    // Check if input value exceeds maximum allowed length
    if (value.trim().length > MAX_INPUT_LENGTH) {
      setFailure(MAX_LENGTH_ERROR);
      setInputBorderColor("red");
      setDisableSubmit(true);
      return;
    }

    // Clear error message and reset input border color if no errors
    setFailure("");
    setInputBorderColor("gray");
    setDisableSubmit(false);
  };

  const handleSubmit = () => {
    console.log("Submit clicked");
    if (text.trim() === "") {
      return; // return early if text is empty or only contains whitespace
    }

    //console.log("props.request", props.request);

    // const handleSubmit = () => {
    //   console.log("Submit clicked");

    const responseHandler = (response) => {
      console.log("Response:", response.status);
      if (response.status === 200) {
        console.log("Success");
        setSuccess(true);
      } else {
        console.log("Error");
        setErrorMessage(
          <FailureModalContent message="Sorry, we couldnt process the request Please try after sometime." />
        );
        // setErrorMessage(
        //   "Sorry, we couldnt process the request Please try after sometime."
        // );
        setInputBorderColor("red");
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
      raisedBy: "Tina",
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
      {!success && (
        <Text style={styles.modalTitle}>Write your Prayer Request</Text>
      )}
      {!success && (
        <View style={{ flex: 1, alignItems: "center" }}>
          <TextInput
            placeholder="Enter your prayer here"
            mode="outlined"
            // style={styles.inp}
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
            onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
            onBlur={() => setInputFocused(false)}
          />
          {failure !== "" && <Text style={styles.errorMessage}>{failure}</Text>}
        </View>
      )}
      {/* {!inputFocused && (
      <View style={styles.buttonwrapper}>
        <Button label="Submit" handleClick={handleSubmit} />
      </View>
    )} */}
      {!inputFocused && !success && (
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
