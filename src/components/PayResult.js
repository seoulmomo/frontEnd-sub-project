import React from "react";
import axios from "axios";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Button = styled.button``;

const PayResult = () => {
  const location = useLocation();
  console.log(location);
  const url = location.search;
  const pgToken = url.split("=")[1];
  console.log(pgToken);

  const navigate = useNavigate();

  const handleApprove = async () => {
    try {
      const response = await axios.post(
        "https://kapi.kakao.com/v1/payment/approve",
        {
          cid: "TC0ONETIME", // 가맹점 CID
          tid: window.localStorage.getItem("tid"),
          partner_order_id: "partner_order_id", // 가맹점 주문번호
          partner_user_id: "partner_user_id", // 가맹점 회원 ID
          pg_token: pgToken,
        },
        {
          headers: {
            Authorization: `KakaoAK 5dae49a7d8aeaea2602805ea8f82575a`, // 카카오톡 API 접속 로그인 후 내 애플리케이션 Admin키 저장
            "Content-type": `application/x-www-form-urlencoded;charset=utf-8`,
          },
        }
      );

      console.log(response.data); // 결제 요청 결과 확인
      console.log(response.data.amount); // 가격확인
      console.log(response.data.amount.total); // 가격확인
      console.log(response.data.quantity); //수량 확인

      // 결제 완료 후 창을 닫는 대신 리디렉션
      navigate("/"); // 홈 페이지로 리디렉션
    } catch (error) {
      console.error("에러입니다1.");
      console.error(error);
    }
  };

  return (
    <Button onClick={handleApprove}>버튼을 누르면 결제가 완료됩니다.</Button>
  );
};

export default PayResult;
