import React, { useState, useEffect } from 'react';
import {
    Button,
    Flex,
    Form,
    Input,
    Card,
    message,
    Select,
} from 'antd';

export function DynamicResources() {
    const [title, setTitle] = useState("")
    const [intro, setIntro] = useState("")
    const [priority, setPriority] = useState("")
    const [url, setUrl] = useState("")
    const [img, setImg] = useState(null)
    const [type, setType] = useState(''); // Added state for type
    const { TextArea } = Input;
    const { Option } = Select;

    const handleInputChange = async (e) => {
        const { id, value, files } = e.target;
        switch (id) {
            case 'title':
                setTitle(value);
                break;
            case 'intro':
                setIntro(value);
                break;
            case 'priority':
                setPriority(value);
                break;
            case 'url':
                setUrl(value);
                break;
            case 'img':
                setImg(files[0]);
                break;
            default:
                break;
        }
    }

    const handleTypeChange = (value) => {
        setType(value);
    };

    const [data, setdata] = useState([])
    useEffect(() => {
        const host = process.env.REACT_APP_BACKEND_INTERNAL_HOST;
        fetch(host + 'dr/getDR')
            .then(response => response.json())
            .then(data => setdata(data))
            .catch(error => console.error(error));
    }, []);

    const [priority1, setpriority1] = useState([])
    const [priority2, setpriority2] = useState([])
    useEffect(() => {
        setpriority1(data.filter(item => item.Priority === "1").length)
        setpriority2(data.filter(item => item.Priority === "2").length)
    }, [data])

    const submit = async () => {
        try {
            const host = process.env.REACT_APP_BACKEND_INTERNAL_HOST;
            if (title.trim().length <= 0 ||
                priority.trim().length <= 0 || url.trim().length <= 0 ||
                !img) {
                message.error("请填入信息")
            } else if (priority === 1 && priority1 >= 5) {
                console.log("无法录入")
            } else {
                const apiKey = 'YuoYZdpx0YQcYv8GpTwaHDwLO7DOF8gw';
                const apiUrl = "/api/v2/upload";
                // 14ac5499cfdd2bb2859e4476d2e5b1d2bad079bf
                const formData = new FormData();
                formData.append('smfile', img);

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        "Authorization": apiKey
                    },
                    body: formData,
                });



                if (!response.ok) {
                    message.error("Image Upload has been failed!")
                    console.error('Image upload failed');
                    message.error('图片添加失败！');
                    return;
                }

                const result = await response.json();
                let image;
                if (!result.success) {
                    if (result.code === "unauthorized") {
                        message.error("身份认证失败，请联系管理员！");
                        return;
                    }
                    image = result["images"];
                } else {
                    image = result.data["url"];
                }

                await fetch(host + "dr/addDR", {
                    method: "POST",
                    body: JSON.stringify({ "title": title, "intro": intro, "priority": priority, "type": type, "url": url, "img": image }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                message.success("录入成功！");
            }
        } catch (error) {
            message.error("录入失败！");
            console.log("an error has happened: ", error);
        }
    }

    return (
        <div>
            <Flex wrap="wrap" gap="small">
                <Card
                    title="录入动态资源"
                    style={{
                        width: "500px"
                    }}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item label="标题" name="title">
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                onChange={(e) => handleInputChange(e)}
                                value={title}
                            />
                        </Form.Item>
                        <Form.Item label="简介" name="intro">
                            <TextArea
                                type="text"
                                id="intro"
                                name="intro"
                                onChange={(e) => handleInputChange(e)}
                                value={intro}
                            />
                        </Form.Item>
                        <Form.Item label="优先级" name="priority">
                            <Input
                                type="text"
                                id="priority"
                                name="priority"
                                onChange={(e) => handleInputChange(e)}
                                value={priority}
                            />
                        </Form.Item>
                        <div style={{ textAlign: "center" }}>
                            <p>目前有{priority1}/5 个“1”, {priority2}/无限 个“2”</p>
                        </div>
                        <Form.Item label="类型" name="type">
                            <Select defaultValue="" onChange={handleTypeChange} value={type}>
                                <Option value="校园生活">校园生活</Option>
                                <Option value="校园新闻">校园新闻</Option>
                                <Option value="社团活动">社团活动</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="图片" name="img">
                            <Input
                                type="file"
                                id="img"
                                name="img"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Form.Item>
                        <Form.Item label="URL" name="url">
                            <Input
                                type="text"
                                id="url"
                                name="url"
                                onChange={(e) => handleInputChange(e)}
                                value={url}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={submit}>
                                录入
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Flex>
        </div>
    );
}