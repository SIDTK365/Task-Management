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
  Form,
  Input,
  Modal,
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
import {
  getallTasks,
  createTask,
  deleteTask,
  updateTask,
  updateImportantTask,
  updateCompleteTask,
} from "../query/api";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();

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
      // console.log("Data fetched successfully:", getallTasksQuery.data);
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

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, requestBody }) => updateTask(taskId, requestBody),
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

  const updateImportantTaskMutation = useMutation({
    mutationFn: (taskId) => updateImportantTask(taskId),
    onSuccess: (data) => {
      message.success(data.message || "Task updated successfully");
      queryClient.invalidateQueries(["getallTasksQuery"]);
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while updating the task.",
      );
      console.error("Error:", error);
    },
  });

  const updateCompleteTaskMutation = useMutation({
    mutationFn: (taskId) => updateCompleteTask(taskId),
    onSuccess: (data) => {
      message.success(data.message || "Task updated successfully");
      queryClient.invalidateQueries(["getallTasksQuery"]);
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while updating the task.",
      );
      console.error("Error:", error);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      message.success(data.message || "Task deleted successfully");
      queryClient.invalidateQueries(["getallTasksQuery"]); // Invalidate the query to refetch data
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while deleting the task.",
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
              items: items(record),
            }}
            placement="bottomRight"
          >
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const items = (record) => [
    {
      key: "1",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => handleEdit(record),
    },
    {
      key: "2",
      label: "Mark Complete",
      icon: <EyeOutlined />,
      onClick: () => handleToggleComplete(record._id),
    },
    {
      key: "3",
      label: "Mark Important",
      icon: <RollbackOutlined />,
      onClick: () => handleToggleImportant(record._id),
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: "Delete",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(record),
    },
  ];

  const handleDelete = (record) => {
    // console.log(record);
    deleteTaskMutation.mutate(record._id);
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    editForm.setFieldsValue({
      id: record._id,
      title: record.title,
      description: record.desc,
    });
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = (values) => {
    const { id, title, description } = values;
    updateTaskMutation.mutate({
      taskId: id,
      requestBody: { title, description },
    });
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  const handleToggleImportant = (taskId) => {
    updateImportantTaskMutation.mutate(taskId);
  };

  const handleToggleComplete = (taskId) => {
    updateCompleteTaskMutation.mutate(taskId);
  };

  const handleSubmit = (values) => {
    createTaskMutation.mutate({
      title: values.title,
      desc: values.description,
    });
    setIsModalVisible(false);
    form.resetFields();
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
      <Modal
        title="Add New Task"
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Task"
        visible={isEditModalVisible}
        onOk={() => editForm.submit()}
        onCancel={() => {
          setIsEditModalVisible(false);
          editForm.resetFields();
        }}
      >
        <Form form={editForm} onFinish={handleEditSubmit} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
