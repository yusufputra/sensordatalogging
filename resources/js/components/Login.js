import React, { Fragment, useState } from "react";
import {
    Form,
    Input,
    Button,
    Checkbox,
    Alert,
    Row,
    Col,
    Typography,
    Layout,
    Menu,
    Carousel,
    Card
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from "axios";
import logo from "../asset/img/logo.gif";
import homeImage from "../asset/img/home.jpg";
import im1 from "../asset/img/carousel/1.jpeg";
import im2 from "../asset/img/carousel/2.jpg";
import im3 from "../asset/img/carousel/3.jpg";
import im4 from "../asset/img/carousel/4.jpeg";
import im5 from "../asset/img/carousel/5.jpeg";
import im6 from "../asset/img/carousel/6.jpeg";
import api from "../api/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import "../css/formlogin.css";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const Login = () => {
    const [error, setError] = useState(false);
    const [loading, setloading] = useState(false);
    const handleSubmit = values => {
        setloading(true);
        console.log(values);
        const data = {
            email: values.email,
            password: values.password
        };
        Axios.post(api.login, data)
            .then(ress => {
                window.scrollTo(0, 0);
                if (ress.status == 200) {
                    localStorage.token = ress.data.token;
                }
                setloading(false);
                window.location.reload();
            })
            .catch(error => {
                setError(true);
                console.log(error.response);
                setloading(false);
            });
    };
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    return (
        <Layout>
            <Header
                style={{
                    position: "fixed",
                    zIndex: 1,
                    width: "100%",
                    background: "#fff",
                    display: "inline-flex"
                }}
            >
                <div className="logo">
                    <img
                        src={logo}
                        style={{ height: "-webkit-fill-available" }}
                    />
                </div>
                <div style={{ float: "right" }}>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                        style={{ lineHeight: "64px" }}
                    >
                        <Menu.Item key="1">
                            <a href="/#home">Home</a>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a href="/#service">Services</a>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <a href="/#login">Login</a>
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>

            <Content
                style={{
                    marginTop: "64px"
                }}
            >
                <Row id="home">
                    <Col span={24}>
                        <div>
                            <LazyLoadImage
                                src={homeImage}
                                style={{ height: "100vh", width: "100%" }}
                            />
                            <div className="centered">IKLIM UForest</div>
                            <div className="subcentered">
                                Monitor climate in your area
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} id="service">
                    <Col span={24}>
                        <Title style={{ textAlign: "center" }}>
                            Our Sevices
                        </Title>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={8}
                        className="center-card"
                    >
                        <Card
                            hoverable
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="Cloud Analytics Modernization"
                                    src="https://www.actian.com/wp-content/uploads/2019/10/AV9-A.jpg"
                                />
                            }
                        >
                            <Meta
                                title="Cloud Analytics Modernization"
                                description="ease of data analysis for monitoring the microclimate in your area, will be presented in graphical form and easy to understand"
                            />
                        </Card>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={8}
                        className="center-card"
                    >
                        <Card
                            hoverable
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="Versatility in Application"
                                    src="https://i.pinimg.com/originals/d1/bd/1b/d1bd1baeab471b15807f1b2850529bf0.jpg"
                                />
                            }
                        >
                            <Meta
                                title="Versatility in Application"
                                description="Several features are provided to make it easier for users to monitor the microclimate, both seeing the current temperature conditions to the previously recorded temperature, given the analysis results in graphical form that make it easier for users to analyze recorded climate data"
                            />
                        </Card>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={8}
                        className="center-card"
                    >
                        <Card
                            hoverable
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="Easy to Use"
                                    src="https://uxwing.com/wp-content/themes/uxwing/download/44-hand-gestures/easy-to-use.png"
                                />
                            }
                        >
                            <Meta
                                title="Easy to Use"
                                description="a sensor system that is very easy to implement, and an application that is very easy to use even though the user has never used this application"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row style={{ backgroundColor: "white" }}>
                    <Col span={24}>
                        <Title style={{ textAlign: "center" }}>
                            Our Activities
                        </Title>
                        <Carousel autoplay>
                            <div>
                                <LazyLoadImage src={im1} className="carousel" />
                            </div>
                            <div>
                                <LazyLoadImage src={im2} className="carousel" />
                            </div>
                            <div>
                                <LazyLoadImage src={im3} className="carousel" />
                            </div>
                            <div>
                                <LazyLoadImage src={im4} className="carousel" />
                            </div>
                            <div>
                                <LazyLoadImage src={im5} className="carousel" />
                            </div>
                            <div>
                                <LazyLoadImage src={im6} className="carousel" />
                            </div>
                        </Carousel>
                    </Col>
                </Row>
                <Row id="login">
                    <Col span={12} offset={6}>
                        <Title>Login</Title>
                        {error && <Alert message="Login Gagal" type="error" />}

                        <Form onFinish={handleSubmit} className="login-form">
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your email!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="email@domain.com"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="remember"
                                rules={[
                                    {
                                        valuePropName: "checked",
                                        initialValue: true
                                    }
                                ]}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <Button
                                        block
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Log in
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Iklim UForest ©2021 Created by yusufputra99
            </Footer>
        </Layout>
    );
};
export default Login;
