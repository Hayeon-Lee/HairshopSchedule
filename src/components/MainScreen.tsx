import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { orderListService } from '../services/orderListService';
import { userService } from '../services/userService';

import DetailToggle from '../utils/DetailToggle';

const MainScreen = () => {
  const us = new userService();
  const navigate = useNavigate();
  const orderListServiceClass = new orderListService();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [orderList, setOrderList] = useState([]);
  const [orderListCount, setOrderListCount] = useState(0);
  const [toggleStatus, setToggleStatus] = useState([]);

  const logout = async () => {
    const logoutInfo = await us.deleteInfo();
    if (logoutInfo === true) {
      alert('성공적으로 로그아웃 됐습니다.');
      navigate('/');
    }
  };

  const checkDate = (n: string) => {
    if (n.length === 1) return `0${n}`;
    else return n;
  };

  const returnDate = (fullYear: number, month: number, date: number) => {
    return (
      String(fullYear) +
      '-' +
      checkDate(String(month)) +
      '-' +
      checkDate(String(date))
    );
  };

  const getOrderedList = async () => {
    const startDateStr = returnDate(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate()
    );
    const endDateStr = returnDate(
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      endDate.getDate()
    );

    try {
      const data = await (
        await orderListServiceClass.getOrderList(startDateStr, endDateStr)
      ).data.productOptionOrderInfos;

      setOrderList(data);
    } catch (e) {
      console.log(e);
    }
  };

  const detailToggleClick = (index) => {
    let copy = [...toggleStatus];
    copy[index] = !copy[index];
    setToggleStatus(copy);
  };

  useEffect(() => {
    setToggleStatus(Array.from({ length: orderList.length }, (i) => false));
  }, [orderListCount]);

  useEffect(() => {
    setOrderListCount(orderList.length);
  }, [orderList]);

  useEffect(() => {}, [toggleStatus]);

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
          <thead>
            <tr key='tableHead'>
              <th key='button'>상세보기</th>
              <th key='id'>제품 아이디</th>
              <th key='name'>제품명</th>
              <th key='option'>상품 옵션</th>
              <th key='orderDate'>가장 오래된 주문</th>
              <th key='count'>수량</th>
              <th key='inventory'>재고 수량</th>
            </tr>
          </thead>
          {orderList.length !== 0
            ? orderList.map((item, index) => (
                <tbody>
                  <tr key={item.zigzagProductId}>
                    <td key='button'>
                      <button
                        type='button'
                        onClick={() => detailToggleClick(index)}
                      >
                        상세보기
                      </button>
                    </td>
                    <td key='id'>{item.zigzagProductId}</td>
                    <td key='name'>{item.productName}</td>
                    <td key='optionName'>
                      {item.optionOrderInfos[0].optionName}
                    </td>
                    <td key='dateTime'>
                      {item.optionOrderInfos[0].oldestOrderDateTime}
                    </td>
                    <td key='count'>{item.optionOrderInfos[0].count}</td>
                    <td key='inventoryQuantity'>
                      {item.optionOrderInfos[0].inventoryQuantity}
                    </td>
                  </tr>
                  {toggleStatus[index] ? (
                    <DetailToggle list={item.optionOrderInfos[0].orderInfos} />
                  ) : null}
                </tbody>
              ))
            : null}
        </table>
      </div>
    </div>
  );
};

export default MainScreen;
