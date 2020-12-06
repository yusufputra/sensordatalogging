import React from "react";
import { Breadcrumb, Form, Layout, Input, Button, notification } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import api from "../api/api";
import tutor from "../asset/img/tutor.gif";

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
                        <Input
                            placeholder={
                                '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.142743278433!2d112.40847076977539!3d-7.516395599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7812b1aa6fa693%3A0x7c4f576fd450cb56!2sASF%20ACC%20Mojokerto!5e0!3m2!1sid!2sid!4v1606367126395!5m2!1sid!2sid" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
                            }
                        />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item label="cara mendapatkan lokasi">
                        <img src={tutor} />
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default TambahZona;
