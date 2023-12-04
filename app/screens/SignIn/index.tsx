import {
  ANDROID_CLIENT_ID,
  EXPO_PUBLIC_IOS_CLIENT_ID,
  EXPO_PROXY_CLIENT_ID,
} from "@env";
import { Realm, useApp } from "@realm/react";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { Container, Title, Slogan } from "./styles";

import backgroungImg from "@/assets/background.png";
import { Button } from "@/components/Button";

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: EXPO_PUBLIC_IOS_CLIENT_ID,
    expoClientId: EXPO_PROXY_CLIENT_ID,
    scopes: ["profile", "email"],
    ...{ useProxy: true },
    redirectUri: makeRedirectUri({
      scheme: "com.carpool.app.v1",
    }),
  });

  console.log(ANDROID_CLIENT_ID);
  console.log(EXPO_PUBLIC_IOS_CLIENT_ID);
  console.log(response);
  console.log(googleSignIn);

  const app = useApp();

  function handleGoogleSignIn() {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if (response.type !== "success") {
        setIsAuthenticating(false);
      }
    });
  }

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication?.idToken) {
        console.log(`Got auth token -> ${response.authentication?.idToken}`);

        const credentials = Realm.Credentials.jwt(
          response.authentication.idToken,
        );

        app.logIn(credentials).catch((error) => {
          console.log(`Error: ${error}`);
          Alert.alert("Entrar", "Não foi possível autenticar sua sessão");
          setIsAuthenticating(false);
        });
      } else {
        Alert.alert("Entrar", "Não foi possível autenticar sua sessão");
        setIsAuthenticating(false);
      }
    }
  }, [response]);

  return (
    <Container source={backgroungImg}>
      <Title>Carpool</Title>

      <Slogan>Conectando caronas</Slogan>
      <Button
        title="Entrar com Google"
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}
