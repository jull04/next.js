import Link from "next/link";
import MainContainer from "../components/MainContainer";
import styles from "../styles/Cats.module.css";
import { useFetchCatImagesQuery } from "../utils/api";
import { CatImage, Error } from "../utils/types";
import Preloader from "../components/Preloader";

const Cats = () => {
  const { data: catImages = [], error, isLoading } = useFetchCatImagesQuery(undefined);

  const filteredCats: CatImage[] = (catImages as CatImage[]).filter(
    (cat) => cat.breeds && cat.breeds.length > 0
  );

  return (
    <MainContainer>
      <section className={styles.catGrid}>
          {isLoading ? (
            <Preloader />
          ) : error ? (
            <div className="error-message">Error: {(error as Error).message}</div>
          ) : (
            filteredCats.map((cat) => (
              <Link className={styles.catInfo} href={`cats/${cat.id}`} key={cat.id}>
                <div className="catCard" key={cat.id}>
                  <img src={cat.url} alt="Cat" />
                </div>
                <p>Breed: {cat.breeds[0].name}</p>
                <button className="button">More info</button>
              </Link>
            ))
          )}
      </section>
    </MainContainer>
  );
};

export default Cats;
