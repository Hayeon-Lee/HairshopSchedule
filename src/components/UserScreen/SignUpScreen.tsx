import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
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
  font-family: 'TheJamsil5Bold';
  font-size: 4vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const H4 = styled.h4`
  color: #000;
  line-height: normal;
  margin-top: 0.1vh;
  padding-bottom: 0.2vh;
  font-family: 'TheJamsil5Bold';
  font-size: 1vw;
  font-style: normal;
  font-weight: 400;
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
  font-family: 'TheJamsil5Bold';
  font-weight: 100;
  &:focus {
    outline: none;
    border: 2px solid #ff588e;
  }
`;

const ErrorMsg = styled.span`
  color: #f67070;
  font-size: 1vw;
  font-style: normal;
  font-family: 'TheJamsil5Bold';
  font-weight: 100;
`;

const SignUpBtn = styled.button<{
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
  font-family: 'TheJamsil5Bold';

  background: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.borderColor};
`;

const LoginBtn = styled.button`
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
  font-family: 'TheJamsil5Bold';
`;

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
    <Container>
      <Wrapper>
        <H1>회원 가입</H1>
        <H4>OrderCount에 오신 것을 환영합니다.</H4>
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
          <SignUpBtn
            backgroundColor='#ff588e'
            borderColor='#ff588e'
            type='button'
            onClick={successSignUp}
          >
            회원가입
          </SignUpBtn>
        ) : (
          <SignUpBtn
            backgroundColor='#c6c6c6'
            borderColor='#c6c6c6'
            type='button'
            onClick={() => setErrorMsg('로그인 정보를 입력하세요.')}
          >
            회원가입
          </SignUpBtn>
        )}
        <LoginBtn type='button' onClick={moveToLogin}>
          로그인으로 돌아가기
        </LoginBtn>
      </Wrapper>
    </Container>
  );
};

export default SignUpScreen;
