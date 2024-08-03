import { Form, Input, Button, message } from "antd";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Merged both imports from feature and main
import { useNavigate } from "react-router-dom";
import { interest } from "../../features/counter/counterSlice";

const CreatePassword = () => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  // Hooks and state management
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(""); // State for password input
  const [feedback, setFeedback] = useState(""); // State for password feedback
  const [timer, setTimer] = useState(120);
  const [usernameFeedback, setUsernameFeedback] = useState(""); // State for username feedback
  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);
  // Handler for successful form submission
  const onFinish = async (values: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log("Success:", values);
    setIsLoading(true);
    try {
      // Attempt to create the password and username with the given values
      const response = await axios.post(
        `${backendApiUrl}/auth/createpassword`,
        values,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(interest());
        navigate("/auth/interest");
      }
      message.success(response.data.message);
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
      navigate("/");
      const axiosError = error as AxiosError<{ message: string }>;
      message.warning(
        axiosError.response?.data?.message || "Some Error occurred."
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
      message.warning("Password creation timeout");
    }
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, navigate]);

  // Debounced function to check username availability
  const checkUsernameAvailability = useCallback(
    async (usr: string) => {
      try {
        // Make an API call to check if the username is available
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

  // Handler for failed form submission
  const onFinishFailed = (errorInfo: object) => {
    console.log("Failed:", errorInfo);
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usr = e.target.value;

    // Set feedback message based on username validity
    let feedbackMessage = "";
    if (usr.length < 2 || usr.length > 30) {
      feedbackMessage = "2 to 30 characters.";
    } else if (!/^[a-z0-9_]+$/.test(usr)) {
      feedbackMessage = "Use only lowercase letters, numbers, or '_'.";
    } else if (/_______/.test(usr)) {
      feedbackMessage = "Username cannot contain consecutive '_'.";
    } else {
      feedbackMessage = "Username is valid.";
    }

    // Clear any existing debounce timer
    if (usr.length >= 2 && feedbackMessage === "Username is valid.") {
      // Clear any existing debounce timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set a new debounce timer to check availability after a delay
      setDebounceTimer(
        setTimeout(() => {
          checkUsernameAvailability(usr);
        }, 500) as unknown as number
      );
    }

    setUsernameFeedback(feedbackMessage);
  };

  // Password feedback logic
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
  const usernameFeedbackColor =
    usernameFeedback === "Username is valid." ||
    usernameFeedback === "Username is available."
      ? "green"
      : "red";

  // Render form with layout and validation
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          border: "1px solid #dedede",
          padding: "20px",
          borderRadius: "10px",
          background:'#ebebeb'
        }}
      >
        <h4 style={{marginBottom:'10px'}}>Create Password and Username</h4>
        {/* <span style={{ color: availabilityColor }}>{usrenameAvilablity}</span> */}
        <Form
          form={form}
          name="createPassword"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            hasFeedback
            help={
              <span style={{ color: usernameFeedbackColor }}>
                {usernameFeedback}
              </span>
            }
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" onChange={handleUsernameChange} />
          </Form.Item>

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
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character.",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>

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
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePassword;
