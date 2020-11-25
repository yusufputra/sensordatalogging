import React, { useEffect, useState, useContext } from "react";
import { Layout, Breadcrumb, Table, Tag, Space } from "antd";
import { UserContext } from "../authContextProvider";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";
import "../css/sensorstatus.css";

const { Content } = Layout;
const columns = [
    {
        title: "Zone Name",
        dataIndex: "zone_name",
        key: "zone_name"
    },
    {
        title: "Author",
        dataIndex: "author",
        key: "author",
        render: record => record.name
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
            <Space size="middle">
                <Link to={"/detailsensor/" + record.id}>Detail</Link>
                <Link to={"/editsensor/" + record.id}>Edit</Link>
                <Link
                    onClick={() => {
                        deleteSensor(record.id);
                    }}
                >
                    Delete
                </Link>
            </Space>
        )
    }
];
const deleteSensor = id => {
    console.log(id);
};

const DaftarZona = () => {
    const { user } = useContext(UserContext);
    const [data, setdata] = useState([]);
    const toggleNotif = (type, message) => {
        notification[type]({
            message: message,
            description: "will be disappear in 4 seconds"
        });
    };
    useEffect(() => {
        Axios.get(api.allzona, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
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
                <Breadcrumb.Item>Zona</Breadcrumb.Item>
                <Breadcrumb.Item>Daftar Zona</Breadcrumb.Item>
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
                <Table columns={columns} dataSource={data} />
            </Content>
        </Layout>
    );
};

export default DaftarZona;
