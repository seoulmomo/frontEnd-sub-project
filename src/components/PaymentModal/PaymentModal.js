import React, { useState } from "react";
import axios from "axios";
import styles from "./PaymentModal.module.css";

const PaymentModal = ({ isOpen, onClose, carData }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(""); // 리다이렉트 URL을 저장할 상태

  const handlePayment1m = async () => {
    if (!name || !phone || !address) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    try {
      const response = await axios.post(
        "https://kapi.kakao.com/v1/payment/ready",
        {
          cid: "TC0ONETIME", // 가맹점 CID
          partner_order_id: "partner_order_id", // 가맹점 주문번호
          partner_user_id: "partner_user_id", // 가맹점 회원 ID
          item_name: "상품판매",
          quantity: carData.quantity,
          total_amount: carData.price, // 결제 금액
          tax_free_amount: 0,
          approval_url: "http://localhost:3000/PayResult", // 결제 성공 시 리다이렉트할 URL
          cancel_url: "http://localhost:3000/kakaoPay", // 결제 취소 시 리다이렉트할 URL
          fail_url: "http://localhost:3000/kakaoPay", // 결제 실패 시 리다이렉트할 URL
        },
        {
          headers: {
            Authorization: `KakaoAK 5dae49a7d8aeaea2602805ea8f82575a`, // 카카오톡 API 접속 로그인 후 내 애플리케이션 Admin키 저장
            "Content-type": `application/x-www-form-urlencoded;charset=utf-8`,
          },
        }
      );

      console.log(response.data); // 결제 요청 결과 확인
      console.log(response.data.next_redirect_pc_url);
      console.log(response.data.tid);
      window.localStorage.setItem("tid", response.data.tid);
      setRedirectUrl(response.data.next_redirect_pc_url); // 상태에 리다이렉트 URL 저장
    } catch (error) {
      console.error("에러입니다1.");
      console.error(error.response ? error.response.data : error.message); // 에러 메시지 출력
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>구매하기</h2>
        <label>
          이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          전화번호:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <label>
          주소:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <span onMouseOver={handlePayment1m}>
          <a href={redirectUrl}>결제하기</a>
        </span>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default PaymentModal;
