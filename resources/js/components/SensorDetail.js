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
        Axios.get(api.getsensorbyid + id, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress);
                setdata(ress.data.alldata);
                setTempData(ress.data.alldata);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);
    const datafilter = param => {
        console.log(param);
        if (param == 1) {
            console.log("halo");
            let temh = 0;
            setdata(
                tempdata.filter(item => {
                    console.log(
                        temh + "=" + item.created_at.split("T")[1].split(":")[0]
                    );
                    if (temh != item.created_at.split("T")[1].split(":")[0]) {
                        temh = item.created_at.split("T")[1].split(":")[0];
                        return item;
                    }
                })
            );
        }
        if (param == 0) {
            setdata(tempdata);
        }
        if (param == 2) {
            let temh = 0;
            setdata(
                tempdata.filter(item => {
                    console.log(
                        temh + "=" + item.created_at.split("T")[0].split("-")[2]
                    );
                    if (temh != item.created_at.split("T")[0].split("-")[2]) {
                        temh = item.created_at.split("T")[0].split("-")[2];
                        return item;
                    }
                })
            );
        }
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
                    <Option value="0">Setiap 15 minutes</Option>
                    <Option value="1">Setiap Jam</Option>
                    <Option value="2">Setiap Hari</Option>
                    {/* <Option value="3">Setiap Bulan</Option>
                    <Option value="4">Setiap Tahun</Option> */}
                </Select>
                <Table columns={columns} dataSource={data} />
            </Content>
        </Layout>
    );
};

export default SensorDetail;
