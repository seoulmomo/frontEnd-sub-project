import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/fbInstance";
import { collection, getDocs } from "firebase/firestore";
import styles from "./Zzim.module.css";
import ZzimPagination from "./ZzimPagination";

export default function Zzim() {
  const [zzimList, setZzimList] = useState([]);
  const [zzimCurrentPage, setZzimCurrentPage] = useState(1);
  const [isZzimListVisible, setIsZzimListVisible] = useState(false);

  const zzimPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const zzimsCollection = collection(db, "zzims");
      const zzimsSnapshot = await getDocs(zzimsCollection);

      const zzims = zzimsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setZzimList(zzims);
    };
    fetchData();
  }, []);

  const lastZzim = zzimCurrentPage * zzimPerPage;
  const currentZzims = zzimList.slice(lastZzim - zzimPerPage, lastZzim);
  const totalZzimPages = Math.ceil(zzimList.length / zzimPerPage);

  const toggleZzimList = () => {
    setIsZzimListVisible((prev) => !prev);
  };

  return (
    <div className={styles.zzim}>
      <div onClick={toggleZzimList} className={styles.zzimToggle}>
        <svg
          width="36px"
          height="36px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>{" "}
          </g>
        </svg>
        <span className={styles.zzimTitle}>
          찜 상품
          <span className={styles.zzimLength}>{currentZzims.length > 0 ? currentZzims.length : ""}</span>
        </span>
        {/* <img src={/assets/ + "찜하트.webp"} /> */}
      </div>
      {isZzimListVisible && (
        <div className={styles.zzimList}>
          <ul>
            {currentZzims.map((zzim) => (
              <li>
                <Link to={`/car/${zzim.id}`} state={{ id: zzim.id }}>
                  <img src={/assets/ + zzim.image} />
                </Link>
              </li>
            ))}
          </ul>
          <ZzimPagination
            currentPage={zzimCurrentPage}
            totalPages={totalZzimPages}
            onPageChange={setZzimCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
