import axios from 'axios';
import { SERVER_URL } from '../data/serverData';

class userService {
  async signUp(email: string, password: string) {
    let data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/members/join`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': `application/json`,
          },
        }
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  async signIn(email: string, password: string) {
    let data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/members/login`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': `application/json`,
          },
        }
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  async saveInfo(accessToken: string, refreshToken: string, memberId: number) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('memberId', memberId.toString());
    localStorage.setItem('loginStatus', 'true');
  }

  async deleteInfo() {
    await localStorage.clear();
    if (localStorage.getItem('loginStatus') === null) return true;
    else return false;
  }

  async getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  async getMemberId() {
    return localStorage.getItem('memberId');
  }
}

export { userService };
