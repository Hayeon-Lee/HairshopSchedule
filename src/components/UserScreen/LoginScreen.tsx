import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import styles from './LoginScreenCss.module.css';
import styled from 'styled-components';
import * as React from 'react';

const Frame = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
`;
const Container = styled(Frame)`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
`;
const Wrapper = styled(Frame)`
  width: 90vw;
  height: 80vh;
  margin: 0 auto;
  flex-direction: column;
`;

const LoginScreen = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');
  const [userPW, setUserPW] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [btnAvailable, setBtnAvailable] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'id') setUserID(e.target.value);
    if (e.target.name === 'pw') setUserPW(e.target.value);
  };

  const successLogin = async () => {
    const us = new userService();
    const response = await us.signIn(userID, userPW);
    if (response === undefined) console.log('통신 불량');
    else {
      if (response.status === 200) {
        setErrorMsg(null);
        let realData = response.data.data;
        await us.saveInfo(
          realData.accessToken,
          realData.refreshToken,
          realData.memberId
        );
        navigate('/main');
      } else {
        console.log(response);
        setErrorMsg(response.response.data.message);
      }
    }
  };

  const moveToSignUp = async () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (localStorage.getItem('loginStatus') !== null) navigate('/main');
  }, []);

  useEffect(() => {
    if (userID.length !== 0 && userPW.length !== 0) setBtnAvailable(true);
    else setBtnAvailable(false);
  }, [userID, userPW]);

  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <h1>Login</h1>
        <h4>지그재그 파트너센터와 동일한 아이디, 비밀번호를 입력해 주세요.</h4>
        <input
          className={styles.input}
          type='text'
          name='id'
          placeholder='아이디'
          value={userID}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          type='text'
          name='pw'
          value={userPW}
          placeholder='비밀번호'
          onChange={handleChange}
        />
        {errorMsg === null ? null : (
          <span className={styles.errorMsg}> {errorMsg}</span>
        )}
        {btnAvailable === true ? (
          <button
            className={styles.LoginBtn}
            type='button'
            onClick={successLogin}
          >
            로그인
          </button>
        ) : (
          <button
            className={styles.LoginBtnFail}
            type='button'
            onClick={() => setErrorMsg('로그인 정보를 입력하세요.')}
          >
            로그인
          </button>
        )}
        <button
          className={styles.MoveToSignUp}
          type='button'
          onClick={moveToSignUp}
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
