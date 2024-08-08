import  { FC, Suspense, lazy, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import axios, {AxiosError} from "axios";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
const GoogleAuth = lazy(() => import('../GoogleAuth'));// import PropTypes from "prop-types";

import {
  ReRender,
  canResetpwd,
  userEmail,
} from "../../../features/counter/counterSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/auth/login/LoginFrom.module.css"

// Define the type for the form values expected in the login form
interface LoginFormValues {
  emailOrUsername: string;
  password: string;
}

// Define the response type structure
interface ApiResponse {
  message: string;
  emailSent: boolean;
}

const LoginForm: FC = () => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";

  // Use Ant Design's Form hook
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const { resetpwd } = useSelector((state: any) => state.counter);
  const navigate = useNavigate();

  const onFinishLogin = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        `${backendApiUrl}/auth/login`,
        values,
        { withCredentials: true }
      );

      message.success(response.data.message);
      if (response) {
        setLoading(false);
        dispatch(ReRender()); // Dispatch the ReRender action
        navigate("/");
      }
    } catch (error) {
      // Type the error as AxiosError to properly access the response property
      const axiosError = error as AxiosError<{ message: string }>;
      message.error(axiosError?.response?.data?.message || "Login failed.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const emailOrUsername = form.getFieldValue("emailOrUsername");
    console.log(emailOrUsername)
    if (!emailOrUsername) {
      message.warning("Please enter your email.");
      return;
    }
    dispatch(userEmail(emailOrUsername));
    let loadingTimeout;
    try {
      messageApi.open({ key, type: "loading", content: "Sending OTP..." });

      // Set a minimum display time for the loading message (e.g., 1000ms)
      loadingTimeout = setTimeout(() => {
        messageApi.open({ key, type: "loading", content: "Checking mail.." });
      }, 2000);

      const response = await axios.post<ApiResponse>(
        `${backendApiUrl}/auth/forget-pwd`,
        {
          emailOrUsername,
        }
      );
      // message.loading({content:"checking mail..",key:"loading"})
      const { message: apiMsg, emailSent } = response.data;
      if (emailSent) {
        console.log(response);
        clearTimeout(loadingTimeout)
        message.success(apiMsg);
        dispatch(canResetpwd());
        navigate("/auth/resetpwd");
      } else message.error(apiMsg || "Some error occurd try after sometime");
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      const errMsg = axiosError?.response?.data?.message;
      message.error({
        content: errMsg || "An error occurred.",
        key: "loading",
      });
      if (errMsg == "OTP already sent") {
        dispatch(canResetpwd());
        navigate("/auth/resetpwd");
      }
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      {contextHolder}
      <div className={styles.loginForm}>
      <p className={styles.title}>Login</p>
      <Form
        form={form}
        style={{ width: "300px" }}
        className="form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinishLogin}
      >
        <p>Email</p>
        <Form.Item
          name="emailOrUsername"
          rules={[
            {
              required: true,
              message: "Input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email or Username"
            className={styles.emailInput}
          />
        </Form.Item>
        <div className={styles.passwordInput}>
        <p>Password</p>
        <Form.Item
        style={{marginBottom:'5px'}}
          name="password"
          rules={[
            {
              required: true,
              message: "Input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            className={styles.pwdInput}
          />
        </Form.Item>
        <div className={styles.forgotPwd}><div onClick={handleForgotPassword}>Forgot password?</div></div>
        </div>
        <Form.Item>
          <div className={styles.actionBtns}>
            <Button loading={loading} type="link" htmlType="submit" className={styles.signInBtn}> Sign in </Button>
            <p className={styles.dontHaveAccount}>Don't have an account <span onClick={()=>navigate("/signup")}>Sign up</span></p>
            <p className={styles.orWith}>or with</p>
            <div className={styles.googleAuthContainer}>
                <Suspense fallback={<LoadingOutlined />}>
                  <GoogleAuth authMethod="signinwithgoogle"/>
                </Suspense>
              </div>
          </div>
        </Form.Item>
      </Form>
      </div>
    </div>
  );
};


export default LoginForm;
