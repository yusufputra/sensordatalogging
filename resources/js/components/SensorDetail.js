import React, { useEffect, useState, useContext } from "react";
import { GroupedColumn, Line, Scatter } from "@ant-design/charts";
import { Layout, Breadcrumb, Table, Select, Space, Menu } from "antd";
import { useParams } from "react-router-dom";
import Axios from "axios";
import api from "../api/api";
import moment from "moment";
import JsonToExcel from "./JsonToExcel";
import { UserContext } from "../authContextProvider";

const { Content } = Layout;
const { Option } = Select;
const columns = [
    {
        title: "Date",
        dataIndex: "created_at",
        key: "created_at",
        fixed: "left",
        render: text => (
            <a>{moment(text).format("dddd, MMMM Do YYYY, h:mm:ss a")}</a>
        )
    },
    {
        title: "Suhu Udara °C",
        dataIndex: "suhu_udara",
        key: "suhu_udara",
        render: text => <a>{text}</a>
    },
    {
        title: "Kelembaban Udara %",
        dataIndex: "kelembaban_udara",
        key: "kelembaban_udara",
        render: text => <a>{text}</a>
    },
    {
        title: "Suhu Tanah °C",
        dataIndex: "suhu_tanah",
        key: "suhu_tanah",
        render: text => <a>{text}</a>
    },
    {
        title: "Kelembaban Tanah %",
        dataIndex: "kelembaban_tanah",
        key: "kelembaban_tanah",
        render: text => <a>{text}</a>
    },
    {
        title: "Intensitas Cahaya (Cd)",
        dataIndex: "intensitas_cahaya",
        key: "intensitas_cahaya",
        render: text => <a>{text}</a>
    },
    {
        title: "Kapasitas Batrai",
        dataIndex: "batrai",
        key: "batrai",
        render: text => <a>{text}</a>
    }
];

const SensorDetail = () => {
    let { id } = useParams();
    const [data, setdata] = useState([]);
    const [tempData, setTempData] = useState([]);
    useEffect(() => {
        loaddata();
    }, []);
    const loaddata = async (type = "all") => {
        await Axios.get(api.getsensorbyid + id + "/" + type, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                setdata(ress.data);
                setTempData(ress.data.statistik);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    };
    const datafilter = param => {
        loaddata(param);
    };
    const config = {
        title: {
            visible: true,
            text: "Rekaman Data oleh Sensor"
        },
        description: {
            visible: true,
            text: "dalam periode tertentu ditampilkan dalam grafik bar"
        },
        forceFit: true,
        data: data.statistik,
        xField: "tanggal",
        yField: "value",
        yAxis: { min: 0 },
        label: { visible: true },
        groupField: "type",
        Color: ["# ae331b", "# f27957", "#dadada", "# 609db7", "# 1a6179"]
    };
    const configg = {
        title: {
            visible: true,
            text: "Rekaman Data oleh Sensor"
        },
        description: {
            visible: true,
            text: "dalam periode tertentu ditampilkan dalam grafik line"
        },
        padding: "auto",
        forceFit: true,
        data: data.statistik,
        xField: "tanggal",
        yField: "value",
        yAxis: {
            label: {
                formatter: v =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`)
            }
        },
        legend: { position: "right-top" },
        seriesField: "type",
        Color: ["#ae331b", "#f27957", "#dadada", "#609db7", "#1a6179"],
        responsive: true
    };
    const configgg = {
        appendPadding: 30,
        data: tempData,
        xField: "id",
        yField: "value",
        colorField: "type",
        color: ["#ae331b", "#f27957", "#dadada", "#609db7", "#1a6179"],
        size: 5,
        shape: "circle",
        pointStyle: { fillOpacity: 1 },
        yAxis: {
            nice: true,
            line: { style: { stroke: "#aaa" } }
        },
        xAxis: {
            grid: { line: { style: { stroke: "#eee" } } },
            line: { style: { stroke: "#aaa" } }
        },
        label: {}
    };
    const filename = "export " + Date.now(),
        fields = {
            id: "id",
            sensor_id: "sensor_id",
            suhu_udara: "suhu_udara",
            kelembaban_udara: "kelembaban_udara",
            suhu_tanah: "suhu_tanah",
            kelembaban_tanah: "kelembaban_tanah",
            intensitas_cahaya: "intensitas_cahaya",
            batrai: "batrai",
            created_at: "Created At",
            updated_at: "Updated At"
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
                    paddingBottom: 100,
                    margin: 0,
                    minHeight: "min-content",
                    marginBottom: 64
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
                {data.data != undefined && data.data.length != 0 && (
                    <JsonToExcel
                        id={"exportXLS"}
                        data={data.data}
                        filename={filename}
                        fields={fields}
                        className={"ant-btn ant-btn-primary"}
                        text={
                            <div>
                                <span
                                    role="img"
                                    aria-label="download"
                                    className="anticon anticon-download"
                                >
                                    <svg
                                        viewBox="64 64 896 896"
                                        focusable="false"
                                        className=""
                                        data-icon="download"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                                    </svg>
                                </span>
                                <span>Export to Excel</span>
                            </div>
                        }
                    />
                )}
                <GroupedColumn {...config} />
                <Scatter {...configgg} />
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
