import React, { useEffect, useState, useContext } from "react";
import { GroupedColumn, Line } from "@ant-design/charts";
import { Layout, Breadcrumb, Table, Select, Space, Menu } from "antd";
import { useParams } from "react-router-dom";
import Axios from "axios";
import api from "../api/api";
import moment from "moment";
import { UserContext } from "../authContextProvider";

const { Content } = Layout;
const { Option } = Select;
const columns = [
    {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at",
        fixed: "left",
        render: (text) => (
            <a>{moment(text).format("dddd, MMMM Do YYYY, h:mm:ss a")}</a>
        ),
    },
    {
        title: "Suhu Udara °C",
        dataIndex: "suhu_udara",
        key: "suhu_udara",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Kelembaban Udara %",
        dataIndex: "kelembaban_udara",
        key: "kelembaban_udara",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Suhu Tanah °C",
        dataIndex: "suhu_tanah",
        key: "suhu_tanah",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Kelembaban Tanah %",
        dataIndex: "kelembaban_tanah",
        key: "kelembaban_tanah",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Intensitas Cahaya (Cd)",
        dataIndex: "intensitas_cahaya",
        key: "intensitas_cahaya",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Kapasitas Batrai",
        dataIndex: "batrai",
        key: "batrai",
        render: (text) => <a>{text}</a>,
    },
];

const SensorDetail = () => {
    let { id } = useParams();
    const [data, setdata] = useState([]);
    useEffect(() => {
        loaddata();
    }, []);
    const loaddata = (type = "all") => {
        Axios.get(api.getsensorbyid + id + "/" + type, {
            headers: {
                Authorization: "Bearer " + localStorage.token,
            },
        })
            .then((ress) => {
                console.log(ress);
                setdata(ress.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };
    const datafilter = (param) => {
        loaddata(param);
    };
    const config = {
        title: {
            visible: true,
            text: "Rekaman Data oleh Sensor",
        },
        description: {
            visible: true,
            text: "dalam periode tertentu ditampilkan dalam grafik bar",
        },
        forceFit: true,
        data: data.statistik,
        xField: "tanggal",
        yField: "value",
        yAxis: { min: 0 },
        label: { visible: true },
        groupField: "type",
        Color: ["# ae331b", "# f27957", "#dadada", "# 609db7", "# 1a6179"],
    };
    const configg = {
        title: {
            visible: true,
            text: "Rekaman Data oleh Sensor",
        },
        description: {
            visible: true,
            text: "dalam periode tertentu ditampilkan dalam grafik line",
        },
        padding: "auto",
        forceFit: true,
        data: data.statistik,
        xField: "tanggal",
        yField: "value",
        yAxis: {
            label: {
                formatter: (v) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        legend: { position: "right-top" },
        seriesField: "type",
        Color: ["# ae331b", "# f27957", "#dadada", "# 609db7", "# 1a6179"],
        responsive: true,
    };
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Sensor</Breadcrumb.Item>
                <Breadcrumb.Item>Sensor Status</Breadcrumb.Item>
                <Breadcrumb.Item>
                    Zone {data.sensor != undefined ? data.sensor.zone_id : "?"}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {data.sensor != undefined ? data.sensor.sensor_name : "?"}
                </Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: "min-content",
                    marginBottom: 64,
                }}
            >
                Filter :
                <Select
                    placeholder="Setiap 15 minutes"
                    style={{ width: 200 }}
                    onChange={datafilter}
                >
                    <Option value="all">Setiap 15 minutes</Option>
                    <Option value="jam">Setiap Jam</Option>
                    <Option value="hari">Setiap Hari</Option>
                    <Option value="bulan">Setiap Bulan</Option>
                    <Option value="tahun">Setiap Tahun</Option>
                </Select>
                <GroupedColumn {...config} />
                <Line {...configg} />
                <Table
                    columns={columns}
                    dataSource={data.data}
                    scroll={{ x: true }}
                />
            </Content>
        </Layout>
    );
};

export default SensorDetail;
