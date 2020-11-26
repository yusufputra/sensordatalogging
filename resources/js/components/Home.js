import React, { useEffect, useState, useContext } from "react";
import { Layout, Row, Col, Card, Breadcrumb } from "antd";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";
import { UserContext } from "../authContextProvider";

const { Content } = Layout;
const Home = () => {
    const { user } = useContext(UserContext);
    const [data, setdata] = useState([]);
    useEffect(() => {
        Axios.get(api.allsensor, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log("sensor");
                console.log(ress);
                setdata(ress.data);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: "min-content",
                    marginBottom: 64
                }}
            >
                <Row gutter={[16, 24]}>
                    {data.map(item => (
                        <Col className="gutter-row" span={8}>
                            <Card
                                size="small"
                                title={item.sensor_name}
                                style={{ width: 300 }}
                                extra={
                                    <Link to="#">{item.zone.zone_name}</Link>
                                }
                            >
                                {item.data.length !== 0 && (
                                    <div>
                                        <p>
                                            Suhu Udara :{" "}
                                            {item.data[0].suhu_udara}°C{" "}
                                        </p>
                                        <p>
                                            Kelembaban Udara :{" "}
                                            {item.data[0].kelembaban_udara}%
                                        </p>
                                        <p>
                                            Suhu Tanah :{" "}
                                            {item.data[0].suhu_tanah}°C
                                        </p>
                                        <p>
                                            Kelembaban Tanah :{" "}
                                            {item.data[0].kelembaban_tanah}%
                                        </p>
                                        <p>
                                            Intensitas Cahaya :{" "}
                                            {item.data[0].intensitas_cahaya} Cd
                                        </p>
                                    </div>
                                )}
                                {item.data.length === 0 && (
                                    <p>belum ada data</p>
                                )}
                            </Card>
                        </Col>
                    ))}
                </Row>
                {/* <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                        padding: "20px 0px 0px 0px",
                        backgroundColor: "white"
                    }}
                >
                    <Col
                        className="gutter-row"
                        span={{ xs: 16, sm: 16, md: 24, lg: 32 }}
                    >
                        <Card
                            size="small"
                            title="Sensor Titik 1"
                            style={{ width: 300 }}
                            extra={<a href="#">Zona 1</a>}
                        >
                            <p>Suhu Udara : 24°C </p>
                            <p>Kelembaban Udara : 90%</p>
                            <p>Suhu Tanah : 26°C</p>
                            <p>Kelembaban Tanah : 90%</p>
                            <p>Intensitas Cahaya : 120 Cd</p>
                        </Card>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={{ xs: 16, sm: 16, md: 24, lg: 32 }}
                    >
                        <Card
                            size="small"
                            title="Sensor Titik 2"
                            style={{ width: 300 }}
                            extra={<a href="#">Zona 1</a>}
                        >
                            <p>Suhu Udara : 24°C </p>
                            <p>Kelembaban Udara : 90%</p>
                            <p>Suhu Tanah : 26°C</p>
                            <p>Kelembaban Tanah : 90%</p>
                            <p>Intensitas Cahaya : 120 Cd</p>
                        </Card>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={{ xs: 16, sm: 16, md: 24, lg: 32 }}
                    >
                        <Card
                            size="small"
                            title="Sensor Titik 3"
                            style={{ width: 300 }}
                            extra={<a href="#">Zona 1</a>}
                        >
                            <p>Suhu Udara : 24°C </p>
                            <p>Kelembaban Udara : 90%</p>
                            <p>Suhu Tanah : 26°C</p>
                            <p>Kelembaban Tanah : 90%</p>
                            <p>Intensitas Cahaya : 120 Cd</p>
                        </Card>
                    </Col>
                </Row>
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                        padding: "20px 0px 0px 0px",
                        backgroundColor: "white"
                    }}
                >
                    <Col
                        className="gutter-row"
                        span={{ xs: 16, sm: 16, md: 24, lg: 32 }}
                    >
                        <Card
                            size="small"
                            title="Sensor Titik 4"
                            style={{ width: 300 }}
                            extra={<a href="#">Zona 1</a>}
                        >
                            <p>Suhu Udara : 24°C </p>
                            <p>Kelembaban Udara : 90%</p>
                            <p>Suhu Tanah : 26°C</p>
                            <p>Kelembaban Tanah : 90%</p>
                            <p>Intensitas Cahaya : 120 Cd</p>
                        </Card>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={{ xs: 16, sm: 16, md: 24, lg: 32 }}
                    >
                        <Card
                            size="small"
                            title="Sensor Titik 5"
                            style={{ width: 300 }}
                            extra={<a href="#">Zona 2</a>}
                        >
                            <p>Suhu Udara : 24°C </p>
                            <p>Kelembaban Udara : 90%</p>
                            <p>Suhu Tanah : 26°C</p>
                            <p>Kelembaban Tanah : 90%</p>
                            <p>Intensitas Cahaya : 120 Cd</p>
                        </Card>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={{ xs: 16, sm: 16, md: 24, lg: 32 }}
                    >
                        <Card
                            size="small"
                            title="Sensor Titik 6"
                            style={{ width: 300 }}
                            extra={<a href="#">Zona 2</a>}
                        >
                            <p>Suhu Udara : 24°C </p>
                            <p>Kelembaban Udara : 90%</p>
                            <p>Suhu Tanah : 26°C</p>
                            <p>Kelembaban Tanah : 90%</p>
                            <p>Intensitas Cahaya : 120 Cd</p>
                        </Card>
                    </Col>
                </Row>
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                        padding: "20px 0px 0px 0px",
                        backgroundColor: "white"
                    }}
                >
                    <Col
                        className="gutter-row"
                        span={{ xs: 16, sm: 16, md: 24, lg: 32 }}
                    >
                        <Card
                            size="small"
                            title="Sensor Titik 7"
                            style={{ width: 300 }}
                            extra={<a href="#">Zona 2</a>}
                        >
                            <p>Suhu Udara : 24°C </p>
                            <p>Kelembaban Udara : 90%</p>
                            <p>Suhu Tanah : 26°C</p>
                            <p>Kelembaban Tanah : 90%</p>
                            <p>Intensitas Cahaya : 120 Cd</p>
                        </Card>
                    </Col>
                </Row> */}
            </Content>
        </Layout>
    );
};

export default Home;
