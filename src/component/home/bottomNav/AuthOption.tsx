import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Bottom.css";
function AuthOption() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/login")}>Login</Button> &nbsp;
      <Button onClick={() => navigate("/signup")}>Signup</Button>
    </div>
  );
}

export default AuthOption;
