import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TopNavBar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const session_token = sessionStorage.getItem("token");
    if (!session_token) {
      setIsLogin(false);
      navigate("/");
    } else {
      // 세션 정보 검증 로직 검토 필요
      setIsLogin(true);
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="py-4">
        <Navbar.Brand href="/" className="me-auto brand-text">
          지금 우리 에타는
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav
            onSelect={(e) => {
              if (e == "logout") {
                sessionStorage.clear();
                navigate("/");
              }
            }}
          >
            <Nav.Link href="/">Home</Nav.Link>
            {!isLogin && <Nav.Link href="/login">Login</Nav.Link>}
            {isLogin && (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link eventKey="logout">Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
