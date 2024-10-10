import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/fbInstance";
import styles from "./CarPage.module.css";
import Zzim from "../Zzim/Zzim";

const CarPage = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const id = String(location.state?.id);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("ID is null or undefined.");
        return; // id가 유효하지 않을 때 데이터 조회를 멈춤
      }
      try {
        const docRef = doc(db, "cars", id); // Firestore에서 특정 문서 참조
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document Data:", docSnap.data());
          setData(docSnap.data()); // 문서 데이터를 state에 저장
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  // 찜 상품 등록
  const handleAddToZzimlist = async () => {
    if (!data) {
      console.error("No data to add to zzims.");
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
      console.error("Error adding to zzims:", error);
    }
  };

  return (
    <div>
      <Zzim />
      {data ? (
        <div className={styles.carMain}>
          <div className={styles.carImg}>
            <img src={/assets/ + data.image} className={styles.img} />
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
              <button type="button">
                <span>구매하기</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CarPage;
