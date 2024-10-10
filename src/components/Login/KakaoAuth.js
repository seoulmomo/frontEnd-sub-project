import { useNavigate } from "react-router-dom";
import {
  CLIENT_SECRET,
  KAKAO_APP_KEY,
  REDIRECT_URI,
  REST_API_KEY,
} from "../../config/kakaoConfig";
import axios from "axios";
import { useEffect } from "react";
import {
  browserSessionPersistence,
  OAuthProvider,
  setPersistence,
  signInWithCredential,
} from "firebase/auth";
import { authService } from "../../firebase/fbInstance";
import { useRecoilState } from "recoil";
import { isLoggedInState, usernameState } from "../../store/authState"; // Recoil atom import

function KakaoAuth() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [username, setUsername] = useRecoilState(usernameState);
  const code = new URL(document.URL).searchParams.get("code");

  async function getKakaoAuthToken() {
    let payload;
    if (code) {
      payload = {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
        client_secret: CLIENT_SECRET,
      };
      console.log(payload);
    } else {
      alert("code doesn't exist, try again");
    }

    try {
      const req = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      console.log(req);

      const provider = new OAuthProvider("oidc.kakao");
      const credential = provider.credential({
        idToken: req.data.id_token,
      });

      setPersistence(authService, browserSessionPersistence).then(() => {
        signInWithCredential(authService, credential)
          .then((result) => {
            console.log(result);

            // Recoil 상태 업데이트
            setIsLoggedIn(true);
            console.log(result.user);
            setUsername(result.user.displayName);
            // localStorage.setItem("email", result.data.account.kakaoName);

            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getKakaoAuthToken();
  }, []);

  return <div>로그인 진행중</div>;
}

export default KakaoAuth;
