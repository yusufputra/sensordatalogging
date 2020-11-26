import React, { useEffect, useState, useContext } from "react";
import {
    Breadcrumb,
    Form,
    Layout,
    Input,
    Button,
    Select,
    notification
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import api from "../api/api";
import { UserContext } from "../authContextProvider";

const tailLayout = {
    wrapperCol: { offset: 4, span: 10 }
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 }
};
const { Content } = Layout;
const EditSensor = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [data, setdata] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        Axios.get(api.getsensorbyid + id, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                console.log(ress.data.user);
                // setdata(ress.data.user);
                form.setFieldsValue({
                    nama: ress.data.sensor_name,
                    zona: ress.data.zone_id
                });
            })
            .catch(error => {
                console.log(error);
                alert(error);
            });
    }, []);
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
    const onFinish = record => {
        console.log(record);
        let body = {
            id: id,
            sensor_name: record.nama,
            zone_id: record.zona
        };
        Axios.post(api.editsensor, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil edit sensor");
                history.push("/sensorstatus");
            })
            .catch(error => {
                console.log(error.response);
                toggleNotif("error", error.response);
            });
    };
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Sensor</Breadcrumb.Item>
                <Breadcrumb.Item>Tambah Sensor</Breadcrumb.Item>
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
                <Form {...layout} name="basic" form={form} onFinish={onFinish}>
                    <Form.Item
                        label="Nama Sensor"
                        name="nama"
                        rules={[
                            {
                                required: true,
                                message: "Please input nama sensor"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Zona" name="zona">
                        <Select style={{ width: 240 }}>
                            {data.map(item => (
                                <Option value={item.id}>
                                    {item.zone_name}
                                </Option>
                            ))}
                            {/* <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default EditSensor;
