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
  &.cart {
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categorysCollection = collection(db, "carCategories");
      const categorysSnapshot = await getDocs(categorysCollection);
      const categorys = categorysSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarCategory(categorys);

      const carsCollection = collection(db, "cars");
      const carsSnapshot = await getDocs(carsCollection);
      const cars = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarList(cars);
      setFilteredCars(cars);
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

  const handleFocus = () => {
    setFilteredCars(carList); // 모든 차량 데이터를 필터링된 목록에 설정
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // 입력한 검색어를 포함한 차량 목록 필터링
    const filtered = carList.filter((car) =>
      car.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  console.log(filteredCars);
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
              <CarTypeList>
                <LinkA to={"/cart"} className="cart">
                  <b className={styles.sell}>장바구니</b>
                </LinkA>
              </CarTypeList>
            </>
          ) : (
            <></>
          )}
        </CarType>
        <div className={styles.searchInput}>
          <input
            type="text"
            placeholder="차량 검색"
            value={searchQuery}
            onChange={handleSearchChange} // 입력값 변경 시 상태 업데이트
            onFocus={handleFocus} // 포커스 시 전체 차량 목록 표시
            className={styles.inputField}
          />
          {searchQuery && (
            <ul>
              {filteredCars.map((filteredCar) => (
                <li key={filteredCar.id}>
                  <span>{filteredCar.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
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
