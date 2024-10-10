import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Router from "./router/router";
import { RecoilRoot } from "recoil";
import KakaoAuth from "./components/Login/KakaoAuth";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "auth/kakao/callback",
        element: <KakaoAuth />,
      },
    ],
  },
]);

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
