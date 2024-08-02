import { Button, message } from "antd";
import styles from "../../styles/portal/Main.module.css";
import Subjects from "./interest/subject";
import { ReRender } from "../../features/counter/counterSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"

function Main() {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.delete(`${backendApiUrl}/auth/logout`, {
        withCredentials: true,
      });
      message.success(response.data.message);
      dispatch(ReRender());
      navigate("/")
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Select your interest
      </h1>
      <Subjects />
      <Button onClick={logout} danger type="primary" shape="round" style={{marginLeft:'10px'}}>Logout</Button>
    </div>
  );
}

export default Main;
