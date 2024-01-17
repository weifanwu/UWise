import React, { useState, useEffect } from 'react';
import { Avatar, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "./Profile.css";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Card,
  message
} from 'antd';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function Profile(props) {

  const [profileInfo, setProfileInfo] = useState({
    given_name: "",
    family_name: "",
    picture: "",
    email: "",
    grade: "",
    major: "",
    classes: [],
  });


  useEffect(() => {
    fetch(`http://localhost:8000/profile/getProfile?email=${encodeURIComponent(props.email)}`)
      .then(response => response.json())
      .then(data => {setProfileInfo(data);})
      .catch(error => console.error(error));
  }, [props.email]);

  const handleProfileChange = async() => {
    await fetch('http://localhost:8000/profile/updateProfile', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileInfo),
    })
      .then(async response => {
        if (response.ok) {
          message.success("更新成功");
        } else {
          message.error("更新失败");
        }
        return response.json();})
      .catch(error => {
        console.error(error);
      });
  };

  const onFormChange = (event) => {
    const { name, value} = event.target;
    setProfileInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card style={{ 
        width: "350px",
        margin: "auto",
        marginTop: "5px",
        marginRight: "5px",
        paddingBottom: "20px"
    }}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Avatar style={{ marginBottom: "20px" }}src={props.picture} size="large" gap="2px">
          weifan
        </Avatar>

        <Form.Item class="name">
          <div class="given_name">
            <label class="required" for="given_name">First Name</label>
            <div class="custom-input">
            <Input type="text" id="given_name" name="given_name" value={profileInfo.given_name} placeholder={profileInfo.given_name}onChange={onFormChange}
            />
            </div>
          </div>
        </Form.Item>

        <Form.Item class="name">
          <div class="family_name">
            <label class="required" for="family_name">Last Name</label>
            <div class="custom-input">
            <Input type="text" id="family_name" name="family_name" value={profileInfo.family_name} placeholder={profileInfo.family_name} onChange={onFormChange}/>
            </div>
          </div>
        </Form.Item>

        <Form.Item class="year">
          <label class="required" for="year">Year</label>
          <div class="custom-input">
          <Select id="year" name="year" placeholder={profileInfo.grade}
            value={profileInfo.grade}
            onChange={(value) => setProfileInfo(prevState => ({
              ...prevState,
              grade: value
            }))}
          >
          <Select.Option value="Freshman">Freshman</Select.Option>
          <Select.Option value="Sophomore">Sophomore</Select.Option>
          <Select.Option value="Junior">Junior</Select.Option>
          <Select.Option value="Senior">Senior</Select.Option>
          </Select>
          </div>
        </Form.Item>
        
        <Form.Item class="major">
          <label class="required" for="major">Major</label>
          <div class="custom-input">
          <Input type="text" id="major" name="major" value={profileInfo.major} placeholder={profileInfo.major} onChange={onFormChange}/>
          </div>
        </Form.Item>

        {/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
        <Form.Item>
          <Button onClick={handleProfileChange}>Save</Button>
          <Button style={{ marginLeft: "10px"}} onClick={async () => {
                    window.open(process.env.REACT_APP_BACKEND_HOST + "/auth/logout", "_self");
                  }}>登出</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};