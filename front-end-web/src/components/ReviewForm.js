import React, { useState } from "react";
import {
  Form,
  Select,
  DatePicker,
  Rate,
  Input,
  Button,
  Col,
  Row,
  message,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

function ReviewForm({ courseName, onReviewSubmitted }) {
  const [form] = Form.useForm();
  const [difficulty, setDifficulty] = useState(3);
  const [recommendation, setRecommendation] = useState(3);
  const [popularity, setPopularity] = useState(3);

  const backendHost = process.env.REACT_APP_BACKEND_HOST;

  const handleSubmit = async (values) => {
    try {
      // Extract values and format as required
      console.log("Values: " + JSON.stringify(values));
      const { quarter, year, instructor, comment } = values;
      const ratings = [difficulty, recommendation, popularity];

      // Format the year correctly from the DatePicker value
      const formattedYear = year ? year.format("YYYY") : "";

      const reviewData = {
        courseName,
        instructor,
        quarter,
        year: formattedYear,
        ratings,
        comment,
      };

      console.log("ReviewData: " + JSON.stringify(reviewData));

      // Send the POST request to the backend using fetch
      const response = await fetch(
        `${backendHost}/courseReview/addReviewsForCourse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      // Handle the response from the backend
      if (response.ok) {
        message.success("提交成功，请等待审核");
        form.resetFields(); // Reset form fields after successful submission
        if (onReviewSubmitted) {
          onReviewSubmitted(); // Trigger the callback to refetch reviews
        }
        setDifficulty(3);
        setRecommendation(3);
        setPopularity(3);
        return;
      } else {
        const errorResponse = await response.text();
        console.log("Submission error:", errorResponse);
        message.error("提交失败，请稍后重试");
        return;
      }
    } catch (error) {
      console.log("Submission error:", error);
      message.error("提交失败，请检查网络和输入后重试");
    }
  };

  const handleFailedSubmission = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("提交失败，请检查输入后重试");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="review-form"
      onFinish={handleSubmit}
      onSubmitFailed={handleFailedSubmission}
    >
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
          <Form.Item label="教授名称" name="instructor">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          {" "}
          <Form.Item label="输入评价" name="comment">
            <TextArea
              showCount
              rows={4}
              placeholder={"为" + courseName + "添加评价吧！"}
              maxLength={300}
              rules={[
                {
                  required: true,
                  message: "请输入您的评价！",
                  whitespace: true,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <div className="vertical-divider"></div>
        <Col span={6}>
          <Form.Item label="选择评分" name="ratings">
            <div>
              <Rate
                value={difficulty}
                onChange={setDifficulty}
                allowClear={false}
              />
              <span className="rate-label"> | 难度</span>
            </div>
            <div>
              <Rate
                value={recommendation}
                onChange={setRecommendation}
                allowClear={false}
              />
              <span className="rate-label"> | 推荐指数</span>
            </div>
            <div>
              <Rate
                value={popularity}
                onChange={setPopularity}
                allowClear={false}
              />
              <span className="rate-label"> | 热门度</span>
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
