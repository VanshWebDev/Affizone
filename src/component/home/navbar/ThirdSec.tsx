import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import styles from "../../../styles/Homepage/Navbar.module.css"
import React from 'react';

const ThirdSec:React.FC<{handleSearch:()=>void}> =({handleSearch}) =>{
  return (
    <div className={styles.thirdSecContainer}>
      <div onClick={handleSearch}><SearchTwoToneIcon /></div>
    </div>
  )
}

export default ThirdSec;
