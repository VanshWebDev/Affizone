import { Avatar, Badge, Popover } from "antd";
import styles from "../../../styles/Homepage/bottomNav/BottomNav.module.css";
import OptionBox from "./OptionBox";
import logo from "../../../assets/logo.png"
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import "./Bottom.css";

import ProfileOption from "./ProfileOption";
function BottomNav() {

  return (
    <div className={styles.BottomNavContainer}>
      <div className={styles.firstBlock}>
        <div>
          <Badge count={10} size="small" color="error"><ShoppingCartTwoToneIcon /></Badge>
        </div>
      </div>

      <Popover
        content={<OptionBox />}
        style={{ border: "1px solid red" }}
        trigger="click"
      >
        <div className={styles.secondBlock}>
          <div>
          <Avatar size={32} src={logo} />
          </div>
        </div>
      </Popover>

      <div className={styles.thirdBlock}>
        {/* <div> */}
          <ProfileOption />
        {/* </div> */}
      </div>
    </div>
  );
}

export default BottomNav;
