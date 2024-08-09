import {
  GoogleOAuthProvider,
  GoogleLogin,
  GoogleCredentialResponse,
} from "@react-oauth/google";
import axios from "axios";
import { Button, message } from "antd";
import { FC } from "react";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { ReRender } from "../../features/counter/counterSlice";
import { useNavigate } from "react-router-dom";
import { ErrHandling } from "../../utils/Err/ErrHandling";

const clientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;

const GoogleAuth: FC<{ authMethod: string }> = ({ authMethod }) => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const handleSignupSuccess = async ( response: GoogleCredentialResponse, wantToCreateNewAcc: boolean = false ) => {
    const { credential: token } = response;

    try {
      const ApiUrl = `${backendApiUrl}/auth/${authMethod}`;
      const res = await axios.post( ApiUrl, { token, wantToCreateNewAcc }, { withCredentials: true });

      console.log(res);

      if (res.data.exist) {
        api.open({
          message: "Account Exists",
          description:
            "An account with this email exists. Do you want to create another without deleting the existing one?",
          duration: 0,
          btn: (
            <div>
              <Button type="primary" onClick={() => handleYes(response)}>
                Yes
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleNo}>
                No
              </Button>
            </div>
          ),
        });
      } else {
        message.success(res.data.message);
        dispatch(ReRender());
        navigate("/");
      }
    } catch (err: unknown) {
      ErrHandling(err, "try after some time");
    }
  };
  const handleYes = (res:GoogleCredentialResponse) => {
    handleSignupSuccess(res, true);
    api.destroy();
  };

  const handleNo = () => {
    console.log("No clicked");
    api.destroy();
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {contextHolder}
      <GoogleLogin
        onSuccess={handleSignupSuccess}
        onError={() => {
          console.log("err during signup");
        }}
        size="large"
        shape="square"
        width="50"
        text="continue_with"
        type="standard"
        theme="outline"
        auto_select
        useOneTap
        logo_alignment="center"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
