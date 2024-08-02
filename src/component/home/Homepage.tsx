import styles from "../../styles/Homepage/Homepage.module.css";
import AlertDialog from "../../component/Auth/Form";
import mind from "../../assets/mind.svg"
import Navbar from "./Navbar";

function Homepage() {
  return (
    <header className={styles.heroSection}>
      <nav className={styles.nav}>
        <Navbar />
      </nav>

      <main className={styles.main}>
        <div className={styles.mainTitleContainer}>
          <h1 className={styles.mainTitle}>Affizone <br />Affiliate marketing place</h1>
          <h1 className={styles.mainTitle}></h1>
          <AlertDialog />
        </div>

        {/*  */}

        <div className={styles.dataPoingContainer}>
          <div className={styles.dataPoint}>
            <div className={styles.activeUsers}>
              <p className={styles.dataNumber}>15k+</p>
              <p className={styles.dataName}>Active users</p>
            </div>
            <div className={styles.mcq}>
              <p className={styles.dataNumber}>10M+</p>
              <p className={styles.dataName}>MCQ</p>
            </div>
            <div className={styles.courses}>
              <p className={styles.dataNumber}>20+</p>
              <p className={styles.dataName}>Courses</p>
            </div>
          </div>
          <div className={styles.circleBox}>
            <div className={styles.circle}>
              <img src={mind} alt="" />
            </div>
          </div>
        </div>
      </main>
    </header>
  );
}

export default Homepage;
