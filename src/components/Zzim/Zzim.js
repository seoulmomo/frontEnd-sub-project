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
      <div onClick={(onClick = { toggleZzimList })}>찜 상품</div>
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
    </div>
  );
}
