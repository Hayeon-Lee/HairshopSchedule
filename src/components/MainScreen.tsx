import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { orderListService } from '../services/orderListService';
import { userService } from '../services/userService';

const listData = [
  {
    zigzagProductId: '1',
    productName: '짱 쩌는 바지',
    optionOrderInfos: [
      {
        optionName: '색상: 진청 / size : M',
        count: 9,
        oldestOrderDateTime: '2024-01-11T07:25:59.322Z',
        inventoryQuantity: 1,
        orderInfos: [
          {
            orderNumber: '111111111',
            orderItemNumber: '111111111',
            orderQuantity: 5,
            orderDateTime: '2024-01-11T07:25:59.322Z',
          },
        ],
      },
    ],
  },
  {
    zigzagProductId: '2',
    productName: '도라방스 치마',
    optionOrderInfos: [
      {
        optionName: '색상: 진청 / size : M',
        count: 9,
        oldestOrderDateTime: '2024-01-11T07:25:59.322Z',
        inventoryQuantity: 1,
        orderInfos: [
          {
            orderNumber: '111111111',
            orderItemNumber: '111111111',
            orderQuantity: 5,
            orderDateTime: '2024-01-11T07:25:59.322Z',
          },
        ],
      },
    ],
  },
  {
    zigzagProductId: '3',
    productName: '천지개벽 블라우스',
    optionOrderInfos: [
      {
        optionName: '색상: 진청 / size : M',
        count: 9,
        oldestOrderDateTime: '2024-01-11T07:25:59.322Z',
        inventoryQuantity: 1,
        orderInfos: [
          {
            orderNumber: '111111111',
            orderItemNumber: '111111111',
            orderQuantity: 5,
            orderDateTime: '2024-01-11T07:25:59.322Z',
          },
        ],
      },
    ],
  },
  {
    zigzagProductId: '4',
    productName: '개졸귀탱 떡볶이 코트',
    optionOrderInfos: [
      {
        optionName: '색상: 진청 / size : M',
        count: 9,
        oldestOrderDateTime: '2024-01-11T07:25:59.322Z',
        inventoryQuantity: 1,
        orderInfos: [
          {
            orderNumber: '111111111',
            orderItemNumber: '111111111',
            orderQuantity: 5,
            orderDateTime: '2024-01-11T07:25:59.322Z',
          },
        ],
      },
    ],
  },
];

const MainScreen = () => {
  const us = new userService();
  const navigate = useNavigate();
  const orderListServiceClass = new orderListService();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [orderList, setOrderList] = useState([]);

  const logout = async () => {
    const logoutInfo = await us.deleteInfo();
    if (logoutInfo === true) {
      alert('성공적으로 로그아웃 됐습니다.');
      navigate('/');
    }
  };

  const getOrderedList = async () => {
    const startDateStr =
      String(startDate.getFullYear()) +
      '-' +
      String(startDate.getMonth() + 1) +
      '-' +
      String(startDate.getDate());
    const endDateStr =
      String(endDate.getFullYear()) +
      '-' +
      String(endDate.getMonth() + 1) +
      '-' +
      String(endDate.getDate());

    //const response = orderListServiceClass.getOrderList(startDateStr,endDateStr);
    //console.log(response);
    setOrderList(listData);
  };

  return (
    <div className=''>
      <div className=''>
        <button type='button' onClick={logout}>
          로그아웃하기
        </button>
      </div>
      <div className='OrderPeriod'>
        <span>조회 기간</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <button type='button' onClick={getOrderedList}>
          검색하기
        </button>
        <table>
          <th>제품 아이디</th>
          <th>제품명</th>
          <th>상품 옵션</th>
          <th>가장 오래된 주문</th>
          <th>수량</th>
          <th>재고 수량</th>
          {orderList
            ? orderList.map((item) => (
                <tr>
                  <td>{item.zigzagProductId}</td>
                  <td>{item.productName}</td>
                  <td>{item.optionOrderInfos[0].optionName}</td>
                  <td>{item.optionOrderInfos[0].oldestOrderDateTime}</td>
                  <td>{item.optionOrderInfos[0].count}</td>
                  <td>{item.optionOrderInfos[0].inventoryQuantity}</td>
                </tr>
              ))
            : null}
        </table>
      </div>
    </div>
  );
};

export default MainScreen;
