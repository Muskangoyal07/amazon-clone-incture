import { useState } from "react";
import "./Banner.css";

const banners = [
  "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/pc_unrec_refresh._CB555261616_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img25/Media/PC_Hero_3000x1200_Asin-toys-2x._CB547414496_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2025/GW/BAU/Unrec/PC/934044814._CB551384116_.jpg",

  "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/pc_common_12th._CB555377188_.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/uber_new_high._CB537689643_.jpg",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="banner-container">
      <button className="prev-btn" onClick={prevSlide}>
        ❮
      </button>

      <img className="banner fade" src={banners[currentIndex]} alt="Banner" />

      <button className="next-btn" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
};

export default Banner;
