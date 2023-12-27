import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import './SignUpScreenCss.css';
import * as React from 'react';

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [btnAvailable, setBtnAvailable] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'id') setUserID(e.target.value);
    if (e.target.name === 'pw') setUserPW(e.target.value);
  };

  const successSignUp = async () => {
    const us = new userService();
    const response = await us.signUp(userID, userPW);
    if (response === undefined) console.log('통신 불량');
    else {
      if (response.status === 200) {
        setErrorMsg(null);
        console.log('signup success');
        const signInResponse = await us.signIn(userID, userPW);
        if (signInResponse.status === 200) {
          let realData = signInResponse.data.data;
          await us.saveInfo(
            realData.accessToken,
            realData.refreshToken,
            realData.memberId
          );
          navigate('/main');
        } else {
          alert(
            '회원가입 이후 로그인에 실패했습니다. 로그인 화면으로 돌아갑니다.'
          );
          navigate('/');
        }
      } else {
        setErrorMsg(response.response.data.message);
        alert('회원가입에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    if (userID.length !== 0 && userPW.length !== 0) setBtnAvailable(true);
    else setBtnAvailable(false);
  }, [userID.length, userPW.length]);

  const moveToLogin = async () => {
    navigate('/');
  };

  return (
    <div className='Container'>
      <div className='Wrapper'>
        <h1>회원 가입</h1>
        <h4>OrderCount에 오신 것을 환영합니다.</h4>
        <input
          className='input'
          type='text'
          name='id'
          placeholder='아이디'
          value={userID}
          onChange={handleChange}
        />
        <input
          className='input'
          type='text'
          name='pw'
          value={userPW}
          placeholder='비밀번호'
          onChange={handleChange}
        />
        {errorMsg === null ? null : (
          <span className='errorMsg'> {errorMsg}</span>
        )}
        {btnAvailable === true ? (
          <button className='SignUpBtn' type='button' onClick={successSignUp}>
            회원가입
          </button>
        ) : (
          <button
            className='SignUpBtnFail'
            type='button'
            onClick={() => setErrorMsg('로그인 정보를 입력하세요.')}
          >
            회원가입
          </button>
        )}
        <button className='MoveToLogin' type='button' onClick={moveToLogin}>
          로그인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default SignUpScreen;
