import Hero from '../hero/hero';
import styles from './home.module.css';

const HomePage = () => {
    return(
        <div className={styles.homeContainer}>
            <Hero/>
        </div>
    )
}

export default HomePage;