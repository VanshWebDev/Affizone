import { FC } from "react";
import styles from "../../../styles/auth/login/ShowUserList.module.css";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
interface Props {
  userEmail: {
    affinameList?: [];
    emailOrUsername?: string;
  };
  selectUser: (user:string) => void;
}

const ShowUserList: FC<Props> = ({ userEmail, selectUser }) => {
  return (
    <div className={styles.showUserListContainer}>
      <p className={styles.title}>Accounts List</p>
      <p className={styles.description}>
        These are the accounts link with <b>{userEmail.emailOrUsername}</b>{" "}
        select account which password you want to reset
      </p>
      <div className={styles.forHover}>
        {userEmail.affinameList && userEmail.affinameList.length > 0 ? (
          userEmail.affinameList.map((val:{affiname:string}, indx) => {
            return (
              <div className={styles.listBox} onClick={()=>selectUser(val.affiname)} key={indx}>
                <AccountCircleTwoToneIcon />
                <p key={indx}>{val.affiname}</p>
              </div>
            );
          })
        ) : (
          <p>No items to display</p>
        )}
      </div>
    </div>
  );
};

export default ShowUserList;
