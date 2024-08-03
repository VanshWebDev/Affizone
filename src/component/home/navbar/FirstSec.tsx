import { Popover } from "antd"
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import OptionBox from "./OptionBox";
import styles from "../../../styles/Homepage/Navbar.module.css"

function FirstSec() {
  return (
    <>
       <Popover content={<OptionBox />} trigger="hover">
         <div className={styles.shoes}>Shoes <KeyboardArrowDownTwoToneIcon /></div>
       </Popover>
       <Popover content={<OptionBox />} trigger="hover">
         <div className={styles.tshirt}>T-Shirt <KeyboardArrowDownTwoToneIcon /></div>
       </Popover>
       <Popover content={<OptionBox />} trigger="hover">
         <div className={styles.watch}>Watch <KeyboardArrowDownTwoToneIcon /></div>
       </Popover>
    </>
  )
}

export default FirstSec;