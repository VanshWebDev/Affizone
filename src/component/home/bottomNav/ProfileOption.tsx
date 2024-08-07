import { Avatar, Popover } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthOption from "./AuthOption";
// import styles from "../../../styles/Homepage/bottomNav/ProfileOption.module.css"
function ProfileOption() {
  const { userInfo } = useSelector((state: RootState) => state.counter);

  return (
    <div>
      {userInfo.id ? (
        <Avatar src={userInfo.picture} />
      ) : (
        // <div className={styles.ifUserInfoUndefined}>
        <Popover content={<AuthOption />} trigger="hover">
          <AccountCircleIcon fontSize="large"/>
        </Popover>
        // </div>
      )}
    </div>
  );
}

export default ProfileOption;
