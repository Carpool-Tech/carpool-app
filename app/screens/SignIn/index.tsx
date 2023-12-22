import {
  ANDROID_CLIENT_ID,
  EXPO_PUBLIC_IOS_CLIENT_ID,
  EXPO_PUBLIC_PROXY_CLIENT_ID,
  EXPO_PUBLIC_RECAPTCHA_SITE_KEY,
} from "@env";
import { Realm, useApp } from "@realm/react";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useRef, useEffect, useState } from "react";
import { Alert } from "react-native";
import Recaptcha, { RecaptchaRef } from "react-native-recaptcha-that-works";

import { Container, Slogan, Title } from "./styles";

import backgroungImg from "@/assets/background.png";
import { Button } from "@/components/Button";

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const recaptchaRef = useRef<RecaptchaRef | null>(null);

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: EXPO_PUBLIC_IOS_CLIENT_ID,
    expoClientId: EXPO_PUBLIC_PROXY_CLIENT_ID,
    scopes: ["profile", "email"],
    ...{ useProxy: true },
    redirectUri: makeRedirectUri({
      scheme: "com.carpool.app.v1",
    }),
  });

  const app = useApp();

  function handleGoogleSignIn() {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if (response.type !== "success") {
        setIsAuthenticating(false);
      }
    }).then(() => recaptchaRef.current?.open());
  }

  function handleVerify(token: string) {
    setRecaptchaToken(token);
  }

  function handleError(error: unknown) {
    console.error("Recaptcha Error:", error);
  }

  useEffect(() => {
    if (response?.type === "success" && recaptchaToken !== null) {
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
  }, [response, recaptchaToken]);

  return (
    <Container source={backgroungImg}>
      <Title>Carpool</Title>

      <Slogan>Conectando caronas</Slogan>
      <Recaptcha
        baseUrl="http://127.0.0.1"
        onError={handleError}
        onVerify={handleVerify}
        ref={recaptchaRef}
        siteKey={EXPO_PUBLIC_RECAPTCHA_SITE_KEY}
        size="invisible"
        theme="dark"
        loadingComponent={<></>}
      />
      <Button
        title="Entrar com Google"
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}
