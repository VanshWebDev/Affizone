import { Avatar } from "antd";
import styles from "../../../styles/Homepage/bottomNav/OptionBox.module.css";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import SsidChartTwoToneIcon from "@mui/icons-material/SsidChartTwoTone";
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import { useNavigate } from "react-router-dom";
function OptionBox() {
 const navigate = useNavigate();

  return (
    <div className={styles.optionBoxContainer}>

     <div className={styles.optionBox}>
      <div className={styles.firstSec}>
        <div onClick={()=>navigate("/post")}>
            <div><AddCircleTwoToneIcon /></div>
            <p className={styles.text}>Create</p>
        </div>
        <div>
            <div><SsidChartTwoToneIcon /></div>
            <p className={styles.text}>Analytics</p>
        </div>
        <div>
            <div><SettingsTwoToneIcon /></div>
            <p className={styles.text}>Setting</p>
        </div>
      </div>

      <div className={styles.secondSec}>
        <div>
            <div><BookmarkTwoToneIcon /></div>
            <p className={styles.text}>Setting</p>
        </div>
      </div>

      <div className={styles.thirdSec}>
        <div>
            <div><Avatar src="https://sadgirldp.com/wp-content/uploads/Cute-Sad-Girl-Dp-Cartoon-81.jpeg" /></div>
            <p className={styles.text}>Profile</p>
        </div>
      </div>
     </div>

    </div>
  );
}

export default OptionBox;
