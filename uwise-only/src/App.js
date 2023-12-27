import {
  Button,
  Flex,
  Divider,
  Space,
  message,
  Input,
  Card
} from 'antd';
import StaticResources  from './StaticResources.js';
import { DynamicResources } from './DynamicResources.js';
import CourseVideoRecord from './CourseVideoRecord.js';
import { useState } from 'react';

function App() {
  return (
    <div style={{
      height: "100vh",
      width: "100wh",
    }}>
      
      <Flex wrap="wrap" gap="small">
        <CourseVideoRecord  />
        <Buy />
        <StaticResources />
        <DynamicResources />
        <Reviews />
      </Flex>
    </div>
  );
}



function Buy() {
  const host = process.env.REACT_APP_BACKEND_INTERNAL_HOST;
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
          fetch(host + 'buy/buyClass', {
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