import React from "react";
import { Breadcrumb, Form, Layout, Input, Button, notification } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import api from "../api/api";

const tailLayout = {
    wrapperCol: { offset: 4, span: 10 }
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 }
};
const { Content } = Layout;
const TambahZona = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const toggleNotif = (type, message) => {
        notification[type]({
            message: message,
            description: "will be disappear in 4 seconds"
        });
    };
    const onFinish = record => {
        let splittedloc = record.lokasi.split(" ");
        let loc = splittedloc[1].split('"')[1];
        let body = {
            zone_name: record.nama,
            location: loc
        };
        Axios.post(api.createZona, body, {
            headers: {
                Authorization: "Bearer " + localStorage.token
            }
        })
            .then(ress => {
                toggleNotif("success", "Berhasil menambahkan zona");
                history.push("/daftarzona");
            })
            .catch(error => {
                console.log(error.response);
                toggleNotif("error", error.response.statusText);
            });
    };
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Zona</Breadcrumb.Item>
                <Breadcrumb.Item>Tambah Zona</Breadcrumb.Item>
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
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Nama Zona"
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
                    <Form.Item
                        label="Lokasi Sensor"
                        name="lokasi"
                        rules={[
                            {
                                required: true,
                                message: "Please input Lokasi"
                            }
                        ]}
                    >
                        <Input />
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

export default TambahZona;
