import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
//import styles from './LoginScreenCss.module.css';
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

const H1 = styled.h1`
  color: #182134;
  line-height: normal;
`;
const H4 = styled.h4`
  color: #000;
  line-height: normal;
  margin-top: 0.1vh;
  padding-bottom: 0.2vh;
`;

const Input = styled.input`
  width: 30vw;
  height: 9vh;
  flex-shrink: 0;
  border-radius: 10px;
  border: 2px solid #c6c6c6;
  font-size: 1.2vw;
  margin-bottom: 2vh;
  margin-top: 1vh;
  &:focus {
    outline: none;
    border: 2px solid #ff588e;
  }
`;

const ErrorMsg = styled.span`
  color: #f67070;
  font-size: 1vw;
  font-style: normal;
`;

const LoginBtn = styled.button<{
  backgroundColor: string;
  borderColor: string;
}>`
  width: 30vw;
  height: 9vh;
  flex-shrink: 0;
  border-radius: 15px;
  border: none;
  margin-top: 4vh;
  font-size: 1vw;

  background: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.borderColor};
`;

const SignUpBtn = styled.button`
  margin-top: 1vh;
  display: flex;
  width: 20vw;
  height: 5vh;
  justify-content: center;
  flex-shrink: 0;
  color: #3a4f7a;
  text-align: center;
  font-size: 1vw;
  font-weight: 300;
  font-style: normal;
  line-height: normal;
  border: none;
  background-color: white;
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
    <Container>
      <Wrapper>
        <H1>Login</H1>
        <H4>지그재그 파트너센터와 동일한 아이디, 비밀번호를 입력해 주세요.</H4>
        <Input
          type='text'
          name='id'
          placeholder='아이디'
          value={userID}
          onChange={handleChange}
        ></Input>
        <Input
          type='text'
          name='pw'
          value={userPW}
          placeholder='비밀번호'
          onChange={handleChange}
        ></Input>
        {errorMsg === null ? null : <ErrorMsg>{errorMsg}</ErrorMsg>}
        {btnAvailable === true ? (
          <LoginBtn
            backgroundColor='#ff588e'
            borderColor='#ff588e'
            type='button'
            onClick={successLogin}
          >
            로그인
          </LoginBtn>
        ) : (
          <LoginBtn
            backgroundColor='#c6c6c6'
            borderColor='#c6c6c6'
            type='button'
            onClick={() => setErrorMsg('로그인 정보를 입력하세요.')}
          >
            로그인
          </LoginBtn>
        )}
        <SignUpBtn type='button' onClick={moveToSignUp}>
          회원가입하기
        </SignUpBtn>
      </Wrapper>
    </Container>
  );
};

export default LoginScreen;
