import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styles from "../../../styles/Homepage/OptionBox.module.css"
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import DropdownTinySlider from "./DropdownTinySlider";
import React, { useEffect, useState } from 'react';
import {FastAverageColor} from 'fast-average-color';


interface props{
  image:{
    src: string;
    link: string;
  };
  secondSec:{title: string; link: string;}[];
  thirdSec:{title: string; link: string;}[];
}
const fac = new FastAverageColor();
const OptionBox:React.FC<props>=({image, secondSec, thirdSec})=> {

  const [dynamicClr, setDynamicClr] = useState("#000");

  useEffect(()=>{
    const getDynamicClr = async ()=>{
      const clr = await fac.getColorAsync(image.src);
     setDynamicClr(lightenColor(clr.hex, 0));
    }
    getDynamicClr();
  },[setDynamicClr, image.src]);

  const lightenColor = (hex:string, percent:number) => {
    // Remove the hash if present
    hex = hex.replace(/^#/, '');
  
    // Parse r, g, b values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
  
    // Calculate new r, g, b values
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  
    // Return the new color in hex format
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  return (
    <div className={styles.optionBoxContainer}>

     <div className={styles.optionBox}>
      <div className={styles.firstSec}>
        <div>
           <DropdownTinySlider image={image}/>
        </div>

        <div>
            <div><InsertLinkIcon fontSize="small"/></div>
            <p className={styles.text}>About</p>
        </div>
      </div>

      <div className={styles.secondSec}>
        {secondSec.map((val, index)=>{
         return <div key={index}>
            <div><FiberManualRecordIcon fontSize="small" style={{fontSize:'12px', color:`${dynamicClr}`}}/></div>
            <p className={styles.text}>{val.title}</p>
         </div>
        })}
      </div>

      <div className={styles.thirdSec}>
        {thirdSec.map((val, index)=>{
         return <div key={index}>
         <div><FiberManualRecordIcon fontSize="small" style={{fontSize:'12px', color:`${dynamicClr}`}}/></div>
         <p className={styles.text}> {val.title} </p>
         </div>
        })}
      </div>
     </div>

    </div>
  );
}

export default OptionBox;
