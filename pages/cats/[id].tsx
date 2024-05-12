import { useParams } from "next/navigation";
import MainContainer from "../../components/MainContainer";
import styles from '../../styles/Cat.module.css';
import { useFetchCatImagesQuery} from "../../utils/api";
import { CatImage } from "../../utils/types";

export default function Cat() {

  const { data: catImages = [] } = useFetchCatImagesQuery(undefined);

  const { id } = useParams<{ id: string }>();

    // Находим карточку по идентификатору
    const cat: CatImage = (catImages as CatImage[]).find((cat) => cat.id === id)!;

    const goBack = () => {
    window.history.back();
  };

  return (
    <MainContainer>
    <section className={styles.catPage}>
      <div className="catCard">
        <img src={cat.url} alt="Cat" />
      </div>
      <p className={styles.catInfo}>Breed: {cat.breeds[0].name}</p>
      <p className={styles.catInfo}>Temperament: {cat.breeds[0].temperament}</p>
      <p className={styles.catInfo}>Description: {cat.breeds[0].description}</p>
      {cat.breeds[0].vcahospitals_url && (
        <p className={styles.catInfo}>
          Info link:{" "}
          <a
            className={styles.catLink}
            target="_blank"
            rel="noreferrer"
            href={cat.breeds[0].vcahospitals_url}
          >
            {cat.breeds[0].vcahospitals_url}
          </a>
        </p>
      )}
      <button className="button" onClick={goBack}>
        Go back
      </button>
    </section>
    </MainContainer>
  );
}
