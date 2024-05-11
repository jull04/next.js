import Link from "next/link";
import MainContainer from "../components/MainContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Preloader from "../components/Preloader";
import "swiper/css";
import "swiper/css/navigation";
import styles from '../styles/index.module.css';

export async function getStaticProps(context) {
  const response = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=200&api_key=live_8VHZC6qqrZx16wU609ocvPSn0JZTcz3s0MQn1JK6fbeaQw7oy30jNYH6iRlFkmWD"
  );
  const cats = await response.json();

  return {
    props: { cats },
  };
}

const Index = ({ cats }) => {
  const filteredCats = cats.filter(
    (cat) => cat.breeds && cat.breeds.length > 0
  );

  return (
    <>
      <MainContainer>
        <section className={styles.index}>
            <div>
              <Swiper navigation={true} modules={[Navigation]} className={styles.mySwiper}>
                {filteredCats.map((cat) => (
                  <SwiperSlide key={cat.id}>
                    <div>
                      <img
                        src={cat.url}
                        alt={`Котик ${cat.id}`}
                        className="catCard"
                      />
                    </div>
                    <p>Breed: {cat.breeds[0].name}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="container">
                <Link href={"/cats"} className="button">
                  See all cats
                </Link>
              </div>
            </div>
        </section>
      </MainContainer>
    </>
  );
};

export default Index;
