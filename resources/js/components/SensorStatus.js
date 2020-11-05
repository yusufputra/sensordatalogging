import React from "react";
import { Layout, Breadcrumb, Table, Tag, Space } from "antd";

const { Content } = Layout;
const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: text => <a>{text}</a>
    },
    {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = "green";
                    if (tag === "Active") {
                        color = "volcano";
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        )
    }
];

const data = [
    {
        key: "1",
        name: "Sensor 1",
        tags: ["Active"]
    },
    {
        key: "2",
        name: "Sensor 2",
        tags: ["Active"]
    },
    {
        key: "3",
        name: "Sensor 3",
        tags: ["Inactive"]
    }
];
const SensorStatus = () => {
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
                <Table columns={columns} dataSource={data} />
            </Content>
        </Layout>
    );
};

export default SensorStatus;
