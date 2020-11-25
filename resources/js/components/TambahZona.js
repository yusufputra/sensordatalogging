import React from "react";
import { Breadcrumb, Form, Layout, Input, Button, Select } from "antd";

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
                    <Form.Item label="Zona" name="zona">
                        <Select style={{ width: 240 }}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
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
