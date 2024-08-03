import styles from "../../../styles/Homepage/Navbar.module.css"
import SecondSec from "./SecondSec";
import ThirdSec from "./ThirdSec";
import FirstSec from "./FirstSec";
import ShortTextOutlinedIcon from '@mui/icons-material/ShortTextOutlined';
import { useEffect, useState } from "react";
import Menue from "./Menue";

function Navbar() {
  const [search,setSearch]= useState(false);
  const [open, setOpen] = useState(false);
  const [isDrawer , setIsDrawer] = useState(false)
  const handleSearch = () => {
    setSearch(!search);
  }
  const handleResize = () => {
    setIsDrawer(window.innerWidth < 750);
  }

  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className={styles.navBarContainer}>
       <div className={styles.firstSec} >
        {isDrawer ? (
          <>
          <Menue open={open} setOpen={setOpen}/>
         <div onClick={()=>setOpen(true)}>
            <ShortTextOutlinedIcon style={{transform:'translate(-12px)'}}/>
         </div>
          </>
        ) : (
         <FirstSec />
        )}
        
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