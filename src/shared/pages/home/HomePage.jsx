import React from "react";
import "./HomePage.css";
import useBooks from "../../../features/books/hooks/useBooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import BookCard from "../../../features/books/components/BookCard";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const HomePage = () => {
  const { books, loading } = useBooks();
  const Navigate = useNavigate();

  if (loading) return <Loader />;
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Book</h1>
          <p>Explore thousands of books from your favorite authors</p>
        </div>
      </section>
      <section className="carousel">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
           breakpoints={{
    0: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  }}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          // navigation
          pagination={{ clickable: true }}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {books.map((book) => (
            <SwiperSlide
              key={book.id}
              onClick={() => Navigate("/books")}
              style={{ cursor: "pointer" }}
            >
              <img className="swiper-img" src={book.image} alt={book.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
};

export default HomePage;
