import { Routes, Route } from "react-router-dom";
import LoginPage from "../components/Login/LoginPage";
import MainPage from "../components/MainPage";
import SignUp from "../components/SignUp/SignUp";
import CarPage from "../components/CarPage/CarPage";
import KakaoAuth from "../components/Login/KakaoAuth";
import CarBrand from "../components/CarBrand/CarBrand";
import CarCategory from "../components/CarCategory/CarCategory";
// import KakaoHandler from "../components/Login/KakaoHandler";
// import UploadData from "../components/UploadData";
// import SignIn from "../components/SignIn";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/car/:id" element={<CarPage />} />
      <Route path="/auth/kakao/callback" element={<KakaoAuth />} />
      <Route path="/:name" element={<CarBrand />} />
      <Route path="/carCategory/:name" element={<CarCategory />} />
    </Routes>
  );
};

export default Router;
