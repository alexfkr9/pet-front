import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Keyboard } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./HomeStoriesSlider.scss";

import Slider_1 from "../../../assets/images/Slider-1.png";
import Slider_2 from "../../../assets/images/Slider-2.png";
import Slider_3 from "../../../assets/images/Slider-3.jpg";
import Slider_4 from "../../../assets/images/Slider-4.jpg";
import Slider_5 from "../../../assets/images/Slider-5.jpg";
import ArrowRight from "../../../assets/images/ArrowRight.svg";
import ArrowLeft from "../../../assets/images/ArrowLeft.svg";

SwiperCore.use([Keyboard]);

const HomeStoriesSlider = () => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section className="section section-stories">
      <div className="home-stories">
        <div className="home-stories-info">
          <div className="home-stories-title">Щасливі історії</div>
          <p className="home-stories-desc">
            Найвища нагорода для нас - зворушливі моменти, коли тваринка
            повертається до люблячої родини або знаходить новий дім. Ці історії
            свідчать, що людяність та добросердість здатні зберегти життя.{" "}
            <br />
            <span className="home-stories-conclusion">
              <b>Отже, ось вони - щасливі Хвостики зі Sniff!</b>
            </span>
          </p>
          <Link className="btn-primary home-stories-btn" to="/happy-stories">
            Більше історій
          </Link>
        </div>
        <div className="home-stories-slider-wrapper">
          <Swiper
            className="home-stories-slider"
            keyboard={true}
            loop={true}
            loopedSlides={2}
            modules={[Navigation, Pagination]}
            navigation={{ prevEl, nextEl }}
            pagination={{ clickable: false }}
            slidesPerView="auto"
            spaceBetween={24}
          >
            <SwiperSlide className="slide home-section-slide">
              <div className="slide-img">
                <img src={Slider_1} alt="slider-1" />
              </div>
              <div className="slide-label">
                <div className="slide-title">
                  <div className="slide-name">Іззі</div>
                  <div className="slide-status slide-status-green">
                    Повернувся до господарів
                  </div>
                </div>
                <div className="slide-arrow">
                  <img src={ArrowRight} alt="arrow-right" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide home-stories-slide">
              <div className="slide-img">
                <img src={Slider_2} alt="slider-2" />
              </div>
              <div className="slide-label">
                <div className="slide-title">
                  <div className="slide-name">Вітер</div>
                  <div className="slide-status slide-status-purple">
                    Знайшов нову домівку
                  </div>
                </div>
                <div className="slide-arrow">
                  <img src={ArrowRight} alt="arrow-right" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide home-stories-slide">
              <div className="slide-img">
                <img src={Slider_3} alt="slider-3" />
              </div>
              <div className="slide-label">
                <div className="slide-title">
                  <div className="slide-name">Стефан</div>
                  <div className="slide-status slide-status-purple">
                    Знайшов нову домівку
                  </div>
                </div>
                <div className="slide-arrow">
                  <img src={ArrowRight} alt="arrow-right" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide home-stories-slide">
              <div className="slide-img">
                <img src={Slider_4} alt="slider-4" />
              </div>
              <div className="slide-label">
                <div className="slide-title">
                  <div className="slide-name">Пегі</div>
                  <div className="slide-status slide-status-green">
                    Повернулась до господарів
                  </div>
                </div>
                <div className="slide-arrow">
                  <img src={ArrowRight} alt="arrow-right" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide home-stories-slide">
              <div className="slide-img">
                <img src={Slider_5} alt="slider-5" />
              </div>
              <div className="slide-label">
                <div className="slide-title">
                  <div className="slide-name">Пухнастик</div>
                  <div className="slide-status slide-status-purple">
                    Знайшов нову домівку
                  </div>
                </div>
                <div className="slide-arrow">
                  <img src={ArrowRight} alt="arrow-right" />
                </div>
              </div>
            </SwiperSlide>
            <button
              className="swiper-button-prev-unique"
              ref={(node) => {
                setPrevEl(node);
              }}
            >
              <img src={ArrowLeft} alt="prev" />
            </button>
            <button
              className="swiper-button-next-unique"
              ref={(node) => {
                setNextEl(node);
              }}
            >
              <img src={ArrowRight} alt="next" />
            </button>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HomeStoriesSlider;
