import { Popover } from 'antd'
import OptionBox from './OptionBox'
import styles from "../../../styles/Homepage/Navbar.module.css"
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import watch from "../../../assets/img/watch.jpg"

function WatchDropdownOption() {

    const image ={
        src: watch,
        link: "https://www.google.com/search?q=smart watch"
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
    <div className={styles.tshirt}>Watch <KeyboardArrowDownTwoToneIcon /></div>
  </Popover>
  )
}
 
export default WatchDropdownOption;