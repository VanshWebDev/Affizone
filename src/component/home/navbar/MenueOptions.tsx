import styles from "../../../styles/Homepage/navbar/MenutOptions.module.css";
import ShoeDropdownOption from "./ShoeDropdownOption";
import TshirtDropdownOption from "./TshirtDropdownOption";
import WatchDropdownOption from "./WatchDropdownOption";
function MenueOptions() {
  return (
    <div className={styles.menueOptionsContainer}>
      <div className={styles.menutOptions}>
        <ShoeDropdownOption />

        <TshirtDropdownOption />

        <WatchDropdownOption />
      </div>
    </div>
  );
}

export default MenueOptions;
