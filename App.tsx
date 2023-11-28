import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider, UserProvider } from "@realm/react";
import { ThemeProvider } from "styled-components";
import { EXPO_PUBLIC_REALM_APP_ID } from "@env";
import { RealmProvider } from "app/libs/realm";
import { StatusBar } from 'expo-status-bar';
import { SignIn } from "@/screens/SignIn";
import theme from "@/themes/index";
import { Routes } from "@/routes";
import 'expo-dev-client';

export default function App() {
  return (
    <AppProvider id={EXPO_PUBLIC_REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800 }}
        >
          <StatusBar
            backgroundColor="transparent"
            translucent
          />
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}