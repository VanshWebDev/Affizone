import { useEffect, useState, useRef} from "react";
import "./productSlider.css";
import one from "../../assets/img/1.png";
import two from "../../assets/img/2.png";
import third from "../../assets/img/3.png";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ProductSlider() {
  const [active, setActive] = useState<number>(0);
  const firstPosition = 0;
  const lastPosition = 2;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const dotsRef = useRef<NodeListOf<HTMLLIElement> | null>(null);

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
      itemsRef.current = carouselRef.current.querySelectorAll(".list .item");
      dotsRef.current = indicatorRef.current.querySelectorAll(".indicators ul li");
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
  }, [active]);

  const setSlider = () => {
    if (carouselRef.current && indicatorRef.current && itemsRef.current && dotsRef.current) {
      const itemActiveOld = carouselRef.current.querySelector(".list .item.active");
      if (itemActiveOld) itemActiveOld.classList.remove("active");
      itemsRef.current[active].classList.add("active");

      const dotActiveOld = indicatorRef.current.querySelector(".indicators ul li.active");
      if (dotActiveOld) dotActiveOld.classList.remove("active");
      dotsRef.current[active].classList.add("active");

      const numberElement = indicatorRef.current.querySelector(".number");
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

  return (
    <div>
      <section className="carousel" ref={carouselRef}>
        <div className="list">
          <div className="item">
            <figure>
              <img src={one} alt="product" />
            </figure>
            <div className="content">
              <p className="category">Sport Shoes</p>
              <h2>NIKE D.01</h2>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis quidem dignissimos enim quam corrupti praesentium ipsam assumenda?
              </p>
              <div className="more">
                <button>Add To Cart</button>
                <button>
                  <i className="fa-solid fa-play"></i> See More
                </button>
              </div>
            </div>
          </div>
          <div className="item">
            <figure>
              <img src={two} alt="product" />
            </figure>
            <div className="content">
              <p className="category">Sport Shoes</p>
              <h2>NIKE D.02</h2>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis quidem dignissimos enim quam corrupti praesentium ipsam assumenda?
              </p>
              <div className="more">
                <button>Add To Cart</button>
                <button>
                  <i className="fa-solid fa-play"></i> See More
                </button>
              </div>
            </div>
          </div>
          <div className="item">
            <figure>
              <img src={third} alt="product" />
            </figure>
            <div className="content">
              <p className="category">Sport Shoes</p>
              <h2>NIKE D.03</h2>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum facere ipsa blanditiis quidem dignissimos enim quam corrupti praesentium ipsam assumenda?
              </p>
              <div className="more">
                <button>Add To Cart</button>
                <button>Buy now</button>
              </div>
            </div>
          </div>
        </div>
        <div className="arrows">
          <button id="prev" onClick={handlePrev}>
            <ArrowBackIcon />
          </button>
          <button id="next" onClick={handleNext}>
            <ArrowForwardIcon />
          </button>
        </div>
        <div className="indicators" ref={indicatorRef}>
          {/* <div className="number">02</div> */}
          <ul>
            <li className="active"></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ProductSlider;
