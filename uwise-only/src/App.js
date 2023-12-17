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
function App() {
  return (
    <div style={{
      height: "100vh",
      width: "100wh",
      background: "#E7ECEC"
    }}>
      <Flex wrap="wrap" gap="small">
        <Class />
        <Buy />
      </Flex>
    </div>
  );
}

const handleSubmit = async (values) => {
  try {
    const response = await fetch('https://uwise-back-end.herokuapp.com/lecture/addLecture', {
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

const Class = () => {
  const [form] = Form.useForm();
  return (
    <Card 
    title="录入课程"
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
        <Form.Item label="课号" name="class">
          <Input />
        </Form.Item>
        <Form.Item label="时长" name="duration">
          <Input />
        </Form.Item>
        <Form.Item label="简介" name="intro">
          <Input />
        </Form.Item>
        <Form.Item label="Zoom Link" name="zoom">
          <Input />
        </Form.Item>
        <Form.Item label="笔记" name="notes">
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

function Buy() {
  const host = process.env.REACT_APP_BACKEND_HOST;
  const [code, setCode] = useState("xxxxxx");
  const [coursename, setCoursename] = useState("");

  const onChange = (e) => {
    setCoursename(e.target.value);
  }

  return (
    <Card title="生成兑换码">
    {code}
      <Divider />
      <Input
        onChange={onChange}
        placeholder="请输入课号"
      />
      <Divider style={{ margin: 0 }} />
      <Space style={{ padding: 8 }}>
        <Button onClick={() => {
          fetch(host + '/buy/buyClass', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              className: coursename, // Replace with the actual class name
            }),
          })
          .then((response) => {
            if (!response.ok) {
              setCode("xxxxxx");
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text()
          })
          .then((value) => {
            message.success("成功 generate新的验证码！");
            setCode(value);
          })
          .catch(error => {
            console.error("Error:", error);
            message.error("课号有误❌！");
          });
        }} type="primary">激活</Button>
      </Space>
    </Card>
  );
}

export default App;