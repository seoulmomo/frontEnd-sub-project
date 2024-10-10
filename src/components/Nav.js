import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../firebase/fbInstance";
import styles from "./Nav.module.css";
import logo from "../assets/img/logo.jpeg";
import { db } from "../firebase/fbInstance";
import { collection, getDocs, query, where } from "firebase/firestore";

const Head = styled.div`
  height: 80px;
  background: #d50527;
`;

const Header = styled.div`
  display: flex;
  width: 1280px;
  height: 80px;
  margin: 0 auto;
  position: relative;
  align-items: center;
`;

const CarType = styled.ul`
  display: flex;
  list-style: none;
`;

const CarTypeList = styled.li`
  padding: 16px 13px;
  color: white;
`;
const Logo = styled.section`
  width: 80px;
`;
const Login = styled.section`
  margin-left: auto;
`;
const LogOutBtn = styled.button`
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.5s;
  }
`;

const LinkA = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #333;
  &.car {
    display: block;
    position: relative;
    padding: 16px 13px 0;
    color: white;
    font-weight: bold;
  }
  &.carSell {
    display: block;
    position: relative;
    padding: 16px 13px 0;
    color: white;
  }
  &.loginBtn {
    color: white;
    font-size: 16px;
    &:hover {
      transition: none;
      color: white;
    }
  }
  &:hover {
    color: cornflowerblue;
    transition: 0.5s;
  }
`;

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [carCategory, setCarCategory] = useState([]);
  const location = useLocation();
  const category = String(location.state?.category);

  useEffect(() => {
    const fetchData = async () => {
      const categorysCollection = collection(db, "carCategories");
      const categorysSnapshot = await getDocs(categorysCollection);
      const categorys = categorysSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarCategory(categorys);
    };
    fetchData();

    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [category]);

  const navigate = useNavigate();
  const onLogOut = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <Head>
      <Header className="header">
        <Logo>
          <LinkA to={"/"} title="logo">
            <img src={logo} className={styles.logo} />
          </LinkA>
        </Logo>
        <CarType className="carType">
          {carCategory.map((category) => (
            <CarTypeList>
              <LinkA
                to={`/carCategory/${category.name}`}
                className="car"
                state={{ category: category.name }}
              >
                {category.name}
                {/* <b className={styles.korea}></b> */}
              </LinkA>
            </CarTypeList>
          ))}
          {isLoggedIn ? (
            <>
              <CarTypeList>
                <LinkA to={"/car"} className="carSell">
                  <b className={styles.sell}>차 판매</b>
                </LinkA>
              </CarTypeList>
              <CarTypeList>
                <LinkA to={"/car"} className="carSell">
                  <b className={styles.sell}>찜 상품</b>
                </LinkA>
              </CarTypeList>
              <CarTypeList>
                <LinkA to={"/car"} className="carSell">
                  <b className={styles.sell}>차 비교</b>
                </LinkA>
              </CarTypeList>
            </>
          ) : (
            <></>
          )}
        </CarType>

        <Login className="login">
          {isLoggedIn ? (
            <LogOutBtn onClick={onLogOut}>로그아웃</LogOutBtn>
          ) : (
            <LinkA to={"/login"} title="login" className="loginBtn">
              로그인
            </LinkA>
          )}
        </Login>
      </Header>
    </Head>
  );
};

export default Nav;
