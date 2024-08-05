import { Popover } from 'antd'
import OptionBox from './OptionBox'
import styles from "../../../styles/Homepage/Navbar.module.css"
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import tshirt from "../../../assets/img/tshirt.jpg"

function TshirtDropdownOption() {

    const image ={
        src: tshirt,
        link: "https://www.google.com/search?q=tshirt"
      }
      const secondSec = [
        { title: 'high heels', link: 'https://example.com/second1' },
        { title: 'flats', link: 'https://example.com/second2' },
        { title: 'sneakers', link: 'https://example.com/second3' },
        { title: 'boots', link: 'https://example.com/second3' },
      ];
    
      const thirdSec = [
        { title: 'high heels', link: 'https://example.com/second1' },
        { title: 'flats', link: 'https://example.com/second2' },
        { title: 'sneakers', link: 'https://example.com/second3' },
        { title: 'boots', link: 'https://example.com/second3' },
      ];

  return (
    <Popover content={<OptionBox image={image} secondSec={secondSec} thirdSec={thirdSec}/>} trigger="hover">
    <div className={styles.tshirt}>T-Shirt <KeyboardArrowDownTwoToneIcon /></div>
  </Popover>
  )
}

export default TshirtDropdownOption