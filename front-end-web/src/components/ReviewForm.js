import React from "react";
import { Form, Select, DatePicker, Rate, Input, Button, Col, Row } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

function ReviewForm({ courseName }) {
  return (
    <Form layout="vertical" className="review-form">
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item
            label="选择学期"
            name="quarter"
            rules={[{ required: true, message: "请选择学期!" }]}
          >
            <Select placeholder="Select a quarter">
              <Option value="AU">Autumn</Option>
              <Option value="WI">Winter</Option>
              <Option value="SP">Spring</Option>
              <Option value="SU">Summer</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="选择年份"
            name="year"
            rules={[{ required: true, message: "请选择年份!" }]}
          >
            <DatePicker picker="year" suffixIcon={<CalendarOutlined />} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="教授名称" name="instrutor">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={14}>
          {" "}
          {/* Adjusted from 12 to 14 to make the ratio approximately 6:4 */}
          <Form.Item label="输入评价" name="comment">
            <TextArea
              rows={4}
              placeholder={"为" + courseName + "添加评价吧！"}
              maxLength={200}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          {" "}
          {/* Adjusted from 12 to 10 to make the ratio approximately 6:4 */}
          <Form.Item label="选择评分" name="ratings">
            <div>
              <Rate defaultValue={3} allowClear={false} />
              <span className="rate-label">难度</span>
            </div>
            <div>
              <Rate defaultValue={3} allowClear={false} />
              <span className="rate-label">推荐指数</span>
            </div>
            <div>
              <Rate defaultValue={3} allowClear={false} />
              <span className="rate-label">热门度</span>
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Button type="primary" htmlType="submit">
            提交评价
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ReviewForm;
