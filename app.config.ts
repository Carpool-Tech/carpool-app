import { ExpoConfig, ConfigContext } from "expo/config";

import * as dotenv from "dotenv";
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: process.env.EXPO_PUBLIC_OWNER,
  name: process.env.EXPO_PUBLIC_PROJECT_NAME!,
  slug: process.env.EXPO_PUBLIC_PROJECT_SLUG!,
  version: "1.0.2",
  orientation: "portrait",
  icon: "./app/assets/new_logo_dark.png",
  userInterfaceStyle: "light",
  scheme: process.env.EXPO_PUBLIC_G_CLOUD_APP_NAME,
  privacy: "unlisted",
  updates: {
    url: process.env.EXPO_PUBLIC_PROJECT_UPDATE_URL
  },
  runtimeVersion: {
    policy: "appVersion"
  },
  experiments: {
    tsconfigPaths: true,
  },
  splash: {
    image: "./app/assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#000000",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: process.env.EXPO_PUBLIC_G_CLOUD_APP_NAME,
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./app/assets/new_logo_dark.png",
      backgroundColor: "#000000",
    },
    package: process.env.EXPO_PUBLIC_G_CLOUD_APP_NAME,
  },
  web: {
    favicon: "./app/assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    },
  },
});
