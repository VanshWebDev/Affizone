import { Form, Input, Button, message } from "antd";
import axios, { AxiosError } from "axios";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/auth/signup/SignupForm.module.css";
import GoogleAuth from "../GoogleAuth";
import { LoadingOutlined } from "@ant-design/icons";
import { InboxOutlined, KeyOutlined } from "@ant-design/icons";
import CreateUsername from "./CreateUsername";

const SignupForm = () => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "updatable";
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const onFinish = async (values: { email: string; otp: string }) => {
    console.log("Success:", values);
    setIsLoading(true);
    // Handle email and OTP verification
    try {
      const response = await axios.post(
        `${backendApiUrl}/auth/verifyotpforsignup`,
        { email: values.email, otp: parseInt(values.otp) },
        { withCredentials: true }
      );
      if (response.status === 200) {
        message.success(response.data.message);
        setIsEmailVerified(true);
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      message.warning(
        axiosError.response?.data?.message || "Some Error occurred."
      );
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: object) => {
    console.log("Failed:", errorInfo);
  };

  const handleSendOtp = async () => {
    let loadingTimeout;
    messageApi.open({ key, type: "loading", content: "Sending OTP..." });
    loadingTimeout = setTimeout(() => {
      messageApi.open({ key, type: "loading", content: "Checking mail.." });
    }, 1000);

    try {
      const response = await axios.post(
        `${backendApiUrl}/auth/sendotp`,
        { email: form.getFieldValue("email") },
        { withCredentials: true }
      );
      console.log(response);
      clearInterval(loadingTimeout);
      if (response.status === 200) {
        const { message, emailSent } = response.data;
        if (emailSent) {
          messageApi.open({ key, type: "success", content: message });
        }
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        clearInterval(loadingTimeout);
        messageApi.open({
          key,
          type: "error",
          content: err?.response?.data?.message,
        });
      }
    }
  };

  return (
    <div className={styles.signupFormContainer}>
      {contextHolder}
      <div className={styles.signupForm}>
        <p className={styles.title}>Sign up</p>
        {!isEmailVerified && (
          <>
            <Form
              form={form}
              name="createPassword"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p>Email</p>
              <Form.Item
                name="email"
                hasFeedback
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  placeholder="Email"
                  type="email"
                  className={styles.emailInput}
                  prefix={<InboxOutlined />}
                />
              </Form.Item>
              <p>OTP</p>
              <Form.Item
                name="otp"
                hasFeedback
                rules={[{ required: true, message: "Please input your OTP!" }]}
                style={{ marginBottom: "5px" }}
              >
                <Input
                  placeholder="OTP"
                  prefix={<KeyOutlined />}
                  className={styles.otpInput}
                  type="number"
                />
              </Form.Item>
              <div className={styles.sendOtp}>
                <div onClick={handleSendOtp}>Send OTP</div>
              </div>
              <Button
                type="link"
                htmlType="submit"
                loading={isLoading}
                className={styles.signupBtn}
              >
                Verify OTP
              </Button>
            </Form>
          </>
        )}
        {isEmailVerified && (
          <CreateUsername email={form.getFieldValue("email")} />
        )}

        <Form.Item style={{ marginTop: "15px" }}>
          <div className={styles.actionBtns}>
            <p className={styles.dontHaveAccount}>
              Already have an account{" "}
              <span onClick={() => navigate("/login")}>Sign in</span>
            </p>
            <p className={styles.orWith}>or with</p>
            <div className={styles.googleAuthContainer}>
              <Suspense fallback={<LoadingOutlined />}>
                <GoogleAuth authMethod="signupwithgoogle"/>
              </Suspense>
            </div>
          </div>
        </Form.Item>
      </div>
    </div>
  );
};

export default SignupForm;
