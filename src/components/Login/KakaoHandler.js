import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const KakaoHandler = (props) => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        console.log("Authorization code:", code);
        console.log("Redirect URL:", process.env.REACT_APP_REDIRECT_URL);

        // 인가 코드가 없으면 오류 처리
        if (!code) {
          throw new Error("Authorization code is missing");
        }

        const response = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        // 백엔드가 응답을 성공적으로 처리한 경우
        console.log("Response from backend:", response);

        // 백엔드에서 필요한 데이터를 받아서 처리
        localStorage.setItem("email", response.data.account.kakaoName);
        navigate("/");
      } catch (error) {
        // 응답이 실패했을 때 오류 로그
        if (error.response) {
          console.error("Error response from backend:", error.response);
        } else {
          console.error("Error during Kakao login:", error.message);
        }
      }
    };

    if (code) {
      kakaoLogin();
    }
  }, [code, navigate]);

  return <div>로그인 중입니다...</div>;
};

export default KakaoHandler;
