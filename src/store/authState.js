import { atom } from "recoil";
import firebaseApp from "../firebase/fbInstance";

// Firebase 세션 데이터를 가져옴
const sessionData = window.sessionStorage.getItem(
  `firebase:authUser:${firebaseApp.apiKey}:[DEFAULT]`
);

let displayName = null;
let userImage = null;
let loggedinState = false;
if (sessionData) {
  const userData = JSON.parse(sessionData);
  loggedinState = true;
  displayName = userData.displayName;
  userImage = userData.photoURL;
}

// Recoil Atom 설정
export const isLoggedInState = atom({
  key: "isLoggedInState", // 고유 키값
  default: loggedinState,
});

export const usernameState = atom({
  key: "usernameState",
  default: displayName,
});

export const idTokenState = atom({
  key: "idTokenState",
  default: null,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: null,
});

export const photoURLState = atom({
  key: "photoURLState",
  default: userImage,
});
