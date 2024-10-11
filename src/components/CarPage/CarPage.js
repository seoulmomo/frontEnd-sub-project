import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/fbInstance";
import styles from "./CarPage.module.css";
import Zzim from "../Zzim/Zzim";
import PaymentModal from "../PaymentModal/PaymentModal";

const CarPage = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = String(location.state?.id);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("ID가 null 또는 undefined입니다.");
        return; // ID가 유효하지 않을 때 데이터 조회 중지
      }
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("문서 데이터:", docSnap.data());
          setData(docSnap.data());
        } else {
          console.log("해당 문서가 없습니다!");
        }
      } catch (error) {
        console.error("문서 조회 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [id]);

  // 찜 상품 등록
  const handleAddToZzimlist = async () => {
    if (!data) {
      console.error("찜 목록에 추가할 데이터가 없습니다.");
      return;
    }
    try {
      const zzimsRef = doc(db, "zzims", id); // 자동차 ID를 문서 ID로 사용
      await setDoc(zzimsRef, {
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
      });
      alert("차량이 찜 상품에 추가되었습니다!"); // 사용자에게 알림
    } catch (error) {
      console.error("찜 목록에 추가 중 오류 발생:", error);
    }
  };

  const handlePurchaseClick = () => {
    setIsModalOpen(true); // 결제 모달 열기
  };

  return (
    <div>
      <Zzim />
      {data ? (
        <div className={styles.carMain}>
          <div className={styles.carImg}>
            <img
              src={/assets/ + data.image}
              className={styles.img}
              alt={data.name}
            />
          </div>
          <div className={styles.carInfo}>
            <div className={styles.carName}>
              <h1>{data.name}</h1>
            </div>
            <div className={styles.carPrice}>
              <span>{data.price}만원</span>
            </div>
            <div className={styles.btn}>
              <button type="button" onClick={handleAddToZzimlist}>
                <span>찜하기</span>
              </button>
              <button type="button" onClick={handlePurchaseClick}>
                <span>구매하기</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carData={data}
      />
    </div>
  );
};

export default CarPage;
