import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    owner: "carpool-app",
    name: "carpool-expo-app",
    slug: "carpool-expo-app-slug",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/icon.png",
    userInterfaceStyle: "light",
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
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./app/assets/adaptive-icon.png",
            backgroundColor: "#000000",
        },
        package: "com.carpoolapp.carpoolexpoappslug",
    },
    web: {
        favicon: "./app/assets/favicon.png",
    },
    extra: {
        eas: {
            projectId: "e9243d6d-c96f-4d1a-b044-53c96f7e60c5",
        },
    },
});
