import React from "react";

import { Card, Table } from "react-bootstrap";

import "../styles/OrderListCard.css";

function OrderListCard({ orders }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="mb-0">자유게시판</Card.Title>
      </Card.Header>
      <Table borderless striped hover className="bg-primary mb-0">
        <thead>
          <tr>
            <th className="text-center text-nowrap">순위</th>
            <th>키워드</th>
            <th className="text-end px-4">조회수</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => {
            return (
              <tr>
                <td className="text-center">{index + 1}</td>
                {/* 추후 데이터 구조에 따라 변경 필요 */}
                <td className="me-auto">키워드{item}</td>
                <td className="text-end px-4">823753</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
}

export default OrderListCard;
