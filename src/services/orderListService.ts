import axios from 'axios';
import { SERVER_URL } from '../data/serverData';
import { OrderListResponse } from '../type/orderListServiceType';

class orderListService {
  async getOrderList(
    startDate: string,
    endDate: string
  ): Promise<OrderListResponse> {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const memberId = localStorage.getItem('memberId');

      const response = await axios.get(
        `${SERVER_URL}/api/orders/${memberId}/period?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        }
      );
      return response.data;
    } catch (e) {
      return e;
    }
  }
}

export { orderListService };
