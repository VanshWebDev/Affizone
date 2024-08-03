import { Popover } from "antd"
import KeyboardArrowRightTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import OptionBox from "./OptionBox";
import styles from "../../../styles/Homepage/navbar/MenutOptions.module.css"

function MenueOptions() {
  return (
    <div className={styles.menueOptionsContainer}>
    
    <div className={styles.menutOptions}>
       <Popover content={<OptionBox />} placement="rightBottom" trigger="hover">
         <div className={styles.shoes}>Shoes <KeyboardArrowRightTwoToneIcon /></div>
       </Popover>

       <Popover content={<OptionBox />} placement="rightBottom" trigger="hover">
         <div className={styles.tshirt}>T-Shirt <KeyboardArrowRightTwoToneIcon /></div>
       </Popover>

       <Popover content={<OptionBox />} placement="rightBottom" trigger="hover">
         <div className={styles.watch}>Watch <KeyboardArrowRightTwoToneIcon /></div>
       </Popover>
    </div>

    <div>
    
    </div>

    </div>
  )
}

export default MenueOptions;