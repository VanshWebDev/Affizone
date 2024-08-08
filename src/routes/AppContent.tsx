import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import RouteProtection from "../component/Auth/RouteProtection";
import CreatePassword from "../component/Auth/CreatePassword";
import Homepage from "../component/home/Homepage";
import ProtectedRoute from "../component/Auth/ProtectedRoute";
import Profile from "../component/profile/Profile";
import NotFound from "../pages/notFound/NotFound";
import ResetPasswordPage from "../component/Auth/login/ResetPwd";
import ResetpwdRouteProtection from "../component/Auth/ResetpwdRouteProtection";
import { RootState } from "../redux/store";
import Interest from "../pages/portal/Interest";
import InterestRouteProtection from "../component/Auth/InterestRouteProtection";
import { LoadingOutlined } from "@ant-design/icons";
import { userInfo } from "../features/counter/counterSlice";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/Signup/Signup";

function AppContent() {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const dispatch = useDispatch();
  const { ReRender, ReRenderOfSignup, canResetpwd, interest } = useSelector(
    (state: RootState) => state.counter
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // use null to indicate loading state
  const [passwordRoute, setPasswordRoute] = useState<boolean>(false);
  const [resetpwdRoute, setResetpwdRoute] = useState<boolean>(false);
  const [interestRoute, setInterestRoute] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(`${backendApiUrl}/auth/checktoken`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.status === 200) {
          const userData = res.data.user;
          dispatch(userInfo(userData)); // Store user data in Redux
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };
    checkToken();
  }, [ReRender, backendApiUrl]);

  useEffect(() => {
    if (ReRenderOfSignup) {
      setPasswordRoute(true);
    }
  }, [ReRenderOfSignup]);

  useEffect(() => {
    if (canResetpwd) {
      setResetpwdRoute(true);
    }
  }, [canResetpwd]);

  useEffect(() => {
    if (interest) {
      setInterestRoute(true);
    }
  }, [interest]);

  if (isAuthenticated === null) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingOutlined />
      </div>
    ); // show loading state while checking authentication
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={isAuthenticated ? <Homepage /> : <Login />}/>
      <Route path="/signup" element={isAuthenticated ? <Homepage /> : <Signup />}/>
      <Route
        path="/auth/createpassword"
        element={
          <RouteProtection passwordRoute={passwordRoute}>
            <CreatePassword />
          </RouteProtection>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/resetpwd"
        element={
          <ResetpwdRouteProtection resetpwdRoute={resetpwdRoute}>
            <ResetPasswordPage />
          </ResetpwdRouteProtection>
        }
      />
      <Route
        path="/auth/interest"
        element={
          <InterestRouteProtection interestRoute={interestRoute}>
            <Interest />
          </InterestRouteProtection>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppContent;
