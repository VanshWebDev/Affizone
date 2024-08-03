import { Drawer } from "antd"
import MenueOptions from "./MenueOptions"

interface props{
  open: boolean,
  setOpen: (open: boolean) => void  // function to update the open state
 
}
const Menue:React.FC<props>=({open,setOpen})=> {

  return (
    <div>
         <Drawer
        title="Affizone"
        placement="left"
        closable={true}
        onClose={()=>setOpen(false)}
        open={open}
        key="left"
      >
        <MenueOptions />
      </Drawer>
    </div>
  )
}

export default Menue