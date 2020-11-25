import React from "react";
import { useHistory } from "react-router-dom";
import {
    Breadcrumb,
    Form,
    Layout,
    Input,
    Button,
    Select,
    notification
} from "antd";
import Axios from "axios";

const tailLayout = {
    wrapperCol: { offset: 4, span: 10 }
};
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 }
};
const { Content } = Layout;

const TambahUser = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const toggleNotif = (type, message) => {
        notification[type]({
            message: message,
            description: "will be disappear in 4 seconds"
        });
    };
    const onFinish = values => {
        console.log(values);
        // const body = {
        //     email: values.email,
        //     name: values.name,
        //     password: values.password,
        //     password_confirmation: values.password_confirmation,
        //     role: values.role || 0
        // };
        // Axios.post(api.register, body, {
        //     headers: {
        //         Authorization: "Bearer " + localStorage.token
        //     }
        // })
        //     .then(ress => {
        //         toggleNotif("success", "Berhasil menambahkan user");
        //         history.push("/setting");
        //     })
        //     .catch(error => {
        //         console.log(error.response);
        //         toggleNotif("error", error.response.statusText);
        //     });
    };
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Pengelola</Breadcrumb.Item>
                <Breadcrumb.Item>Tambah Pengelola</Breadcrumb.Item>
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
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Nama"
                        name="nama"
                        rules={[
                            {
                                required: true,
                                message: "Please input nama "
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                        <Select style={{ width: 240 }}>
                            <Option value="1">Petani</Option>
                            <Option value="2">Pengelola</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Confirmation Password"
                        name="password_confirmation"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password again!"
                            }
                        ]}
                    >
                        <Input.Password />
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

export default TambahUser;
