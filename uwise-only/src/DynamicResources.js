import React, { useState } from 'react'; //import React Component
import {
    Button,
    Flex,
    Form,
    Input,
    Card,
    message
} from 'antd';

export function DynamicResources() {
    const [title, settitle] = useState("")
    const [intro, setintro] = useState("")
    const [priority, setpriority] = useState("")
    const [url, seturl] = useState("")
    const [img, setimg] = useState(null)

    const handleInputChange = async (e) => {
        let { id, value } = e.target
        if (id === "title") {
            settitle(value)
        }
        if (id === "intro") {
            setintro(value)
        }
        if (id === "priority") {
            setpriority(value)
        }
        if (id === "url") {
            seturl(value)
        }
        if (id === "img") {
            setimg(e.target.files[0]);
        }
    }

    const submit = async () => {
        try {
            const host = process.env.REACT_APP_BACKEND_HOST;
            if (title.trim().length <= 0 || intro.trim().length <= 0 ||
            priority.trim().length <= 0 || url.trim().length <= 0 ||
            !img) {
                message.error("请填入信息")
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
                    body: JSON.stringify({ "title": title, "intro": intro, "priority": priority, "url": url, "img": image }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                });
            }
            message.success("录入成功！");
        } catch(error) {
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
                            <Input
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