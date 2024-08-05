import { Image } from "antd";
import React from "react";

interface props{
  image:{
    src: string;
    link: string;
  }
}

const DropdownTinySlider:React.FC<props>=({image}) =>{
  return (
    <a href={image.link} >
      <Image
        preview={false}
        width={80}
        src={image.src}
        style={{borderRadius:'10px'}}
      />
    </a>
  );
}

export default DropdownTinySlider;
