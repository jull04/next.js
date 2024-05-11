import Link from "next/link"
import MainContainer from "../components/MainContainer";
import styles from '../styles/cats.module.css';

export async function getStaticProps(context) {

  const response =  await fetch("https://api.thecatapi.com/v1/images/search?limit=200&api_key=live_8VHZC6qqrZx16wU609ocvPSn0JZTcz3s0MQn1JK6fbeaQw7oy30jNYH6iRlFkmWD");
  const cats = await response.json();

  return {
    props: {cats},
  }
}

const Cats = ({cats}) => {

  const filteredCats = cats.filter(
    (cat) => cat.breeds && cat.breeds.length > 0
  );

    return(
      <MainContainer>
      <section>
      <div className={styles.catGrid}>
          {filteredCats.map((cat) => (
            <Link className={styles.catInfo} href={`cats/${cat.id}`} key={cat.id}>
              <div className={styles.catCard} key={cat.id}>
                <img src={cat.url} alt="Cat" />
              </div>
              <p>Breed: {cat.breeds[0].name}</p>
              <button className="button">More info</button>
            </Link>
          ))}
      </div>
    </section>
      </MainContainer>
    )
  }
  
  export default Cats