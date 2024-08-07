import React, { useEffect, useState, useRef } from "react";
import styles from "../../../styles/Homepage/productSlider/productSlider.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FastAverageColor } from 'fast-average-color';

interface Product {
  img: string;
  category: string;
  title: string;
  description: string;
  actions: { text: string; icon?: string }[];
  width?: string;
  dontRotate?: boolean;
}

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const [active, setActive] = useState<number>(0);
  const firstPosition = 0;
  const lastPosition = products.length - 1; // Make lastPosition dynamic
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const dotsRef = useRef<NodeListOf<HTMLLIElement> | null>(null);
  const [dynamicClr, setDynamicClr] = useState("#000");
  const fac = new FastAverageColor();

  const startAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1 > lastPosition ? 0 : prev + 1));
    }, 5000);
  };

  useEffect(() => {
    if (carouselRef.current && indicatorRef.current) {
      itemsRef.current = carouselRef.current.querySelectorAll(
        `.${styles.list} .${styles.item}`
      );
      dotsRef.current = indicatorRef.current.querySelectorAll(
        `.${styles.indicators} ul li`
      );
      setSlider();
      startAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setSlider();
    getDynamicClr(products[active].img);
  }, [active]);

  const setSlider = () => {
    if (
      carouselRef.current &&
      indicatorRef.current &&
      itemsRef.current &&
      dotsRef.current
    ) {
      const itemActiveOld = carouselRef.current.querySelector(
        `.${styles.list} .${styles.item}.${styles.active}`
      );
      if (itemActiveOld) itemActiveOld.classList.remove(styles.active);
      itemsRef.current[active].classList.add(styles.active);

      const dotActiveOld = indicatorRef.current.querySelector(
        `.${styles.indicators} ul li.${styles.active}`
      );
      if (dotActiveOld) dotActiveOld.classList.remove(styles.active);
      dotsRef.current[active].classList.add(styles.active);

      const numberElement = indicatorRef.current.querySelector(
        `.${styles.number}`
      );
      if (numberElement) {
        numberElement.innerHTML = `0${active + 1}`;
      }
      startAutoPlay();
    }
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1 > lastPosition ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 < firstPosition ? lastPosition : prev - 1));
  };

  const getDynamicClr = async (img: string) => {
    const clr = await fac.getColorAsync(img);
    setDynamicClr(clr.hex);
    return clr.hex;
  };

  return (
    <div>
      <section className={styles.carousel} ref={carouselRef}>
        <div className={styles.list}>
          {products.map((val, index) => (
            <div className={`${styles.item} ${index === active ? styles.active : ""}`} key={index}>
              <figure>
                <img src={val.img} alt="product" style={{width: val.width ? val.width: "", transform: val.dontRotate ? "rotate(0deg)": ""}}/>
              </figure>
              <div className={styles.content}>
                <p className={styles.category}>{val.category}</p>
                <h2 style={{ WebkitTextStrokeColor: dynamicClr }}>{val.title}</h2>
                <p className={styles.description}>{val.description}</p>
                <div className={styles.more}>
                  {val.actions.map((action, actionIndex) => (
                    <button key={actionIndex}>
                      {action.icon && <i className={action.icon}></i>} {action.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.arrows}>
          <button id="prev" onClick={handlePrev}>
            <ArrowBackIcon />
          </button>
          <button id="next" onClick={handleNext}>
            <ArrowForwardIcon />
          </button>
        </div>
        <div className={styles.indicators} ref={indicatorRef}>
          <ul>
            {products.map((_, index) => (
              <li key={index} className={index === active ? styles.active : ""}></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductSlider;
