import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeadingCard from "./HeadingCard";
import { FaChartPie } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";

const HeadingCardArea = () => {
  return (
    <Container>
      <Row>
        <Col>
          <HeadingCard
            icon={<FaChartPie />}
            title="게시글 기반 분석"
            description="에브리타임에 업로드 되는 게시글 데이터를 수집하여 주요 키워드를 추출합니다. 웹 크롤링을 통해 게시글을 수집하고, 데이터 전처리 후 TF-IDF 계산을 통해 키워드를 추출합니다."
          />
        </Col>
        <Col>
          <HeadingCard
            icon={<FaClockRotateLeft />}
            title="1시간마다"
            description="1시간마다 주기적인 분석을 진행하여 에브리타임 커뮤니티의 트렌드를 확인할 수 있습니다. 사용자들이 특정 시간대에 어떤 주제에 더 많은 관심을 가지고 있는지, 또한 그 관심이 시간에 따라 어떻게 변화하는지를 파악할 수 있습니다."
          />
        </Col>
        <Col>
          <HeadingCard
            icon={<FaRegBell />}
            title="알림 설정"
            description="Firebase Cloud Messaging을 활용하여 분석 결과를 웹 푸시 알림으로 실시간으로 수신할 수 있습니다. 매 시간마다 수행되는 분석 작업을 사용자에게 해당 시간대의 핵심 키워드와 관심사에 대한 간략한 정보를 웹 푸시 알림으로 전송합니다."
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HeadingCardArea;
