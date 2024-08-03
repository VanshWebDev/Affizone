import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import RouteProtection from "../component/Auth/RouteProtection";
import CreatePassword from "../component/Auth/CreatePassword";
import Homepage from "../component/home/Homepage";
import ProtectedRoute from "../component/Auth/ProtectedRoute";
import Profile from "../component/profile/Profile";
import NotFound from "../pages/notFound/NotFound";
import ResetPasswordPage from "../component/Auth/ResetPwd";
import ResetpwdRouteProtection from "../component/Auth/ResetpwdRouteProtection";
import { RootState } from "../redux/store";
import Interest from "../pages/portal/Interest";
import InterestRouteProtection from "../component/Auth/InterestRouteProtection";

function AppContent() {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  // const reRender = useSelector((state) => state.counter.reRender);
  const { ReRender, ReRenderOfSignup, canResetpwd, interest } = useSelector((state: RootState) => state.counter);
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
        <h1>Loading...</h1>
      </div>
    ); // show loading state while checking authentication
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? "welcome" : <Homepage />} />
      <Route path="/mcq" />
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
            <Interest/>
          </InterestRouteProtection>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppContent;
