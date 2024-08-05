import { Avatar } from "antd";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import SsidChartTwoToneIcon from "@mui/icons-material/SsidChartTwoTone";
import BookmarkTwoToneIcon from "@mui/icons-material/BookmarkTwoTone";
import styles from "../../../styles/Homepage/OptionBox.module.css";

interface props {
  firstColum: {
    firstOption: { icon: string; title: string };
    secondOption: { icon: string; title: string };
    thirdOption: { icon: string; title: string };
  };
  secondColumn: {
    firstOption: { icon: string; title: string };
    secondOption: { icon: string; title: string };
    thirdOption: { icon: string; title: string };
  };
  thirdColumn: {
    firstOption: { icon: string; title: string };
    secondOption: { icon: string; title: string };
    thirdOption: { icon: string; title: string };
  };
}

const OptionBox:React.FC<props>=()=> {
  return (
    <div className={styles.optionBoxContainer}>
      <div className={styles.optionBox}>
        <div className={styles.firstSec}>
          <div>
            <div>
              <AddCircleTwoToneIcon />
            </div>
            <p className={styles.text}>Create</p>
          </div>
          <div>
            <div>
              <SsidChartTwoToneIcon />
            </div>
            <p className={styles.text}>Analytics</p>
          </div>
          <div>
            <div>
              <SettingsTwoToneIcon />
            </div>
            <p className={styles.text}>Setting</p>
          </div>
        </div>

        <div className={styles.secondSec}>
          <div>
            <div>
              <BookmarkTwoToneIcon />
            </div>
            <p className={styles.text}>Setting</p>
          </div>
        </div>

        <div className={styles.thirdSec}>
          <div>
            <div>
              <Avatar src="https://sadgirldp.com/wp-content/uploads/Cute-Sad-Girl-Dp-Cartoon-81.jpeg" />
            </div>
            <p className={styles.text}>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionBox;
