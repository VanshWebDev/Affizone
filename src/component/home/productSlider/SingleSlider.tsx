import React from 'react';
import ProductSlider from './ProductSlider';
import one from "../../../assets/img/1.png";
import two from "../../../assets/img/2.png";
import third from "../../../assets/img/3.png";
import fourth from "../../../assets/img/4.png";
import fifth from "../../../assets/img/t2.png"

const products = [
  {
    img: one,
    category: "Sport Shoes",
    title: "NIKE D.01",
    description: "Lorem ipsum dolor sit praesentium ipsam assumenda?",
    actions: [{ text: "Add To Cart", icon: "fa-solid fa-cart-plus" }, { text: "See More", icon: "fa-solid fa-bag-shopping" }],
    shape: "rectangle"
  },
  {
    img: two,
    category: "Sport Shoes",
    title: "NIKE D.02",
    description: "Lorem dignissimos ipsam assumenda?",
    actions: [{ text: "Add To Cart", icon:"fa-solid fa-cart-plus" }, { text: "See More", icon: "fa-solid fa-bag-shopping" }],
    shape: "rectangle"
  },
  {
    img: third,
    category: "Sport Shoes",
    title: "NIKE D.03",
    description: "Lorem ipsa dignissimos enim quam corrupti praesentium ipsam assumenda?",
    actions: [{ text: "Add To Cart",icon:"fa-solid fa-cart-plus" }, { text: "Buy now", icon:"fa-solid fa-bag-shopping" }],
    shape: "rectangle"
  },
  {
    img: fourth,
    category: "Smart watch",
    title: "NIKE D.03",
    width: "50%",
    description: "Lorem ipsa ipsam assumenda?",
    actions: [{ text: "Add To Cart",icon:"fa-solid fa-cart-plus" }, { text: "Buy now", icon:"fa-solid fa-bag-shopping" }],
    shape: "square"
  },
  {
    img: fifth,
    category: "T-shirt",
    title: "Zudio t-shirt",
    width: "50%",
    dontRotate: true,
    description: "Lorem ipsa dignissimos assumenda?",
    actions: [{ text: "Add To Cart",icon:"fa-solid fa-cart-plus" }, { text: "Buy now", icon:"fa-solid fa-bag-shopping" }],
    shape: "square"
  }
];

const SingleSlider: React.FC = () => (
  <div>
    <ProductSlider products={products} />
  </div>
);

export default SingleSlider;
