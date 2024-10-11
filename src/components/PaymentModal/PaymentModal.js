import React, { useState, useEffect } from "react";
import styles from "./PaymentModal.module.css";

const PaymentModal = ({ isOpen, onClose, carData }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // 카카오 SDK 로드
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true; // 비동기적으로 로드
      document.body.appendChild(script);
    }

    const initializeKakao = () => {
      const kakaoKey = process.env.REACT_APP_KAKAO_KEY;
      console.log("Kakao Key:", kakaoKey); // 키 확인
      if (kakaoKey) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoKey); // 카카오 애플리케이션의 JavaScript 키
          console.log("Kakao SDK initialized");
        } else {
          console.log("Kakao SDK already initialized");
        }
      } else {
        console.error("Kakao API 키가 제공되지 않았습니다.");
      }
      
      // Kakao.Pay가 정의되었는지 확인
      console.log("Kakao.Pay:", window.Kakao.Pay);
    };

    // 스크립트가 로드된 후 초기화
    if (window.Kakao) {
      initializeKakao();
    } else {
      const script = document.querySelector(`script[src="https://developers.kakao.com/sdk/js/kakao.js"]`);
      script.onload = initializeKakao; // 스크립트가 로드된 후 초기화
    }

  }, []);

  const handlePayment = () => {
    if (!name || !phone || !address) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    // Kakao SDK와 Pay가 정의되었는지 확인
    if (!window.Kakao || !window.Kakao.Pay) {
      console.error("Kakao.Pay가 정의되지 않았습니다. 카카오 SDK를 확인하세요.");
      return;
    }

    // 카카오페이 결제 요청
    window.Kakao.Pay.request({
      partner_order_id: carData.id,
      partner_user_id: phone,
      item_name: carData.name,
      quantity: 1,
      total_amount: carData.price,
      tax_free_amount: 0,
      approval_url: "http://localhost:3000/PayResult",
      cancel_url: "http://localhost:3000/kakaoPay",
      fail_url: "http://localhost:3000/kakaoPay",
    });
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
        <button onClick={handlePayment}>결제하기</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default PaymentModal;
