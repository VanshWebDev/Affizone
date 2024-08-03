import { Avatar, Input } from "antd";
import logo from "../../../assets/logo.png"
import styles from "../../../styles/Homepage/navbar/SecondSec.module.css"
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import React, { ChangeEvent, useState } from "react";

const SecondSec:React.FC<{search:boolean}> =({search})=> {
  const [isSearchRes, setIsSearchRes] = useState(false);

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    const value  = e.target.value;
    if(value.length > 0) setIsSearchRes(true);
    else setIsSearchRes(false);
  }
 
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log("e.target.value");
  }

  return (
    <div className={styles.secondSecContainer}>
      {search ? (
        <>
        <form className={styles.searchContainer} onSubmit={handleSubmit}>
          <Input placeholder="find your need..." onChange={handleSearch}/> 
          <button><SearchTwoToneIcon /></button>
        </form>
          <div className={`${isSearchRes ? styles.ifSearchResultBox : styles.ifSearchResultBoxNot} `}>
            <p>dfs</p>
            <p>dfs</p>
            <p>dfs</p>
            <p>dfs</p>
            <p>dfs</p>
            <p>dfs</p>
            <p>dfs</p>
          </div> 
        </>
      ) : (
       <div className={styles.logoContainer}>
          <div><Avatar src={logo} /></div>
          <p>Affizone</p> 
       </div>
      )}
   
    </div>
  );
}

export default SecondSec;
