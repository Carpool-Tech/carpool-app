import { EXPO_PUBLIC_REALM_APP_ID } from "@env";
import { AppProvider, RealmProvider, UserProvider } from "@realm/react";
// import { RealmProvider } from "app/libs/realm";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { Historic } from "app/libs/realm/schemas/historic";
import { User } from "app/libs/realm/schemas/user";

import userStore from "@/stores/user";
import { Routes } from "@/routes";
import { SignIn } from "@/screens/SignIn";
import theme from "@/themes/index";
import "expo-dev-client";

export default function App() {
  return (
    <AppProvider id={EXPO_PUBLIC_REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          <StatusBar backgroundColor="transparent" translucent />
          <UserProvider fallback={SignIn}>
            <RealmProvider
              schema={[Historic, User]}
              sync={{
                flexible: true,
              }}
            >
              <Provider store={userStore}>
                <Routes />
              </Provider>
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
