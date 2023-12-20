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
    const [img, setimg] = useState("")

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
            let img = e.target.files[0]

            const apiKey = 'szAql87YxCVzxIhkkr8H0BAjBmPeAzpT';
            const apiUrl = "/api/v2/upload";

            const formData = new FormData();
            formData.append('smfile', img);

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        Authorization: apiKey,
                    },
                    body: formData,
                });



                if (!response.ok) {
                    console.error('Image upload failed');
                    message.error('图片添加失败！');
                    return;
                }
                const result = await response.json();
                const url = result.images;
                setimg(url)
                message.error('图片添加成功！');
                console.log(url)
            } catch (error) {
                console.error('Error occurred during image upload', error);
                // Handle the error
            }
        }
    }

    const submit = async () => {
        if (title.trim().length <= 0 || intro.trim().length <= 0 ||
            priority.trim().length <= 0 || url.trim().length <= 0 ||
            img.trim().length <= 0) {
            console.log("请填入信息")
        } else {
            const response = await fetch("http://localhost:8000/dr/addDR", {
                method: "POST",
                body: JSON.stringify({ "title": title, "intro": intro, "priority": priority, "url": url, "img": img }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });
            const book = await response.text();
            console.log(book)
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