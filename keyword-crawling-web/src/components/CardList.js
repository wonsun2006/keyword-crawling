import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "react-bootstrap";
import "../styles/CardList.css";

import "swiper/css";
import "swiper/css/effect-coverflow";

import { EffectCoverflow } from "swiper/modules";

const CardList = ({ children, slidesPerView = "auto" }) => {
  return (
    <Swiper
      effect={"coverflow"}
      loop
      slidesPerView={slidesPerView}
      centeredSlides
      modules={[EffectCoverflow]}
      coverflowEffect={{
        rotate: 0,
        stretch: 100,
        depth: 150,
        modifier: 1.5,
        slideShadows: false,
      }}
    >
      {React.Children.map(children, (item) => {
        return (
          <SwiperSlide>
            <Container fluid className="d-flex justify-content-center">
              {item}
            </Container>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default CardList;
