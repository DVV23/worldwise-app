import styles from "./Sidebar.module.css";
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      {/* Outlet components from react-router-dom, often used for Nested Routes */}
      <Footer />
    </div>
  );
}
export default Sidebar;
