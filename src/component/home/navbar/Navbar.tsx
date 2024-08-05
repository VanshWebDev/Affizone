import styles from "../../../styles/Homepage/Navbar.module.css"
import SecondSec from "./SecondSec";
import ThirdSec from "./ThirdSec";
import FirstSec from "./FirstSec";
import ShortTextOutlinedIcon from '@mui/icons-material/ShortTextOutlined';
import { useState } from "react";
import Menue from "./Menue";

function Navbar() {
  const [search,setSearch]= useState(false);
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    setSearch(!search);
  }

  return (
    <div className={styles.navBarContainer}>
       <div className={styles.firstSec} >
        
        <div className={styles.drawerContainer}>
          <Menue open={open} setOpen={setOpen}/>
           <div onClick={()=>setOpen(true)}>
             <ShortTextOutlinedIcon />
           </div>
        </div>
          
          <div className={styles.firstSecContainer}>
            <FirstSec />
          </div>
      
        
       </div>
       {/*  */}
       <div className={styles.secondSec}>
         <SecondSec search={search}/>
       </div>
       {/*  */}
       <div className={styles.thirdSec}>
         <ThirdSec handleSearch={handleSearch}/>
       </div>
    </div>
  )
}

export default Navbar;