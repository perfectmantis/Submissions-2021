import { Platform } from "react-native";

import Colors from "./color";

export default {
  colors: Colors,
  text: {
    color: Colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
