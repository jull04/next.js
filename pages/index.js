import Link from "next/link";
import MainContainer from "../components/MainContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Preloader from "../components/Preloader";
import "swiper/css";
import "swiper/css/navigation";
import styles from '../styles/index.module.css';
import { useFetchCatImagesQuery } from "../utils/api";
import { useEffect } from "react";

const Index = () => {

  const { data: catImages = [], error, isLoading } = useFetchCatImagesQuery();

  const filteredCats = catImages.filter(
    (cat) => cat.breeds && cat.breeds.length > 0
  );

  useEffect(() => {
    if (!isLoading && !error && catImages.length > 0) {
      // Проверяем, есть ли уже данные в локальном хранилище
      const storedCatImages = JSON.parse(localStorage.getItem('catImages'));
      if (!storedCatImages) {
        // Если данных в локальном хранилище нет, сохраняем полученные данные
        localStorage.setItem('catImages', JSON.stringify(catImages));
      }
    }
  }, [isLoading, error, catImages]);

  return (
    <>
      <MainContainer>
        <section>
            <div>
              <Swiper navigation={true} modules={[Navigation]} className={styles.swiper}>
                {filteredCats.map((cat) => (
                  <SwiperSlide key={cat.id} className={styles.swiperSlide}>
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
              <div className={styles.buttonContainer}>
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
