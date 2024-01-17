import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import api from "../services/axios/apiServerInstance.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import IconInput from "../components/IconInput.js";
import { MdAccountCircle } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { BsChevronRight } from "react-icons/bs";

const LoginPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // 실제로는 서버의 엔드포인트와 통신하여 로그인을 처리합니다.
      const response = await api.post("/sign-in", {
        userId,
        password,
      });

      // 서버로부터 성공적인 응답을 받았을 때
      if (response.status === 200) {
        let { userName, role, token } = response.data;
        // 세션에 사용자 정보 저장
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("role", role);
        // 다음 페이지로 이동
        navigate("/dashboard");
      } else {
        alert("알 수 없는 에러 발생");
      }
    } catch (error) {
      alert("ID 혹은 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light"
    >
      <Container
        fluid="md"
        className="bg-white px-5 py-4 login-container shadow"
      >
        <Row className="my-3">
          <p className="login-guide-text">로그인</p>
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
        <Row className="mx-0 my-2">
          <Container>
            <Row className="d-flex justify-content-center">
              <Button className="login-button" onClick={handleLogin}>
                <div className="d-flex align-items-center justify-content-between">
                  로그인
                  <BsChevronRight />
                </div>
              </Button>
              <Button
                variant="link"
                onClick={() => navigate("/register")}
                className="mt-4 text-decoration-none"
              >
                회원가입
              </Button>
            </Row>
          </Container>
        </Row>
      </Container>
    </Container>
  );
};

export default LoginPage;
