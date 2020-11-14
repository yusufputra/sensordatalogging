import React from "react";
import { Layout, Row, Col, Card, Breadcrumb } from "antd";

const { Content } = Layout;
const Home = () => {
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
                    marginBottom:64
                }}
            >
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
                </Row>
            </Content>
        </Layout>
    );
};

export default Home;
