import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.prev}
      >
        &lt;
      </button>
      {pageNumbers.map((num) => (
        <span
          key={num}
          className={num === currentPage ? styles.active : ""}
          onClick={() => onPageChange(num)}
        >
          {num}
        </span>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.next}
      >
        &gt;
      </button>
    </div>
  );
}
