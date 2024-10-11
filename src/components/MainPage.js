import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css";
import { Link } from "react-router-dom";
import { db } from "../firebase/fbInstance";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import Pagination from "./Pagination";
import Zzim from "./Zzim/Zzim";

export default function MainPage() {
  const [carBrands, setCarBrands] = useState([]);
  const [carList, setCarList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const brandsCollection = collection(db, "carBrands");
      const brandsSnapshot = await getDocs(brandsCollection);
      const brands = brandsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarBrands(brands);

      const carsCollection = collection(db, "cars");
      const carsSnapshot = await getDocs(carsCollection);

      const cars = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarList(cars);
    };

    fetchData();
  }, []);

  const handleAddToZzimlist = async (car) => {
    if (!car) {
      console.error("zzims에 추가할 데이터가 없습니다.");
      return;
    }
    try {
      const zzimsRef = doc(db, "zzims", car.id);
      await setDoc(zzimsRef, {
        id: car.id,
        name: car.name,
        price: car.price,
        image: car.image,
      });
      alert("차량이 찜 상품에 추가되었습니다!");
    } catch (error) {
      console.error("zzims에 추가하는 중 오류 발생:", error);
    }
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const currentCars = carList.slice(
    indexOfLastCar - carsPerPage,
    indexOfLastCar
  );
  const totalPages = Math.ceil(carList.length / carsPerPage);

  return (
    <div>
      <Zzim />
      <div className={styles.main}>
        <div className={styles.ad}>광고</div>
        <div className={styles.mainCar}>
          <div className={styles.searchPart}>
            <div className={styles.carBrand}>
              <h4 className={styles.searchH4}>
                <span className={styles.searchSpan}>제조사</span>
              </h4>
              <div className={styles.scrollGroup}>
                <ul>
                  {carBrands.map((brand) => (
                    <li key={brand.id} className={styles.brandList}>
                      <Link
                        to={`/${brand.name}`}
                        className={styles[brand.name.toLowerCase()]}
                        state={{ brand: brand.name }}
                      >
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.brandCar}>
            <ul className={styles.carList}>
              {currentCars.map((car) => (
                <li key={car.id} state={{ id: car.id }}>
                  <Link to={`/car/${car.id}`} state={{ id: car.id }}>
                    <img
                      src={/assets/ + car.image}
                      alt={car.name}
                      className={styles.carImg}
                    />
                    <span className={styles.carName}>{car.name}</span>
                    <span className={styles.carPrice}>{car.price}만원</span>
                    <span className={styles.carSubMenu}>
                      <input
                        type="button"
                        value="찜"
                        className={styles.carZzim}
                        onClick={() => handleAddToZzimlist(car)}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
