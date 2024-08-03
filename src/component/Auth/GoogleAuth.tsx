import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleCredentialResponse,
} from "@react-oauth/google";
import axios, { AxiosError } from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ReRender,
  ReRenderOfSignup,
} from "../../features/counter/counterSlice";

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

const GoogleAuth = () => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const reRender = useSelector((state: any) => state.counter.ReRender);
  const handleSignupSuccess = async (response: GoogleCredentialResponse) => {
    const { credential: token } = response;

    try {
      const res = await axios.post(
        `${backendApiUrl}/auth/signup`,
        {
          token,
        },
        { withCredentials: true }
      );
      message.success(res.data.message);
      if (res.data.newUser) {
        dispatch(ReRenderOfSignup());
        navigate("/auth/createpassword");
      } else dispatch(ReRender());
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      message.error(axiosError?.response?.data?.message || "try after some time");
    }
  };


  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSignupSuccess}
        onError={() => {
          console.log("err during signup");
        }}
        size="medium"
        shape="rectangular"
        width={10}
        text="continue_with"
        type="standard"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
