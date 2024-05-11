import MainContainer from "../../components/MainContainer";
import styles from '../../styles/cat.module.css';


export async function getServerSideProps(context) {
  const { id } = context.params; // Получаем идентификатор котика из параметров маршрута
  const response = await fetch(`https://api.thecatapi.com/v1/images/${id}?api_key=live_8VHZC6qqrZx16wU609ocvPSn0JZTcz3s0MQn1JK6fbeaQw7oy30jNYH6iRlFkmWD`);
  const cat = await response.json();

  return {
    props: { cat },
  };
}


export default function Cat({ cat }) {
    const goBack = () => {
    window.history.back();
  };

  return (
    <MainContainer>
    <section className={styles.catPage}>
      <div className="catCard">
      <img src={cat.url} alt="Cat" />
      </div>
      <p className={styles.catInfoPage}>Breed: {cat.breeds[0].name}</p>
      <p className={styles.catInfoPage}>Temperament: {cat.breeds[0].temperament}</p>
      <p className={styles.catInfoPage}>Description: {cat.breeds[0].description}</p>
      {cat.breeds[0].vcahospitals_url && (
        <p className={styles.catInfoPage}>
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
