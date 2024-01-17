import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HomePage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import HeadingCardArea from "../components/HeadingCardArea";
import TopNavBar from "../components/TopNavBar";

const HomePage = () => {
  return (
    <Container fluid>
      <TopNavBar />
      <Row>
        <Image
          src="keywords-letters.jpg"
          className="p-0"
          style={{ height: 500, objectFit: "cover" }}
        />
      </Row>
      <Row className="main-heading py-5 justify-content-center">
        지금 우리 에타는
        <br />
        어떤 키워드에 관심이 있을까요?
      </Row>
      <HeadingCardArea />
    </Container>
  );
};

export default HomePage;
