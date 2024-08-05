import { Popover } from "antd";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import OptionBox from "./OptionBox";
import styles from "../../../styles/Homepage/Navbar.module.css";
import shoe from "../../../assets/img/shoe.png";

function ShoeDropdownOption() {
  const image = {
    src: shoe,
    link: "https://www.google.com/search?q=shoes",
  };
  const secondSec = [
    { title: "high heels", link: "https://example.com/second1" },
    { title: "flats", link: "https://example.com/second2" },
    { title: "sneakers", link: "https://example.com/second3" },
    { title: "boots", link: "https://example.com/second3" },
  ];

  const thirdSec = [
    { title: "high heels", link: "https://example.com/second1" },
    { title: "flats", link: "https://example.com/second2" },
    { title: "sneakers", link: "https://example.com/second3" },
    { title: "boots", link: "https://example.com/second3" },
  ];

  return (
    <Popover
      content={
        <OptionBox image={image} secondSec={secondSec} thirdSec={thirdSec} />
      }
      trigger="hover"
    >
      <div className={styles.shoes}>
        Shoes <KeyboardArrowDownTwoToneIcon />
      </div>
    </Popover>
  );
}

export default ShoeDropdownOption;
