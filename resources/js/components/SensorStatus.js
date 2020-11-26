import React, { useEffect, useState, useContext } from "react";
import { Layout, Breadcrumb, Table, Space, Collapse, notification } from "antd";
import { UserContext } from "../authContextProvider";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";
import "../css/sensorstatus.css";

const { Content } = Layout;
const columns = [
    {
        title: "Nama Sensor",
        dataIndex: "sensor_name",
        key: "sensor_name"
    },
    {
        title: "Author",
        dataIndex: "author",
        key: "author"
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
            <Space size="middle">
                <Link to={"/detailsensor/" + record.id}>Detail</Link>
                <Link>Edit</Link>
                <Link>Delete</Link>
            </Space>
        )
    }
];

// const data = [
//     {
//         key: "1",
//         name: "Sensor 1",
//         tags: ["Active"]
//     },
//     {
//         key: "2",
//         name: "Sensor 2",
//         tags: ["Active"]
//     },
//     {
//         key: "3",
//         name: "Sensor 3",
//         tags: ["Inactive"]
//     }
// ];
const { Panel } = Collapse;
const SensorStatus = () => {
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
                console.log("zone");
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
                    {/* <Panel header="Sensor Zona 1" key="1">
                        <iframe
                            src={
                                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.146544779924!2d112.5670240956099!3d-7.850537852124256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e787fb5f71ca035%3A0xa9b392b615051b2"
                            }
                            height="200"
                            width="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                        ></iframe>
                        <Table columns={columns} dataSource={data} />
                    </Panel>
                    <Panel header="Sensor Zona 2" key="2">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.146544779924!2d112.5670240956099!3d-7.850537852124256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e787fb5f71ca035%3A0xa9b392b615051b2!2sUB%20Forest!5e0!3m2!1sid!2sid!4v1605177936956!5m2!1sid!2sid"
                            height="200"
                            width="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                        ></iframe>
                        <Table columns={columns} dataSource={data} />
                    </Panel> */}
                </Collapse>
            </Content>
        </Layout>
    );
};

export default SensorStatus;
