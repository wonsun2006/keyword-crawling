import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaBell, FaRegBell, FaTrashCan } from "react-icons/fa6";
import OrderListCard from "../components/OrderListCard";
import TopNavBar from "../components/TopNavBar";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/DashboardPage.css";

function DashboardPage() {
  const [date, setDate] = useState();
  const [deviceTokens, setDeviceTokens] = useState([
    // mockData
    [0, true],
    [1, false],
  ]);
  const hourInterval = 3; // 키워드 시간 주기 (단위: 시간)

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const parsedDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours - (hours % hourInterval),
      0,
      0,
      0
    );
    setDate(parsedDate);
  }, []);

  return (
    <Container fluid>
      <TopNavBar />
      <Row className="mt-3 mb-3">
        <DatePicker
          dateFormat="yyyy년 M월 d일 h:mm"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60 * hourInterval}
          selected={date}
          onChange={(date) => setDate(date)}
          customInput={
            <Form.Control
              as="textarea"
              rows={1}
              size="lg"
              className="date-input text-center py-3"
            />
          }
          withPortal
        />
      </Row>
      <Row className="mb-3">
        {[0, 1, 2, 3].map((item) => (
          <Col lg="3" sm="6">
            <OrderListCard orders={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
          </Col>
        ))}
      </Row>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>알림 설정한 기기</Card.Title>
              <p>주기적으로 에브리타임의 인기 키워드를 알려드립니다.</p>
              <Row>
                <Col>
                  <Form.Control placeholder="기기 이름" />
                </Col>
                <Col>
                  <Button>현재 기기 설정</Button>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {deviceTokens.length != 0 ? (
                <Table>
                  <tbody>
                    {deviceTokens.map((item) => {
                      return (
                        <tr>
                          <td className="me-auto">접속 기기 {item}</td>
                          <td className="text-end">
                            <Button className="notification-button border-0 bg-white text-primary">
                              {item[1] ? <FaBell /> : <FaRegBell />}
                            </Button>
                            <Button className="border-0 bg-white text-danger">
                              <FaTrashCan />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <h4>현재 등록된 기기가 없습니다.</h4>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
