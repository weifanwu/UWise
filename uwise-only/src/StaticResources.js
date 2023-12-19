
import {
    Button,
    Flex,
    Divider,
    Space,
    message,
    Form,
    Input,
    Card
  } from 'antd';
import { useState } from 'react';

const StaticResources = () => {
    const [form] = Form.useForm();
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
            <Input />
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

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:8000/addStaticResource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        message.success('添加成功！');
        // Add any further logic here if needed
      } else {
        message.success('添加失败！');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };


  export default StaticResources;