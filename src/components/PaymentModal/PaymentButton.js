// import React, { useState } from 'react';
// import { loadTossPayments } from '@tosspayments/payment-sdk';

// const PaymentButton = ({ isOpen, onClose, carData }) => {
//   const clientKey = process.env.toss_payments_client_key;
//   const originUrl = process.env.originUrl; // 환경변수에 등록해야함. dev의 경우 "http://localhost:3000" 이 되겠고, prod의 경우 도메인이 되겠지

//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');

//   const payment = () => {
//     loadTossPayments(clientKey).then(tossPayments => {
//       tossPayments.requestPayment('카드', {
//         amount: /* 결제할 금액 */, // 필요한 금액으로 교체하세요
//         orderId: /* '${상품 주문번호}' */, // 대충 날짜를 조합하든가 uuid를 사용하는 방법도..
//         orderName: /* '${상품이름}' */,
//         customerName: /* '${주문자 이름}' */,
//         successUrl: `https://${originUrl}/success`, // ${결제 성공 후 redirect할 url}
//         failUrl: `https://${originUrl}/fail`, // ${결제 실패한 경우 redirect할 url}
//       })
//       .catch(function (error) {
//         if (error.code === 'USER_CANCEL') {
//           // 결제 고객이 결제창을 닫았을 때 에러 처리
//         } else if (error.code === 'INVALID_CARD_COMPANY') {
//           // 유효하지 않은 카드 코드에 대한 에러 처리
//         }
//       });
//     });
//   };

//   if (!isOpen) return null;

//   return React.createElement(
//     'div',
//     { className: styles.modalOverlay },
//     React.createElement(
//       'div',
//       { className: styles.modalContent },
//       React.createElement('h2', null, '구매하기'),
//       React.createElement('label', null,
//         '이름:',
//         React.createElement('input', {
//           type: 'text',
//           value: name,
//           onChange: (e) => setName(e.target.value),
//           required: true,
//         })
//       ),
//       React.createElement('label', null,
//         '전화번호:',
//         React.createElement('input', {
//           type: 'tel',
//           value: phone,
//           onChange: (e) => setPhone(e.target.value),
//           required: true,
//         })
//       ),
//       React.createElement('label', null,
//         '주소:',
//         React.createElement('input', {
//           type: 'text',
//           value: address,
//           onChange: (e) => setAddress(e.target.value),
//           required: true,
//         })
//       ),
//       React.createElement('button', { onClick: payment }, '결제하기'),
//       React.createElement('button', { onClick: onClose }, '닫기')
//     )
//   );
// };

// export default PaymentButton;
