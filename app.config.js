import "dotenv/config";

export default {
  name: "richen-raterepo-app",
  slug: "richen-raterepo-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  android: {
    package: "com.richen.raterepo",
  },
  ios: {
    supportsTablet: true,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  sdkVersion: "38.0.0",
  extra: {
    ApolloUri: process.env.APOLLO_URI,
  },
};
