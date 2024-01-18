import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditIcon from '@mui/icons-material/Edit'; // Replace 'Edit' with your chosen icon

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



const host = process.env.REACT_APP_BACKEND_HOST;

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


  
  let oldProfileInfo = props.oldProfileInfo;
  console.log(oldProfileInfo)

  
  useEffect(() => {
    fetch(`${host}/profile/getProfile?email=${encodeURIComponent(props.email)}`)
      .then(response => response.json())
      .then(data => {setProfileInfo(data)})
      .catch(error => console.error(error));
  }, [props.email]);

  console.log(profileInfo)

  const handleProfileChange = async() => {
    await fetch(`${host}/profile/updateProfile`, {
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



  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const apiKey = process.env.REACT_APP_SMMS_API_KEY;
        const formData = new FormData();
        formData.append('smfile', file);
        const response = await fetch(`${host}/api/v2/upload`, {
          method: 'POST',
          headers: {
            Authorization: apiKey,
          },
          body: formData,
        });
  
        if (!response.ok) {
          console.error('Image upload failed');
          if(response.status === "413") {
            message.error('图片尺寸过大');
          }
          else {
            message.error('添加失败');
          }
          return;
        }


  
        const data = await response.json();

        setProfileInfo(prevState => ({
          ...prevState,
          picture:  data.images
        }));

      } catch (error) {
        console.error(error);
      }
    
  };
}
  

  const fileInputRef = useRef();

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
        <Avatar  className="avatar-container"
          style={{ marginBottom: "20px", cursor: "pointer" }}
          src={profileInfo.picture}
          size="large"
          gap="2px"
          onClick={() => fileInputRef.current.click()}>
        </Avatar>
        <EditIcon className="edit-icon" style={{ width: "20px", cursor: "pointer", color: "rgb(75, 75, 75)"}} onClick={() => fileInputRef.current.click()}/>

        <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
            accept="image/*"
          />

        <Form.Item class="name">
          <div class="given_name">
            <label class="required" for="given_name">First Name</label>
            <div class="custom-input">
            <Input type="text" id="given_name" name="given_name" value={profileInfo.given_name} placeholder={profileInfo.given_name} onChange={onFormChange}
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
