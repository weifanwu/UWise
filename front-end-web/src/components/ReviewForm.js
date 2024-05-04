// reviewForm.js

import React from "react";
import { Form, Select, DatePicker, Rate, Input, Flex } from "antd";

const { Option } = Select;
const { TextArea } = Input;

function ReviewForm({ courseName }) {
  return (
    <Form>
      <Form.Item label="选择学期">
        <Select defaultValue="AU" style={{ width: 120 }} onChange={null}>
          <Option value="AU">AU</Option>
          <Option value="WI">WI</Option>
          <Option value="SP">SP</Option>
          <Option value="SU">SU</Option>
        </Select>
      </Form.Item>

      <Form.Item label="选择年份">
        <DatePicker picker="year" />
      </Form.Item>
      <Form.Item label="选择评分">
        <Flex gap="middle">
          <span>难度 |</span>
          <Rate defaultValue={3} allowClear={false} />
        </Flex>
        <Flex gap="middle">
          <span>推荐指数 |</span>
          <Rate defaultValue={3} allowClear={false} />
        </Flex>
        <Flex gap="middle">
          <span>热门度 |</span>
          <Rate defaultValue={3} allowClear={false} />
        </Flex>
      </Form.Item>
      <Form.Item label="输入评价">
        <TextArea
          rows={4}
          placeholder={"为" + courseName + "添加评价吧！"}
          maxLength={6}
        />
      </Form.Item>
    </Form>
  );
}

export default ReviewForm;
