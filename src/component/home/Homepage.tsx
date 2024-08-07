import styles from "../../styles/Homepage/Homepage.module.css";
import Navbar from "./navbar/Navbar";
import BottomNav from "./bottomNav/BottomNav";
// import ProductSlider from "./productSlider/ProductSlider";
import SingleSlider from "./productSlider/SingleSlider";

function Homepage() {
  return (
    <header className={styles.heroSection}>
      <nav className={styles.nav}>
        <Navbar />
      </nav>

      <main className={styles.main}>
    
       <SingleSlider />
      </main>
      <BottomNav />
    </header>
  );
}

export default Homepage;
