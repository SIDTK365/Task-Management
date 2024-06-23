import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  Row,
  Col,
  Space,
  Table,
  Tag,
  theme,
  Typography,
  message,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  RollbackOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getallTasks, createTask } from "../query/api";
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;

const indianDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function App() {
  const queryClient = useQueryClient();
  const { token } = useToken();
  const screens = useBreakpoint();
  const [data, setData] = useState([]);

  // const getallTasksQuery = useQuery({
  //   queryKey: ["getallTasksQuery"],
  //   queryFn: getallTasks,
  //   onSuccess: (data) => {
  //     console.log("Data fetched successfully:", data);
  //     setData(data);
  //   },
  //   onError: (error) => {
  //     message.error(
  //       error.response?.data?.message || error.message || "An error occurred",
  //     );
  //     console.error("Error fetching data:", error);
  //   },
  // });

  const getallTasksQuery = useQuery({
    queryKey: ["getallTasksQuery"],
    queryFn: getallTasks,
  });

  // Handle the query state
  useEffect(() => {
    if (getallTasksQuery.isSuccess) {
      console.log("Data fetched successfully:", getallTasksQuery.data);
      if (getallTasksQuery.data && Array.isArray(getallTasksQuery.data.data)) {
        const formattedData = getallTasksQuery.data.data.map((item) => ({
          ...item,
          key: item._id, // Use _id as the key for each row
        }));
        setData(formattedData);
      } else {
        console.error(
          "Received data is not in the expected format:",
          getallTasksQuery.data,
        );
        setData([]);
      }
    }
    if (getallTasksQuery.isError) {
      const error = getallTasksQuery.error;
      message.error(
        error.response?.data?.message || error.message || "An error occurred",
      );
      console.error("Error fetching data:", error);
    }
  }, [
    getallTasksQuery.isSuccess,
    getallTasksQuery.isError,
    getallTasksQuery.data,
    getallTasksQuery.error,
  ]);

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.invalidateQueries(["getallTasksQuery"]);
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || error.message || "An error occurred",
      );
      console.error("Error:", error);
    },
  });

  // const [data, setData] = useState([
  //   {
  //     key: "1",
  //     title: "Thi1s is a title13123",
  //     desc: "Thi123s i32s a desc",
  //     important: false,
  //     complete: false,
  //     createdAt: "2024-06-22T19:30:23.668Z",
  //     updatedAt: "2024-06-22T19:30:23.668Z",
  //   },
  //   {
  //     key: "2",
  //     title: "This is a title13123",
  //     desc: "Thi123s is a desc",
  //     important: false,
  //     complete: true,
  //     createdAt: "2024-06-22T19:30:17.826Z",
  //     updatedAt: "2024-06-22T19:30:17.826Z",
  //   },
  //   {
  //     key: "3",
  //     title: "This is a title1",
  //     desc: "This is a desc",
  //     important: true,
  //     complete: false,
  //     createdAt: "2024-06-22T19:30:06.206Z",
  //     updatedAt: "2024-06-22T19:30:06.206Z",
  //   },
  // ]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Important",
      dataIndex: "important",
      key: "important",
      render: (important) => (
        <Tag color={important ? "green" : "red"}>
          {important ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Complete",
      dataIndex: "complete",
      key: "complete",
      render: (complete) => (
        <Tag color={complete ? "green" : "red"}>{complete ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => indianDateFormatter.format(new Date(createdAt)),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => indianDateFormatter.format(new Date(updatedAt)),
    },
    {
      title: "",
      key: "action",
      align: "right",
      width: 88,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
          >
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: "Edit",
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: "Preview",
      icon: <EyeOutlined />,
    },
    {
      key: "3",
      label: "Mark Important",
      icon: <RollbackOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  const handleAdd = async () => {
    createTaskMutation.mutate({
      title: "Added right now 23jun",
      desc: "Added right now 23jun",
    });
  };

  const styles = {
    container: {
      margin: "0 auto",
      maxWidth: screens.lg ? token.screenXL : token.screenSM,
      padding: screens.md
        ? `0px ${token.paddingLG}px`
        : `0px ${token.padding}px`,
    },
    section: {
      backgroundColor: token.colorBgContainer,
      padding: `${token.sizeXXL}px 0px`,
    },
    text: {
      color: token.colorTextSecondary,
    },
    button: {
      marginBottom: token.marginLG,
    },
  };

  return (
    <div style={styles.section}>
      <div style={styles.container}>
        <Row justify="end" style={styles.button}>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Add Entry
            </Button>
          </Col>
        </Row>
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
          loading={getallTasksQuery.isLoading}
          scroll={screens.lg ? "" : { x: token.screenXL }}
        />
      </div>
    </div>
  );
}
