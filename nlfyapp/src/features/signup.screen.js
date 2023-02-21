import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase/compat";
import React, { useState, useEffect, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export const SignUpDummy = ({ navigation }) => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [error, setError] = useState("");
  //   const [user, setUser] = useState("");
  //   const [isLoading, setIsLoading] = useState("");
  //   const [repeatedPassword, setRepeatedPassword] = useState("");

  //   const onRegister = (eemail, ppassword, repeatPassword) => {
  //     if (ppassword !== repeatPassword) {
  //       setError("Passwords dont match");
  //       return;
  //     }
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(eemail, ppassword)
  //       .then((u) => {
  //         setUser(u);
  //         console.log(">>>>>", u);
  //         setIsLoading(false);
  //         navigation.navigate("Home");
  //       })
  //       .catch((e) => {
  //         setIsLoading(false);
  //         setError(e);
  //       });
  //   };

  const recaptchaVerifier = React.useRef(null);

  const [user, setUser] = useState(null);

  const [mobile, setMobile] = useState(null);

  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");

  // const onAuthStateChanged = (userAuth) => {
  //   if (!userAuth) {
  //     return;
  //   }
  //   if (userAuth) {
  //     console.log(userAuth);
  //     setUser(userAuth);
  //   }

  //   return () => useRef();
  // };
  // useEffect(() => {
  //   const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //   return () => {
  //     subscriber;
  //   };
  // }, []);

  const signInWithMobileNumber = () => {
    console.log(recaptchaVerifier.current);
    // const confirmation = await firebase.auth().signInWithPhoneNumber(mobile);
    // setConfirm(confirmation);
    firebase
      .auth()
      .signInWithPhoneNumber(mobile, recaptchaVerifier.current)
      .then((u) => {
        setConfirm(u);
      })
      .catch((e) => {
        console.log("ERROR SIGN IN", e);
      });
  };

  const confirmCode = () => {
    try {
      confirm
        .confirm(code)
        .then((u) => {
          setUser(u);
        })
        .catch((e) => {
          console.log("ERROR Code", e);
        });
    } catch (error) {
      console.log("Invalid code.");
    }
  };

  const signOut = () => {
    firebase.auth().signOut();
    setUser(null);
    setCode(null);
    setMobile(null);
    navigation.navigate("Home");
    // return () => useRef();
  };

  return (
    // <SafeAreaView>
    //   <View>
    //     <Text>SignupDummy</Text>
    //     <TextInput
    //       label="E-mail"
    //       value={email}
    //       textContentType="emailAddress"
    //       keyboardType="email-address"
    //       autoCapitalize="none"
    //       onChangeText={(u) => setEmail(u)}
    //     />
    //     <TextInput
    //       label="Password"
    //       value={password}
    //       textContentType="password"
    //       secureTextEntry
    //       autoCapitalize="none"
    //       onChangeText={(p) => setPassword(p)}
    //     />
    //     <TextInput
    //       label="Repeat Password"
    //       value={repeatedPassword}
    //       textContentType="password"
    //       secureTextEntry
    //       autoCapitalize="none"
    //       onChangeText={(p) => setRepeatedPassword(p)}
    //     />
    //     <Button
    //       icon="email"
    //       mode="contained"
    //       onPress={() => onRegister(email, password, repeatedPassword)}
    //     >
    //       Sign in
    //     </Button>
    //   </View>
    // </SafeAreaView>
    <SafeAreaView>
      <View>
        <Text>Mobile Sign In Tutorial</Text>
      </View>

      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app.options}
          attemptInvisibleVerification={true}
        />
        {user === null && (
          <>
            <TextInput
              value={mobile}
              onChangeText={(e) => setMobile(e)}
              placeholder="mobile"
              autoFocus
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
            />
            {!confirm ? (
              <>
                <TouchableOpacity onPress={() => signInWithMobileNumber()}>
                  <Text>Get Code</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  value={code}
                  onChangeText={(e) => setCode(e)}
                  placeholder="Code"
                />
                <TouchableOpacity onPress={() => confirmCode()}>
                  <Text>Confirm Code</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
      {user !== null && (
        <View>
          <Text>{user.phoneNumber}</Text>
          <TouchableOpacity onPress={signOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
