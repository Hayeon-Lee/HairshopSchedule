import * as React from 'react';

const DetailToggle = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>주문 번호</th>
          <th>물품 번호</th>
          <th>주문 수량</th>
          <th>주문 일자</th>
        </tr>
      </thead>
      <tbody>
        {props.list.map((item) => (
          <tr>
            <td>{item.orderNumber}</td>
            <td>{item.orderItemNumber}</td>
            <td>{item.orderQuantity}</td>
            <td>{item.orderDateTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailToggle;
