import styles from "../../styles/Homepage/Homepage.module.css";
import Navbar from "./navbar/Navbar";
import BottomNav from "./bottomNav/BottomNav";
import ProductSlider from "../productSlider/ProductSlider";

function Homepage() {
  return (
    <header className={styles.heroSection}>
      <nav className={styles.nav}>
        <Navbar />
      </nav>

      <main className={styles.main}>
    
       <ProductSlider />
      </main>
      <BottomNav />
    </header>
  );
}

export default Homepage;
