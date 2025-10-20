import { Layout, Menu, type MenuProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Children, createElement } from "react";
const { Header, Content, Footer, Sider } = Layout;
const items: MenuProps["items"] = [
  {
    key: "1",
    icon: createElement(UserOutlined),
    label: "nav 1",
  },
  {
    key: "2",
    icon: createElement(UserOutlined),
    label: "nav 1",
  },
  {
    key: "3",
    icon: createElement(UserOutlined),
    label: "nav 3",
    children: [
      {
        key: "3-1",
        label: "subnav 1",
      },
      {
        key: "3-2",
        label: "subnav 2",
      },
    ],
  },
];
const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}>
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="demo-logo-vertical">
          <h1>EDU</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            <h1>The main content should be there</h1>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
