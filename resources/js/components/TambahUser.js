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
const TambahUser = () => {
    const [form] = Form.useForm();
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Tambah User</Breadcrumb.Item>
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
                    <Form.Item label="Role" name="role">
                        <Select style={{ width: 240 }}>
                            <Option value="1">Petani</Option>
                            <Option value="2">Dinas Perkebunan</Option>
                            <Option value="3">UB Forest</Option>
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

export default TambahUser;
