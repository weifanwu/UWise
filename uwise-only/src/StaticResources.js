import React, { useState } from 'react';
import { Button, Card, Form, Input, message, Space} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const DynamicLinkForm = ({ form }) => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form form={form} name="dynamic_link_form" onFinish={onFinish} autoComplete="off">
      <Form.List
        name="urls"
        initialValue={[{ text: '', url: '' }]} 
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'text']}
                  rules={[{ required: true, message: 'Missing link text' }]}
                  label="显示文字"
                >
                  <Input placeholder="text" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'url']}
                  rules={[{ required: true, message: 'Missing URL' }]}
                  label="链接"
                >
                  <Input placeholder="https://" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Link
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};


const StaticResources = () => {
  const host = process.env.REACT_APP_BACKEND_INTERNAL_HOST;
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const { TextArea } = Input;

  const handleFileUpload = async (e) => {
    let img = e.target.files[0];
    setImage(img);
  }

  const handleSubmit = async (values) => {
    try {
      const links = values.links || [];
      const linksMap = {};
      links.forEach(link => {
        linksMap[link.text] = link.url;
      });

      console.log("Links hashmap:", linksMap);

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
      console.log("this is the ");
      console.log(values);
      console.log(values["简介"]);

      const payload = { ...values, img: url, url: linksMap };

      await fetch(host + 'resources/addStaticResource', {
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
          <TextArea />
        </Form.Item>
        <Form.Item label="类别" name="type">
          <Input />
        </Form.Item>
        <Form.Item label="图片" name="img">
          <Input
            type="file"
            id="img"
            name="img"
            onChange={(e) => handleFileUpload(e)} />
        </Form.Item>
        {/* <Form.Item label="链接" name="url">
          <Input />
        </Form.Item> */}

       <DynamicLinkForm form={form} />
        
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