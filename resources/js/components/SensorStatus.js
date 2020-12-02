import React, { useEffect, useState, useContext } from "react";
import { Layout, Breadcrumb, Table, Space, Collapse, notification } from "antd";
import { UserContext } from "../authContextProvider";
import Axios from "axios";
import api, { deletesensor } from "../api/api";
import { Link } from "react-router-dom";
import "../css/sensorstatus.css";

const { Content } = Layout;

const { Panel } = Collapse;
const SensorStatus = () => {
    const { user } = useContext(UserContext);
    const [data, setdata] = useState([]);
    const columns = [
        {
            title: "Nama Sensor",
            dataIndex: "sensor_name",
            key: "sensor_name"
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author",
            render: record => {
                return record.name;
            }
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Link to={"/detailsensor/" + record.id}>Detail</Link>
                        {user.role == 2 && (
                            <Space size="middle">
                                <Link to={"/editSensor/" + record.id}>
                                    Edit
                                </Link>
                                <Link
                                    onClick={() => {
                                        deleteSensor(record.id);
                                    }}
                                >
                                    Delete
                                </Link>
                            </Space>
                        )}
                    </Space>
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
    const deleteSensor = id => {
        let body = {
            id: id
        };
        Axios.post(api.deletesensor, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil menghapus sensor");
                loaddata();
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
                console.log("zone");
                console.log(ress);
                setdata(ress.data);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);
    const loaddata = () => {
        Axios.get(api.allzona, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log("zone");
                console.log(ress);
                setdata(ress.data);
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    };
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Sensor</Breadcrumb.Item>
                <Breadcrumb.Item>Sensor Status</Breadcrumb.Item>
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
                <Collapse defaultActiveKey={["1"]} ghost>
                    {data.map(item => {
                        console.log(item);
                        return (
                            <Panel header={item.zone_name} key={item.id}>
                                <iframe
                                    src={item.location}
                                    height="200"
                                    width="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                ></iframe>
                                <Table
                                    columns={columns}
                                    dataSource={item.sensor}
                                />
                            </Panel>
                        );
                    })}
                </Collapse>
            </Content>
        </Layout>
    );
};

export default SensorStatus;
