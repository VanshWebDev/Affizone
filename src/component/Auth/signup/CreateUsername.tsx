import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/auth/signup/SignupForm.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ErrHandling } from "../../../utils/Err/ErrHandling";

const CreateUsername:FC<{email:string}> = ({ email }) => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(120);
  const [usernameFeedback, setUsernameFeedback] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);
  console.log("this is ", email);

  interface values {
    username: string;
    password: string;
    confirmPassword: string;
    email:string;
  }

  const onFinish = async (values: values) => {
    values.email=email;

    setIsLoading(true);
    const ApiUrl =`${backendApiUrl}/auth/signupwithemail`;
    try {
      const response = await axios.post(ApiUrl, values, {withCredentials: true});

      console.log(response);
      
      message.success(response.data.message);
      setIsLoading(false);
    } catch (err: unknown) {
      ErrHandling(err, "")
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
      message.warning("account creation timeout");
    }
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, navigate]);

  const checkUsernameAvailability = useCallback(
    async (usr: string) => {
      try {
        const response = await axios.get(
          `${backendApiUrl}/auth/checkusername?usr=${usr}`
        );
        console.log(response);
        if (response.data.isUsernameAvilable)
          setUsernameFeedback("Username is available.");
        else setUsernameFeedback("Username is already taken.");
      } catch (error) {
        console.error("Error checking username availability:", error);
        setUsernameFeedback("Error checking username.");
      }
    },
    [backendApiUrl]
  );

  const onFinishFailed = (errorInfo: object) => {
    console.log("Failed:", errorInfo);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usr = e.target.value;

    let feedbackMessage = "";
    if (usr.length < 2 || usr.length > 30) {
      feedbackMessage = "2 to 30 characters.";
    } else if (!/^[a-z0-9_]+$/.test(usr)) {
      feedbackMessage = "Use only lowercase letters, numbers, or '_'.";
    } else if (/_______/.test(usr)) {
      feedbackMessage = "Affizone cannot contain consecutive '_'.";
    } else {
      feedbackMessage = "Affizone is valid.";
    }

    if (usr.length >= 2 && feedbackMessage === "Affizone is valid.") {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      setDebounceTimer(
        setTimeout(() => {
          checkUsernameAvailability(usr);
        }, 500) as unknown as number
      );
    }

    setUsernameFeedback(feedbackMessage);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    // setPassword(pwd);

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
  const usernameFeedbackColor =
    usernameFeedback === "Username is valid." ||
    usernameFeedback === "Username is available."
      ? "green"
      : "red";

  return (
    <Form
      form={form}
      name="createPassword"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <>
        <p>Username</p>
        <Form.Item
          name="affiname"
          hasFeedback
          help={
            <span style={{ color: usernameFeedbackColor }}>
              {usernameFeedback}
            </span>
          }
          rules={[{ required: true, message: "Please input your Affiname!" }]}
        >
          <Input
            placeholder="Affiname"
            className={styles.usernameInput}
            prefix={<UserOutlined />}
            onChange={handleUsernameChange}
          />
        </Form.Item>

        <p>Password</p>
        <Form.Item
          name="password"
          hasFeedback
          help={<span style={{ color: feedbackColor }}>{feedback}</span>}
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Min: 6 characters." },
            { max: 20, message: "Max: 20 characters." },
            {
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
              message:
                "Include uppercase, lowercase, number, and special character.",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            onChange={handlePasswordChange}
            className={styles.pwdInput}
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <p>Confirm password</p>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            className={styles.confirmPwdInput}
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Button
          type="link"
          htmlType="submit"
          loading={isLoading}
          className={styles.signupBtn}
        >
          Sign Up
        </Button>
      </>
    </Form>
  );
};

export default CreateUsername;
