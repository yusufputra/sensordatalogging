import React, { useEffect, useState, useContext } from "react";
import { Line } from "@ant-design/charts";
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
    }
];

// const dataa = [
//     {
//         key: "1",
//         date: "10-10-2020 19.00",
//         suhuUdara: 23,
//         kelembabanUdara: 80,
//         suhuTanah: 27,
//         kelembabanTanah: 90,
//         intensitasCahaya: 100
//     },
//     {
//         key: "2",
//         date: "10-10-2020 19.00",
//         suhuUdara: 23,
//         kelembabanUdara: 80,
//         suhuTanah: 27,
//         kelembabanTanah: 90,
//         intensitasCahaya: 100
//     },
//     {
//         key: "3",
//         date: "10-10-2020 19.00",
//         suhuUdara: 23,
//         kelembabanUdara: 80,
//         suhuTanah: 27,
//         kelembabanTanah: 90,
//         intensitasCahaya: 100
//     }
// ];
const SensorDetail = () => {
    let { id } = useParams();
    const [data, setdata] = useState([]);
    const [tempdata, setTempData] = useState([]);
    useEffect(() => {
        loaddata();
    }, []);
    const loaddata = (type = "all") => {
        Axios.get(api.getsensorbyid + id + "/" + type, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress);
                setdata(ress.data.data);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    };
    const datafilter = param => {
        loaddata(param);
    };
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
                <Table columns={columns} dataSource={data} />
            </Content>
        </Layout>
    );
};

export default SensorDetail;
