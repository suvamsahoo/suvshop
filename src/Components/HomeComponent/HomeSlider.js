import React from "react";
import { Carousel } from "react-bootstrap";

export default function HomeSlider() {
  return (
    <>
      <Carousel className="BS89">
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 HomeSlider-img"
            src="https://cdn.shopify.com/s/files/1/0293/6432/2403/files/NULIFE_c7f5231d-5a8a-4bcb-9900-3a17e15fff4d_890x370.jpg?v=1630926232"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100 HomeSlider-img"
            src="https://cdn.shopify.com/s/files/1/0293/6432/2403/files/SMB-EXCLUSIVE-MB2_890x370.jpg?v=1631080164"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}
