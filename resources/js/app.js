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

import React, { useContext } from "react";
import ReactDOM from "react-dom";
import AuthContextProvider, { UserContext } from "./authContextProvider";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
    PieChartOutlined,
    LaptopOutlined,
    UserOutlined,
    ShareAltOutlined
} from "@ant-design/icons";
import logo from "./asset/img/logo.gif";
import "antd/dist/antd.css";
import "./css/style.css";
import Home from "./components/Home";
import SensorStatus from "./components/SensorStatus";
import User from "./components/User";
import SensorDetail from "./components/SensorDetail";
import InputSensor from "./components/InputSensor";
import TambahUser from "./components/TambahUser";
import DaftarZona from "./components/DaftarZona";
import TambahZona from "./components/TambahZona";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import EditSensor from "./components/EditSensor";
import EditZona from "./components/EditZona";

const { SubMenu } = Menu;
const { Header, Sider } = Layout;
const App = () => {
    const { user, verified } = useContext(UserContext);
    console.log(user);
    console.log(verified);
    if (localStorage.token == null || verified == false) {
        return (
            <div>
                <Login></Login>
            </div>
        );
    } else {
        const logout = () => {
            localStorage.clear();
            window.location.reload();
        };
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
                                    <Link to={"/sensorstatus"}>
                                        Status Sensor
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to={"/tambahsensor"}>
                                        Tambah Sensor
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                icon={<ShareAltOutlined />}
                                title="Zona"
                            >
                                <Menu.Item key="7">
                                    <Link to={"/daftarzona"}>Daftar Zona</Link>
                                </Menu.Item>
                                <Menu.Item key="8">
                                    <Link to={"/tambahzona"}>Tambah Zona</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                icon={<UserOutlined />}
                                title="Pengelola"
                            >
                                <Menu.Item key="5">
                                    <Link to={"/user"}>Daftar Pengelola</Link>
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <Link to={"/tambahuser"}>
                                        Tambah Pengelola
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="20">
                                    <Button
                                        style={{ backgroundColor: "#f05d32" }}
                                        onClick={logout}
                                        type="primary"
                                        danger
                                    >
                                        Logout
                                    </Button>
                                </Menu.Item>
                            </SubMenu>
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
                            <Route path={"/user"} component={User} />
                            <Route
                                path={"/detailsensor/:id"}
                                component={SensorDetail}
                            />
                            <Route
                                path={"/tambahsensor"}
                                component={InputSensor}
                            />
                            <Route
                                path={"/tambahuser"}
                                component={TambahUser}
                            />
                            <Route
                                path={"/daftarzona"}
                                component={DaftarZona}
                            />
                            <Route
                                path={"/tambahzona"}
                                component={TambahZona}
                            />
                            <Route
                                path={"/editUser/:id"}
                                component={EditUser}
                            />
                            <Route
                                path={"/editSensor/:id"}
                                component={EditSensor}
                            />
                            <Route
                                path={"/editZona/:id"}
                                component={EditZona}
                            />
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
};

export default App;

ReactDOM.render(
    <BrowserRouter>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </BrowserRouter>,
    document.getElementById("app")
);
