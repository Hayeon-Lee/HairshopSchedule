import { userService } from '../services/userService';
import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MainScreen = () => {
  const us = new userService();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const logout = async () => {
    const logoutInfo = await us.deleteInfo();
    if (logoutInfo === true) {
      alert('성공적으로 로그아웃 됐습니다.');
      navigate('/');
    }
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
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            console.log(date);
          }}
        />
      </div>
    </div>
  );
};

export default MainScreen;
