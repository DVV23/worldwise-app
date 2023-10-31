import Sidebar from "../components/Sidebar";
import Map from "../components/Map.jsx";
import User from "./../components/User.jsx";

import styles from "./AppLayout.module.css";

function AppLayOut() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
export default AppLayOut;
