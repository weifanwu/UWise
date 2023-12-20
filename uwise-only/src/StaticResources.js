import React, { useState } from 'react';
import { Button, Card, Form, Input, message} from 'antd';


const StaticResources = () => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);

    const handleFileUpload= async (e) => {
          let img = e.target.files[0];
          setImage(img);
    }

      const handleSubmit = async (values) => {
        try {
          const apiKey = process.env.REACT_APP_SMMS_API_KEY;
          console.log("this is the api key");
          console.log(apiKey);
          const formData = new FormData();
          formData.append('smfile', image);
          const response = await fetch("/api/v2/upload", {
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
          console.log("this is the result: ");
          console.log(result);
          let url;
          if (!result.success) {
            if (result.code === "unauthorized") {
              message.error("身份认证失败，请联系管理员！");
              return;
            }
            url = result["images"];
          } else {
            url = result.data["url"];
          }

          const payload = { ...values, img: url };
          await fetch('http://localhost:8000/resources/addStaticResource', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          message.success('添加成功！');
        } catch (error) {
          console.error('Error during form submission:', error);
          message.error('添加失败！');
        }
    };

    return (
      <Card 
      title="静态资源录入"
      style={{ 
          width: "500px"
      }}>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
        >
          <Form.Item label="标题" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="简介" name="intro">
            <Input />
          </Form.Item>
          <Form.Item label="类别" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="图片" name="img">
            <Input
              type="file"
              id="img"
              name="img"
              onChange={(e) => handleFileUpload(e)}/>
          </Form.Item>
          <Form.Item label="链接" name="url">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              录入
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  };


  export default StaticResources;