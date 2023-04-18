import React, {useState} from "react";
import styles from './Layout.module.css';
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import Contant from "./Contant";

const Layout = () =>{
    const [open, setOpen] = useState(true);
    const drawerHandler = () => setOpen((preState)=> !preState);

 return (
     <div className={styles.main}>
         <TopNav drawerHandler={drawerHandler}/>
         <div className={styles.wrapper}>
             <Sidebar
                 isOpenSidebar={open}
                 onCloseSidebar={() => setOpen(false)}
             />
             <Contant/>
         </div>
     </div>
 )
};

export default Layout;