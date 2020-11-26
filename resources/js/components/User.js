import React, { useEffect, useState, useContext } from "react";
import { Breadcrumb, Table, Layout, Space, Button, notification } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";
import { UserContext } from "../authContextProvider";
import moment from "moment";

const { Content } = Layout;
const toggleNotif = (type, message) => {
    notification[type]({
        message: message,
        description: "will be disappear in 4 seconds",
    });
};
const setting = () => {
    const { user } = useContext(UserContext);
    const [data, setdata] = useState([]);
    useEffect(() => {
        console.log(api.alluser);
        Axios.get(api.alluser, {
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
    }, []);

    const deleteUser = (record) => {
        let body = {
            id: record,
        };
        Axios.post(api.deleteUser, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token,
            },
        })
            .then((ress) => {
                toggleNotif("success", "Berhasil menghapus pengelola");
                setdata(
                    data.filter((item) => {
                        return item.id != record;
                    })
                );
            })
            .catch((error) => {
                console.log(error.response);
                toggleNotif("error", error.response.statusText);
            });
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => (
                <a>{moment(text).format("MM-DD-YYYY, h:mm:ss")}</a>
            ),
        },
        {
            title: "Last Update",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (text) => (
                <a>{moment(text).format("MM-DD-YYYY, h:mm:ss")}</a>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (record) => {
                return (
                    user.role == 2 && (
                        <Space size="middle">
                            <Link to={`/editUser/${record.id}`}>Edit</Link>
                            <Link
                                onClick={() => {
                                    deleteUser(record.id);
                                }}
                            >
                                Delete
                            </Link>
                        </Space>
                    )
                );
            },
        },
    ];

    return (
        <div>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Pengelola</Breadcrumb.Item>
                <Breadcrumb.Item>Daftar Pengelola</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                {user.role == 1 && (
                    <Link to={"/tambahuser"}>
                        <Button type="primary" icon={<UserAddOutlined />}>
                            Tambah Pengelola
                        </Button>
                    </Link>
                )}
                <Table columns={columns} dataSource={data} />
            </Content>
        </div>
    );
};

export default setting;
