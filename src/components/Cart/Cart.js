import React, { useEffect, useState } from "react";
import PaymentModal from "../PaymentModal/PaymentModal";
import styles from "./Cart.module.css";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/fbInstance";

export default function Cart() {
  const [data, setData] = useState(null);
  const [cartList, setCartList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cartItemsCollection = collection(db, "cartItems");
      const cartItemsSnapshot = await getDocs(cartItemsCollection);
      const cartItems = cartItemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        quantity: doc.data().quantity || 0,
      }));
      setCartList(cartItems);
    };
    fetchData();
  }, []);

  const formatPrice = (price) => {
    return (price * 10000).toLocaleString() + " 원"; // 가격 포맷팅 함수
  };

  const handleIncreaseQuantity = async (cartItemId) => {
    setCartList((prevList) => {
      return prevList.map((item) => {
        if (item.id == cartItemId) {
          const newQuantity = (item.quantity || 0) + 1;
          const itemRef = doc(db, "cartItems", cartItemId);
          setDoc(itemRef, { quantity: newQuantity }, { merge: true });
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const handleDecreaseQuantity = async (cartItemId) => {
    setCartList((prevList) => {
      return prevList.reduce((acc, item) => {
        if (item.id == cartItemId) {
          const newQuantity = item.quantity - 1;
          const itemRef = doc(db, "cartItems", cartItemId);

          if (newQuantity > 0) {
            setDoc(itemRef, { quantity: newQuantity }, { merge: true });
            acc.push({ ...item, quantity: newQuantity });
          } else {
            deleteDoc(itemRef);
            console.log(`Item with id ${cartItemId} deleted from Firestore`);
            return acc;
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const totalPrice = cartList.reduce((acc, item) => {
    return acc + item.price * item.quantity; // 각 아이템의 가격 * 수량을 더함
  }, 0);

  const totalQuantity = cartList.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const cartData = { price: totalPrice, quantity: totalQuantity };

  const handlePurchaseClick = () => {
    setIsModalOpen(true); // 결제 모달 열기
  };

  return (
    <div className={styles.cartMain}>
      <h1>장바구니</h1>
      <div className={styles.cart}>
        <ul>
          {cartList.map((cartItem) => (
            <li key={cartItem.id} className={styles.cartLi}>
              <img src={`/assets/${cartItem.image}`} alt={cartItem.name} />
              <div>
                <span className={styles.cartItemName}>{cartItem.name}</span>
                <span className={styles.cartItemPrice}>
                  {formatPrice(cartItem.price * cartItem.quantity)}{" "}
                </span>
                <div className={styles.cartItemBtn}>
                  <button
                    onClick={() => handleDecreaseQuantity(String(cartItem.id))}
                  >
                    -
                  </button>
                  <span className={styles.cartItemQuantity}>
                    {cartItem.quantity || 0}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(String(cartItem.id))}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.cartTotalPrice}>
          주문 금액 : {formatPrice(totalPrice)}
        </div>
        <button
          type="button"
          onClick={handlePurchaseClick}
          className={styles.cartBuyBtn}
        >
          <span>구매하기</span>
        </button>
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          carData={cartData}
        />
      </div>
    </div>
  );
}
