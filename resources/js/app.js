/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require("./components/Example");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
    PieChartOutlined,
    LaptopOutlined,
    UserOutlined
} from "@ant-design/icons";
import logo from "./asset/img/logo.gif";
import "antd/dist/antd.css";
import "./css/style.css";
import Home from "./components/Home";
import SensorStatus from "./components/SensorStatus";
import User from "./components/User";

const { SubMenu } = Menu;
const { Header, Sider } = Layout;
const App = () => {
    return (
        <Layout>
            <Header className="header" style={{ display: "inline-flex" }}>
                <div className="logo">
                    <img
                        src={logo}
                        style={{ height: "-webkit-fill-available" }}
                    />
                </div>
            </Header>
            <Layout style={{ marginTop: 64 }}>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to={"/"}>Dashboard</Link>
                        </Menu.Item>

                        <SubMenu
                            key="sub2"
                            icon={<LaptopOutlined />}
                            title="Sensor"
                        >
                            <Menu.Item key="2">
                                <Link to={"/sensorstatus"}>Status Sensor</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            <Link to={"/user"}>user</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout
                    style={{
                        padding: "0 24px 24px",
                        height: "100vh"
                    }}
                >
                    <Switch>
                        <Route exact path={"/"} component={Home} />
                        <Route
                            path={"/sensorstatus"}
                            component={SensorStatus}
                        />
                        <Route
                            path={"/user"}
                            component={User}
                        />
                    </Switch>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
