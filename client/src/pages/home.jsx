import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Grid,
  Layout,
  Menu,
  Space,
  theme,
  Typography,
} from "antd";
import {
  AppstoreAddOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoreOutlined,
  SettingOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Logo from "../assets/logo";
import AllTaskTable from "../components/alltasks";
import ImportantTask from "../components/important";
import CompletedTask from "../components/complete";
import IncompleteTask from "../components/incomplete";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { getUserInfoFromToken } from "../utility/userInfo";
const { Sider, Content } = Layout;
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ userName: "", email: "" }); // State to store user info
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Dispatch logout action
    dispatch(authActions.logout());
    // Navigate to sign-in page
    navigate("/sign-in");
  };

  useEffect(() => {
    const info = getUserInfoFromToken();
    if (info) {
      setUserInfo(info);
    }
  }, []);

  token.colorFillAlter = "transparent";

  const shouldDisplayOnMobile = screens.lg || screens.xs;

  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: screens.md
        ? `0px ${token.paddingLG}px`
        : `0px ${token.padding}px`,
    },
    content: {
      padding: screens.sm
        ? `${token.padding}px ${token.padding}px ${token.padding}px 0`
        : "0",
      flex: 1,
      overflow: "hidden",
    },
    divider: {
      margin: 0,
    },
    header: {
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      padding: screens.lg
        ? `${token.paddingLG}px 0px`
        : `${token.padding}px 0px`,
    },
    headerTitleWrapper: {
      alignContent: "end",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    hideTabletDisplayMobile: {
      display: shouldDisplayOnMobile ? "block" : "none",
    },
    layout: {
      overflow: "hidden",
    },
    logoWrapper: {
      padding: `${token.paddingLG}px 28px ${token.padding}px 28px`,
    },
    main: {
      backgroundColor: token.colorBgContainer,
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowTertiary,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    navbarContainer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      margin: "0 auto",
      padding: `${token.paddingXS}px ${token.padding}px`,
    },
    navbarMobile: {
      display: screens.sm ? "none" : "block",
    },
    navMenu: {
      backgroundColor: "transparent",
      border: 0,
      flexGrow: 1,
    },
    paragraph: {
      color: token.colorTextSecondary,
    },
    placeholder: {
      backgroundColor: token.colorBgLayout,
      border: `${token.lineWidth}px dashed ${token.colorBorder}`,
      borderRadius: token.borderRadiusLG,
      padding: token.paddingLG,
      height: "100%",
      overflowY: "auto",
    },
    profileAvatar: {
      marginLeft: shouldDisplayOnMobile ? "0" : "4px",
      right: shouldDisplayOnMobile ? "0px" : "8px",
    },
    profileMenu: {
      backgroundColor: "transparent",
      border: 0,
    },
    sider: {
      backgroundColor: "#f0f0f0",
      display: screens.sm ? "block" : "none",
      flexDirection: "column",
    },
    siderContent: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    title: {
      fontSize: screens.lg ? token.fontSizeHeading3 : token.fontSizeHeading4,
      margin: 0,
    },
  };

  const items = [
    {
      key: "alltasks",
      icon: <HomeOutlined />,
      label: "All Tasks",
    },
    {
      key: "imptasks",
      icon: <ClockCircleOutlined />,
      label: "Important Tasks",
    },
    {
      key: "completetasks",
      icon: <SettingOutlined />,
      label: "Completed Tasks",
    },
    {
      key: "incompletetasks",
      icon: <SettingOutlined />,
      label: "Incomplete Tasks",
    },
  ];

  const profileMenuItems = [
    {
      key: "profile",
      label: (
        <Space>
          <Avatar
            style={styles.profileAvatar}
            size="small"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1661&q=80"
          />
          <Text strong style={styles.hideTabletDisplayMobile}>
            {userInfo.userName}
          </Text>
        </Space>
      ),
      children: [
        {
          label: userInfo?.email,
          icon: <UserOutlined />,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: "Logout",
          icon: <LogoutOutlined />,
          key: "3",
          onClick: handleLogout,
        },
      ],
    },
  ];

  const [selectedItem, setSelectedItem] = useState("alltasks");
  const getTitle = () => {
    const item = items.find((i) => i.key === selectedItem);
    return item ? item.label : "Drafts";
  };
  const AllTasks = () => <AllTaskTable />;
  const ImportantTasks = () => <ImportantTask />;
  const CompletedTasks = () => <CompletedTask />;
  const IncompleteTasks = () => <IncompleteTask />;
  const renderContent = () => {
    switch (selectedItem) {
      case "alltasks":
        return <AllTasks />;
      case "imptasks":
        return <ImportantTasks />;
      case "completetasks":
        return <CompletedTasks />;
      case "incompletetasks":
        return <IncompleteTasks />;
      default:
        return <div>Select a task type</div>;
    }
  };

  const menus = (
    <>
      <Menu
        theme="light"
        mode="inline"
        style={styles.navMenu}
        defaultSelectedKeys={[selectedItem]}
        defaultOpenKeys={["my-library"]}
        items={items}
        onSelect={({ key }) => setSelectedItem(key)}
      />
      <Menu
        mode={screens.sm ? "vertical" : "inline"}
        items={profileMenuItems}
        style={styles.profileMenu}
      />
    </>
  );

  return (
    <Layout style={styles.layout}>
      <Sider
        style={styles.sider}
        width={256}
        theme="light"
        trigger={null}
        breakpoint="lg"
      >
        <div style={styles.siderContent}>
          <div style={styles.logoWrapper}>
            <Logo showText={shouldDisplayOnMobile} />
          </div>
          {menus}
        </div>
      </Sider>
      <Layout>
        <div style={styles.navbarMobile}>
          <div style={styles.navbarContainer}>
            <Logo showText={shouldDisplayOnMobile} />
            <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
            <Drawer
              title="Menu"
              placement="right"
              onClose={onClose}
              open={open}
              bodyStyle={{ padding: 0 }}
            >
              {menus}
            </Drawer>
          </div>
        </div>

        <Content style={styles.content}>
          <div style={styles.main} className="flex flex-col h-screen">
            <div style={styles.header}>
              <div style={styles.container}>
                <Space
                  size="middle"
                  direction="horizontal"
                  style={styles.headerTitleWrapper}
                >
                  <Space direction="vertical">
                    <Title style={styles.title}>{getTitle()}</Title>
                  </Space>
                </Space>
              </div>
            </div>
            <div style={styles.placeholder} className="flex-1 overflow-y-auto">
              {renderContent()}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
