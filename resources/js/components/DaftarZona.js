import React, { useEffect, useState, useContext } from "react";
import { Layout, Breadcrumb, Table, notification, Space } from "antd";
import { UserContext } from "../authContextProvider";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";
import "../css/sensorstatus.css";

const { Content } = Layout;

const DaftarZona = () => {
    const { user } = useContext(UserContext);
    const [data, setdata] = useState([]);
    const columns = [
        {
            title: "Zone Name",
            dataIndex: "zone_name",
            key: "zone_name",
            fixed: "left"
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
            render: (text, record) => {
                return (
                    user.role == 2 && (
                        <Space size="middle">
                            <Link to={"/editZona/" + record.id}>Edit</Link>
                            <Link
                                onClick={() => {
                                    deleteZona(record.id);
                                }}
                            >
                                Delete
                            </Link>
                        </Space>
                    )
                );
            }
        }
    ];
    const toggleNotif = (type, message) => {
        notification[type]({
            message: message,
            description: "will be disappear in 4 seconds"
        });
    };
    const deleteZona = id => {
        let body = {
            id: id
        };
        Axios.post(api.deletezona, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil menghapus zona");
                setdata(
                    data.filter(item => {
                        return item.id != id;
                    })
                );
            })
            .catch(error => {
                console.log(error);
                toggleNotif("error", "Terjadi Kesalahan Teknis");
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
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: true }}
                />
            </Content>
        </Layout>
    );
};

export default DaftarZona;
