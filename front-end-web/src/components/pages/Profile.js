import React, { useState, useEffect } from 'react';
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

export default function Profile() {

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
    fetch('http://localhost:8000/login/getProfile')
      .then(response => response.json())
      .then(data => {setProfileInfo(data);
                     console.log(profileInfo);})
      .catch(error => console.error(error));
  }, [profileInfo]);

  const handleProfileChange = () => {
    fetch('http://localhost:8000/login/updateProfile', {method: "POST"})
      .then(response => {
        if (response.ok) {
          message.success("Change saved!");
        } else {
          message.error("Change failed!");
        }
        return response.json();})
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Card style={{ 
        width: "500px",
        margin: "auto",
        marginTop: "50px",
        marginBottom: "50px"
    }}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item class="name">
          <div class="firstname">
          <label class="required" for="firstname">First Name</label>
          <div class="custom-input">
          <Input type="text" id="firstname" name="firstname" placeholder={profileInfo.given_name}/>
          </div>
          </div>
  
          <div class="lastname">
          <label class="required" for="lastname">Last Name</label>
          <div class="custom-input">
          <Input type="text" id="lastname" name="lastname" placeholder={profileInfo.family_name}/>
          </div>
          </div>
        </Form.Item>
          <Form.Item class="year">
          <label class="required" for="year">Year</label>
          <div class="custom-input">
          <Select id="year" name="year" placeholder={profileInfo.grade}>
          <Select.Option value="year1">Freshman</Select.Option>
          <Select.Option value="year2">Sophomore</Select.Option>
          <Select.Option value="year3">Junior</Select.Option>
          <Select.Option value="year4">Senior</Select.Option>
          </Select>
          </div>
        </Form.Item>
        
        <Form.Item class="major">
          <label class="required" for="major">Major</label>
          <div class="custom-input">
          <Input type="text" id="major" name="major" placeholder={profileInfo.major}/>
          </div>
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button style={{marginLeft: "350px"}} onClick={handleProfileChange}>Save</Button>
        </Form.Item>
      </Form>
        <Button style={{ marginLeft: "350px" }} onClick={async () => {
            window.open(process.env.REACT_APP_BACKEND_HOST + "/auth/logout", "_self");
        }}>Google登出</Button>
    </Card>
  );
};