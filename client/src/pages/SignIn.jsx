import React from "react";
import {
  Button,
  Col,
  Form,
  Grid,
  Input,
  Row,
  theme,
  Typography,
  message,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { logInFunction } from "../query/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = useMutation({
    mutationFn: logInFunction,
    onSuccess: (data) => {
      localStorage.setItem("id", data.id);
      localStorage.setItem("token", data.token);
      dispatch(authActions.login()); // Dispatch action to update Redux state
      navigate("/"); // Redirect to home page after successful login
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || error.message || "An error occurred",
      );
      console.error("Error:", error);
    },
  });

  const onFinish = (values) => {
    loginUser.mutate(values);
    // console.log("Received values of form: ", values);
  };

  const styles = {
    container: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh", // Ensure it takes full height
      padding: screens.md
        ? `${token.sizeXXL * 2}px ${token.paddingLG}px`
        : `${token.sizeXXL}px ${token.padding}px`,
    },
    formHeader: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    formWrapper: {
      maxWidth: "320px",
    },
    image: {
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      width: "100%",
      zIndex: "10",
    },
    imageWrapper: {
      display: screens.md ? "block" : "none",
      height: "100%",
      position: "relative",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    signup: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
  };

  return (
    <Row style={{ height: "100vh" }}>
      {" "}
      {/* Ensure the row takes full height */}
      <Col span={screens.md ? 10 : 24}>
        <div style={styles.container}>
          <div style={styles.formWrapper}>
            <div style={styles.formHeader}>
              {/* SVG and Title here */}
              <Title style={styles.title}>Sign in</Title>
              <Text style={styles.text}>
                Welcome back to Task Manager! Please enter your details below to
                sign in.
              </Text>
            </div>
            <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
              requiredMark="optional"
            >
              <Form.Item
                label="Username"
                name="userName"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: "0px" }}>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={loginUser.isLoading}
                >
                  Sign in
                </Button>
                <div style={styles.signup}>
                  <Text style={styles.text}>Don't have an account yet?</Text>{" "}
                  <Link href="/sign-up">Sign Up</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
      <Col span={14}>
        <div style={styles.imageWrapper}>
          <img
            style={styles.image}
            alt="Example"
            src="https://images.unsplash.com/photo-1534239697798-120952b76f2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
          />
        </div>
      </Col>
    </Row>
  );
}
