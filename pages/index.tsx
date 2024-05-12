import Link from "next/link";
import MainContainer from "../components/MainContainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Preloader from "../components/Preloader";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../styles/Index.module.css";
import { useFetchCatImagesQuery } from "../utils/api";
import { CatImage, Error } from "../utils/types";
import { useEffect } from "react";

const Index = () => {
  const { data: catImages = [], error, isLoading } = useFetchCatImagesQuery(undefined);

  const filteredCats: CatImage[] = (catImages as CatImage[]).filter(
    (cat: CatImage) => cat.breeds && cat.breeds.length > 0
  );

  useEffect(() => {
    if (!isLoading && !error && (catImages as CatImage[]).length > 0) {
      // Проверяем, есть ли уже данные в локальном хранилище
      const storedCatImages = JSON.parse(localStorage.getItem("catImages") || "[]");
      if (!storedCatImages) {
        // Если данных в локальном хранилище нет, сохраняем полученные данные
        localStorage.setItem("catImages", JSON.stringify(catImages));
      }
    }
  }, [isLoading, error, catImages]);

  return (
    <>
      <MainContainer>
        <section className={styles.mainPage}>
          {isLoading ? (
            <Preloader />
          ) : error ? (
            <div className="error-message">Error: {(error as Error).message}</div>
          ) : (
            <div>
              <Swiper navigation={true} modules={[Navigation]} className={styles.swiper}>
                {filteredCats.map((cat: CatImage) => (
                  <SwiperSlide key={cat.id} className={styles.swiperSlide}>
                    <div className="catCard">
                      <img src={cat.url} alt={`Котик ${cat.id}`} />
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
          )}
        </section>
      </MainContainer>
    </>
  );
};

export default Index;
