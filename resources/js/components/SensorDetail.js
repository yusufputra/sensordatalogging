import React from "react";
import { Line } from "@ant-design/charts";
import { Layout, Breadcrumb, Table, Select, Space, Menu } from "antd";

const { Content } = Layout;
const { Option } = Select;
const columns = [
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: text => <a>{text}</a>
    },
    {
        title: "Suhu Udara °C",
        dataIndex: "suhuUdara",
        key: "suhuUdara",
        render: text => <a>{text}</a>
    },
    {
        title: "Kelembaban Udara %",
        dataIndex: "kelembabanUdara",
        key: "kelembabanUdara",
        render: text => <a>{text}</a>
    },
    {
        title: "Suhu Tanah °C",
        dataIndex: "suhuTanah",
        key: "suhuTanah",
        render: text => <a>{text}</a>
    },
    {
        title: "Kelembaban Tanah %",
        dataIndex: "kelembabanTanah",
        key: "kelembabanTanah",
        render: text => <a>{text}</a>
    },
    {
        title: "Intensitas Cahaya (Cd)",
        dataIndex: "intensitasCahaya",
        key: "intensitasCahaya",
        render: text => <a>{text}</a>
    }
];

const dataa = [
    {
        key: "1",
        date: "10-10-2020 19.00",
        suhuUdara: 23,
        kelembabanUdara: 80,
        suhuTanah: 27,
        kelembabanTanah: 90,
        intensitasCahaya: 100
    },
    {
        key: "2",
        date: "10-10-2020 19.00",
        suhuUdara: 23,
        kelembabanUdara: 80,
        suhuTanah: 27,
        kelembabanTanah: 90,
        intensitasCahaya: 100
    },
    {
        key: "3",
        date: "10-10-2020 19.00",
        suhuUdara: 23,
        kelembabanUdara: 80,
        suhuTanah: 27,
        kelembabanTanah: 90,
        intensitasCahaya: 100
    }
];
const SensorDetail = () => {
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Sensor</Breadcrumb.Item>
                <Breadcrumb.Item>Sensor Status</Breadcrumb.Item>
                <Breadcrumb.Item>Zona 1</Breadcrumb.Item>
                <Breadcrumb.Item>Sensor 1</Breadcrumb.Item>
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
                Filter :
                <Select
                    placeholder="All"
                    style={{ width: 200 }}
                >
                    <Option value="All">All</Option>
                    <Option value="0">Setiap 15 minutes</Option>
                    <Option value="1">Setiap Jam</Option>
                    <Option value="2">Setiap Hari</Option>
                    <Option value="3">Setiap Bulan</Option>
                    <Option value="4">Setiap Tahun</Option>
                </Select>
                <Table columns={columns} dataSource={dataa} />
            </Content>
        </Layout>
    );
};

export default SensorDetail;
