import React, { useEffect, useState, useContext } from "react";
import {
    Layout,
    Row,
    Col,
    Card,
    Breadcrumb,
    Upload,
    Button,
    message
} from "antd";
import Axios from "axios";
import api from "../api/api";
import { Link } from "react-router-dom";
import CSVReader from "react-csv-reader";

const { Content } = Layout;
const UploadData = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = e => {
        setUploading(true);
        console.log(e.target);
    };
    const handleForce = (data, fileInfo) => console.log(data, fileInfo);
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };
    return (
        <Layout>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Sensor</Breadcrumb.Item>
                <Breadcrumb.Item>Upload Data Lama</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                id="isian"
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: "min-content",
                    marginBottom: 64
                }}
            >
                <Row gutter={[8, 16, 24, 32]}>
                    <Col className="gutter-row" span={[8, 16, 24, 32]}>
                        <CSVReader
                            cssClass="react-csv-input"
                            label="Select sensor data with csv format"
                            onFileLoaded={handleForce}
                            parserOptions={papaparseOptions}
                        />
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{ marginTop: 16 }}
                        >
                            {uploading ? "Uploading" : "Start Upload"}
                        </Button>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default UploadData;
