import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../firebase/fbInstance";
import styles from "./SignUp.module.css";

const SignUp = () => {
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

  const onCreateSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      data = await createUserWithEmailAndPassword(authService, email, password);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className={styles.body}>
      <div className={styles.UserAuth}>
        <h1>회원가입</h1>
        <form onSubmit={onCreateSubmit}>
          <fieldset>
            <legend>회원정보 입력</legend>
            <div className={styles.id}>
              <input
                type="text"
                name="email"
                required
                className={styles.userId}
                title="이메일 입력"
                placeholder="이메일를 입력하세요"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className={password}>
              <input
                type="password"
                name="password"
                required
                title="비밀번호 입력"
                className={styles.userPw}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={onChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <ul>
              <li className={styles.listItem}>
                <input
                  type="checkbox"
                  id="joinTerms"
                  className={styles.requiredList}
                  required
                />
                <label htmlFor="joinTerms">
                  <b>[필수]</b>
                  이용약관 동의
                </label>
              </li>
              <li className={styles.listItem}>
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  className={styles.requiredList}
                  required
                />
                <label htmlFor="privacyPolicy">
                  <b>[필수]</b>
                  개인정보 수집 동의
                </label>
              </li>
            </ul>
          </fieldset>
          <div className={styles.signUpBtn}>
            <p>"만 17세 이하는 회원가입이 제한됩니다"</p>
            <button type="submit" className={styles.confirmBtn}>
              <span className={styles.text}>회원가입</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
