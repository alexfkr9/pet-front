import React, { useState } from "react";
import { apiUrl } from "../../../../../api/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Thumbs } from "swiper";
import PetStatusBadge from "../../../../../components/PetStatusBadge/PetStatusBadge";

import "./PetImageSlider.scss";

const PetImageSlider = ({ postId, type, photoIds }: any) => {
  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  return (
    <section className="slider">
      <div className="slider__flex">
        <div className="slider__thumbs">
          <Swiper
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            onSwiper={setImagesNavSlider}
            direction="vertical"
            spaceBetween={24}
            slidesPerView={4}
            className="swiper-container1"
            breakpoints={{
              0: {
                direction: "horizontal"
              },
              768: {
                direction: "vertical"
              }
            }}
            modules={[Navigation, Thumbs]}
            keyboard={true}
          >
            {photoIds.map((photoId: number, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="slider__image">
                    <img
                      src={`${apiUrl}/posts/${postId}/photos/${photoId}`}
                      alt={`Pet ${index + 1}`}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="slider__images">
          <PetStatusBadge type={type} />
          <Swiper
            thumbs={{ swiper: imagesNavSlider }}
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={32}
            mousewheel={true}
            breakpoints={{
              0: {
                direction: "horizontal"
              },
              768: {
                direction: "horizontal"
              }
            }}
            className="swiper-container2"
            modules={[Navigation, Thumbs, Mousewheel]}
            loop={true}
            keyboard={true}
          >
            {photoIds.map((photoId: number, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="slider__image">
                    <img
                      src={`${apiUrl}/posts/${postId}/photos/${photoId}`}
                      alt={`Pet ${index + 1}`}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PetImageSlider;
