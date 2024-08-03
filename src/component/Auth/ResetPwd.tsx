import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CounterState } from "../../features/counter/counterSlice";

const ResetPasswordPage = () => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  interface RootState {
    counter: CounterState;
  }
  const [loading, setLoading] = useState(false);
  const { userEmail } = useSelector((state: RootState) => state?.counter);
  const [password, setPassword] = useState(""); // State for password input
  const [feedback, setFeedback] = useState(""); // State for password feedback
  const navigate = useNavigate();

  interface valuesValidation {
    otp: number;
    newPassword: string;
    confirmPassword: string;
  }

  const onFinish = async (values: valuesValidation) => {
    setLoading(true);

    const { newPassword, confirmPassword } = values;

    try {
      if (newPassword !== confirmPassword) {
        message.error("Passwords do not match. Please re-enter.");
        setLoading(false);
        return;
      }

      // Make API call to reset password using OTP and new password
      const response = await axios.post(`${backendApiUrl}/auth/verify-otp`, {
        ...values,
        userEmail,
      });
      console.log(response);
      const { message: apiMsg, isPwdReset } = response.data;
      message.success(apiMsg);
      if (isPwdReset) navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      message.error(
        axiosError?.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);

    let feedbackMessage = "";
    if (pwd.length < 6 || pwd.length > 20) {
      feedbackMessage = "Password must be 6-20 characters.";
    } else if (!/[A-Z]/.test(pwd)) {
      feedbackMessage = "Include an uppercase letter.";
    } else if (!/[a-z]/.test(pwd)) {
      feedbackMessage = "Include a lowercase letter.";
    } else if (!/\d/.test(pwd)) {
      feedbackMessage = "Include a number.";
    } else if (!/[@$!%*?&]/.test(pwd)) {
      feedbackMessage = "Include a special character.";
    } else {
      feedbackMessage = "Password is strong.";
    }
    setFeedback(feedbackMessage);
  };

  const feedbackColor = feedback === "Password is strong." ? "green" : "red";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid #dedede",
          padding: "20px",
          borderRadius: "10px",
          background: "#ebebeb",
        }}
      >
        <center style={{marginBottom:'10px'}}>Change Password</center>
        <Form
          style={{ width: "300px" }}
          name="reset_password_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Please input your OTP!" }]}
          >
            <Input placeholder="Enter OTP" type="number" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            hasFeedback
            help={<span style={{ color: feedbackColor }}>{feedback}</span>}
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Min: 6 characters." },
              { max: 20, message: "Max: 20 characters." },
              {
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character.",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
