import React, { useState } from 'react';
import { Button, Card, Form, Input, message} from 'antd';


const StaticResources = () => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');

    const handleFileUpload= async (e) => {
          let img = e.target.files[0]
          const apiKey = process.env.REACT_APP_SMMS_API_KEY;

          const formData = new FormData();
          formData.append('smfile', img);
          try {
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
              const url = result.images;
              setImageUrl(url);
              message.error('图片添加成功！');
              console.log(url)
          } catch (error) {
              console.error('Error occurred during image upload', error);
              message.error('图片添加失败！');
          }
    }

      const handleSubmit = async (values) => {
        const payload = { ...values, img: imageUrl };

        try {
          const response = await fetch('http://localhost:8000/resources/addStaticResource', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
      
          if (response.ok) {
            message.success('添加成功！');
            form.resetFields();
            setImageUrl('');
          } else {
            message.error('添加失败！');
          }
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
          {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: "100px", marginTop: "10px" }} />}
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