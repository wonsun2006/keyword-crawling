import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/RegisterPage.css";
import { useNavigate } from "react-router-dom";
import api from "../services/axios/apiServerInstance";
import { Row, Col, Container, Button, Stack } from "react-bootstrap";
import IconInput from "../components/IconInput.js";
import { MdAccountCircle } from "react-icons/md";
import { BiLock } from "react-icons/bi";

const Register = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleRegister = async () => {
    try {
      const response = await api.post("/sign-up", {
        userId,
        password,
        userName,
        role: "ROLE_USER",
      });

      // 서버로부터 성공적인 응답을 받았을 때
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다.");
        // 다음 페이지로 이동
        navigate("/login");
      } else {
        alert("알 수 없는 에러 발생");
      }
    } catch (error) {
      alert("이미 존재하는 사용자입니다.");
    }
  };

  const handleCancle = () => {
    navigate("/login");
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light"
    >
      <Container
        fluid="md"
        className="bg-white px-5 py-4 register-container shadow"
      >
        <Row className="my-3">
          <p className="register-header-text">회원가입</p>
        </Row>
        <Row className="my-2">
          <IconInput
            icon={<MdAccountCircle />}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
          />
        </Row>
        <Row className="my-2">
          <IconInput
            icon={<BiLock />}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </Row>
        <Row className="my-2">
          <IconInput
            icon={<MdAccountCircle />}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="이름"
          />
        </Row>
        <Row className="d-flex gap-2">
          <Col>
            <Row className="d-flex justify-content-center">
              <Button className="register-button" onClick={handleRegister}>
                회원가입 완료
              </Button>
            </Row>
          </Col>
          <Col>
            <Row className="d-flex justify-content-center">
              <Button className="cancle-button" onClick={handleCancle}>
                취소
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Register;
