import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    black: "#17202a",
    silver: "#ccd1d1",
    background: "#f4f6f6",
    blue: "#0366d6",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "System",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
