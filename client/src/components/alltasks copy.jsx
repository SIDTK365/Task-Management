import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  Rate,
  Space,
  Table,
  Tag,
  theme,
  Typography,
} from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FileOutlined,
  RollbackOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text } = Typography;

export default function App() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const columns = [
    {
      title: "Product",
      key: "product",
      width: 320,
      render: (_, record) => (
        <Space size={"middle"}>
          <Avatar
            size="middle"
            alt={record.productName}
            src={record.productAvatar}
            shape="square"
            icon={<FileOutlined />}
          />
          <Text strong>{record.productName}</Text>
        </Space>
      ),
    },
    {
      title: "Price",
      key: "price",
      align: "right",
      dataIndex: "price",
      sorter: (a, b) => parseFloat(a.price) - parseFloat(b.price),
      render: (_, record) => <Text>${record.price}</Text>,
    },
    {
      title: "Total Sales",
      key: "totalSales",
      dataIndex: "totalSales",
      align: "right",
      sorter: (a, b) => a.totalSales - b.totalSales,
    },
    {
      title: "Total Revenue",
      key: "totalRevenue",
      dataIndex: "totalRevenue",
      align: "right",
      sorter: (a, b) => parseFloat(a.totalRevenue) - parseFloat(b.totalRevenue),
      render: (_, record) => <Text>${record.totalRevenue}</Text>,
    },
    // {
    //   title: "Reviews",
    //   key: "reviews",
    //   width: 180,
    //   dataIndex: "reviews",
    //   render: (_, record) => <Rate disabled defaultValue={record.reviews} />,
    // },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, record) => (
        <Tag color={record.status === "Published" ? "green" : "red"}>
          {record.status}
        </Tag>
      ),
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

  const data = [
    {
      key: "1",
      productName: "Digital Ebook Bundle",
      productAvatar:
        "https://images.unsplash.com/photo-1455541504462-57ebb2a9cec1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      price: "29.99",
      totalSales: 120,
      totalRevenue: "3598.80",
      reviews: 5,
      status: "Published",
    },
    {
      key: "2",
      productName: "UI Kit Essentials",
      productAvatar:
        "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      price: "59.99",
      totalSales: 80,
      totalRevenue: "4799.20",
      reviews: 4,
      status: "Published",
    },
    {
      key: "3",
      productName: "Web Design Masterclass",
      productAvatar: "",
      price: "199.99",
      totalSales: 0,
      totalRevenue: "0.00",
      reviews: 0,
      status: "Draft",
    },
    {
      key: "4",
      productName: "Mobile App UI Kit",
      productAvatar:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      price: "39.99",
      totalSales: 100,
      totalRevenue: "3999.00",
      reviews: 4,
      status: "Published",
    },
    {
      key: "5",
      productName: "Responsive Website Templates",
      productAvatar:
        "https://images.unsplash.com/photo-1559028006-448665bd7c7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      price: "49.99",
      totalSales: 90,
      totalRevenue: "4499.10",
      reviews: 4,
      status: "Published",
    },
    {
      key: "6",
      productName: "Social Media Graphics Pack",
      productAvatar:
        "https://images.unsplash.com/photo-1690228254548-31ef53e40cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      price: "19.99",
      totalSales: 150,
      totalRevenue: "2998.50",
      reviews: 5,
      status: "Published",
    },
    {
      key: "7",
      productName: "UI/UX Design Crash Course",
      productAvatar: "",
      price: "99.99",
      totalSales: 0,
      totalRevenue: "0.00",
      reviews: 0,
      status: "Draft",
    },
    {
      key: "8",
      productName: "Icon Set Mega Bundle",
      productAvatar:
        "https://images.unsplash.com/photo-1636819488537-a9b1ffb315ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      price: "79.99",
      totalSales: 50,
      totalRevenue: "3999.50",
      reviews: 4,
      status: "Published",
    },
    {
      key: "9",
      productName: "Icon Set Mega Bundle",
      productAvatar:
        "https://images.unsplash.com/photo-1636819488537-a9b1ffb315ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      price: "79.99",
      totalSales: 50,
      totalRevenue: "3999.50",
      reviews: 4,
      status: "Published",
    },
    {
      key: "10",
      productName: "Icon Set Mega Bundle",
      productAvatar:
        "https://images.unsplash.com/photo-1636819488537-a9b1ffb315ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      price: "79.99",
      totalSales: 50,
      totalRevenue: "3999.50",
      reviews: 4,
      status: "Published",
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
  };

  return (
    <div style={styles.section}>
      <div style={styles.container}>
        <Table
          pagination={false}
          columns={columns}
          dataSource={data}
          scroll={screens.lg ? "" : { x: token.screenXL }}
        />
      </div>
    </div>
  );
}
