import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Card,
    message
} from 'antd';


export default function CourseVideoRecord(){
    const host = process.env.REACT_APP_BACKEND_INTERNAL_HOST;
    console.log(host)
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const { TextArea } = Input;
  
  
    const handleFileUpload = async (e) => {
      let img = e.target.files[0];
      setImage(img);
    }
  
    const handleSubmit = async (values) => {
      try {
        const apiKey = process.env.REACT_APP_SMMS_API_KEY;
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

        const payload = { ...values, videoCover: url };
        console.log("this is the ");
        console.log(payload);
        
        const responseLec = await fetch(host + 'courses/addCourseLecture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (responseLec.ok) {
          message.success('添加成功！');
          // Add any further logic here if needed
        } else {
          message.error('添加失败！');
        }
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    };
  
  
    return (
      <Card 
      title="录入课程视频"
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
          <Form.Item label="课号" name="courseName">
            <Input />
          </Form.Item>
          <Form.Item label="时长" name="duration">
            <Input />
          </Form.Item>
          <Form.Item label="简介" name="intro">
            <TextArea />
          </Form.Item>
          <Form.Item label="视频url" name="videoUrl">
            <Input />
          </Form.Item>
          <Form.Item label="视频图片" name="videoCover">
            <Input
              type="file"
              id="img"
              name="img"
              onChange={(e) => handleFileUpload(e)} />
          </Form.Item>
          <Form.Item label="笔记url" name="notesUrl">
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
  