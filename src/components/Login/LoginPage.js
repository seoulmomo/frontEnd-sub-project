import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../firebase/fbInstance";
import styles from "./LoginPage.module.css";
import { KAKAO_AUTH_URL } from "../../config/kakaoConfig";
import kakaoImg from "../../assets/img/kakao_login_small.png";

const LoginBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const UserAuth = styled.div`
  max-width: 520px;
  width: 100%;
  margin: 50px auto 0;
  padding: 0 15px;
  background: #fff;
`;

const LoginH1 = styled.h1`
  text-align: center;
  margin: 20px auto;
`;
const LoginSecFieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0;
  outline: none;
`;
const Form = styled.form`
  display: grid;
  gap: 10px;
`;
const Legend = styled.legend`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
`;
const LoginInput = styled.input`
  color: #000;
  width: 496px;
  height: 3.5rem;
  padding: 18px 12px;
  border: 1px solid #e3e3e3;
  background-color: #fff;
  letter-spacing: -0.2px;
  font-size: 0.9rem;
`;
const LoginSubBtn = styled.div`
  display: flex;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  height: 36px;
`;
const LoginMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-auto-flow: column;
`;
const LoginMenuList = styled.li`
  padding: 0 20px;
  cursor: pointer;
`;
const LoginBtn = styled.div`
  background-color: #d50527;
  transition: all 0.15s linear;
  border-radius: 5px;
`;
const Button = styled.button`
  width: 100%;
  height: 60px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
`;
const LinkSignIn = styled(Link)`
  padding: 0 20px;
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      data = await signInWithEmailAndPassword(authService, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <LoginBody>
      <UserAuth>
        <LoginH1>로그인</LoginH1>
        <div className="loginSection">
          <LoginSecFieldset>
            <Legend>회원정보 입력</Legend>
            <Form onSubmit={onSubmit}>
              <LoginInput
                type="text"
                name="email"
                required
                title="이메일 입력"
                placeholder="이메일를 입력하세요"
                value={email}
                onChange={onChange}
              />
              <LoginInput
                type="password"
                name="password"
                required
                title="비밀번호 입력"
                value={password}
                placeholder="비밀번호를 입력하세요"
                onChange={onChange}
              />
              <LoginSubBtn>
                <LoginMenu>
                  <LoginMenuList>ID/PW 찾기</LoginMenuList>
                  <LoginMenuList>
                    <LinkSignIn to={"/signUp"} title="signUp">
                      회원가입
                    </LinkSignIn>
                  </LoginMenuList>
                </LoginMenu>
              </LoginSubBtn>
              <div className={styles.otherLogin}>
                <button type="button" className={styles.kakaoBtn}>
                  <Link to={KAKAO_AUTH_URL}>
                    <img src={kakaoImg} />
                  </Link>
                </button>
              </div>
              <LoginBtn>
                <Button>
                  <span className="text">로그인</span>
                </Button>
              </LoginBtn>
            </Form>
          </LoginSecFieldset>
        </div>
      </UserAuth>
    </LoginBody>
  );
};

export default LoginPage;
