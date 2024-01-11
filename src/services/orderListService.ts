import axios from 'axios';
import { SERVER_URL } from '../data/serverData';

class orderListService {
  async getOrderList(startDate: string, endDate: string) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const memberId = localStorage.getItem('memberId');

      const response = await axios.get(
        `${SERVER_URL}/api/orders/${memberId}/period?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response;
    } catch (e) {
      return e;
    }
  }
}

export { orderListService };
