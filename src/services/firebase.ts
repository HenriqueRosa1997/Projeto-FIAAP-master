import { Platform } from "react-native";

/* eslint-disable @typescript-eslint/no-require-imports */
const firebase =
  Platform.OS === "web"
    ? require("./firebase.web")
    : require("./firebase.native");
/* eslint-enable @typescript-eslint/no-require-imports */

export const auth = firebase.auth;
export const db = firebase.db;
export const functions = firebase.functions;
