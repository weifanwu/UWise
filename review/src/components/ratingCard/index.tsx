import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import axios from 'axios';
import styles from './index.css';
import ThreeBubbles from './threeBubbles';
import Diagram from './barChart';
import { Select, Divider } from 'antd';
import Comment from './comments';
import { Button, Modal, Form, Input, Spin } from 'antd';

/**
 * courseInfo中间content部分的course rating部分
 * @param props
 */
const RatingCard = (props: any) => {
  const { professors, courseCode, gradeMap, updateBreakdown } = props;
  const [currentProfessor, setCurrentProfessor] = useState('All');
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const [comments, setComments] = useState(
    new Array<JSX.Element>(),
  );

  const totalComments = () => {
    if (comments.length === 0) {
      return <h3>写下你的第一条评论吧~~</h3>
    } else {
      return comments;
    }
  }

  const initialState = {
    overall_rating: 0,
    average_gpa: 0,
    hours: 0,
    grade_distribution: {
      a: 0,
      a_minus: 0,
      b_plus: 0,
      b: 0,
      b_minus: 0,
      c_plus: 0,
      c: 0,
      c_minus: 0,
      d_plus: 0,
      d: 0,
      d_minus: 0,
      fail: 0,
      withdraw: 0,
    },
    rating_breakdown: {
      the_course_as_a_whole: 0,
      the_course_content: 0,
      instructor_contribution: 0,
      instructor_effectiveness: 0,
      instructor_interest: 0,
      quiz_section_content: 0,
      grading_techniques: 0,
      amount_learn: 0,
    },
  };
  const [state, setState] = useState(initialState);
  const { Option } = Select;

  let handleRenderContent = (qaListResponse: any) => {
    if (qaListResponse) {
      let renderContent = qaListResponse.map((x: any) => {
        return (
          <Comment instructor={x["instructor"]} quarter={x["quarter"]} comment={x["comment"]}/>
        );
      });
      setComments(renderContent);
    }
  };

  useEffect(() => {
      (async function callFetchHandler() {
        try {
                console.log(courseCode);
                let response = await fetch("http://localhost:4567/getReview?courseCode=" + courseCode);
                console.log(response);
                let reviews = await response.json();
                console.log(reviews);
                handleRenderContent(reviews);
                console.log("Enter" + courseCode);

        } catch (err) {
          console.log('QA列表获取失败', err);
        }
      })();
  }, [courseCode]);

  useEffect(() => {
    if (courseCode.length && currentProfessor.length) {
      axios
        .get(
          'https://capstone2022-342303.uw.r.appspot.com/course/professor/info?course_code=' +
            courseCode +
            '&professor_name=' +
            currentProfessor,
        )
        .then((Response) => {
          //console.log(Response.data.data);
          setState(Response.data.data);
          updateBreakdown(Response.data.data.rating_breakdown);
        });
    }
  }, [courseCode]);

  //生成教授下拉列表的选项
  const options = professors.map((val: string) => {
    return <Option value={val}>{val}</Option>;
  });

  function changeHandler(val: string) {
    setCurrentProfessor(val);
  }

  let [visibility, setVisibility] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true); 
      const review = { "instructor" : values.instructor, "quarter" : values.quarter, "course" : courseCode, "comment" : values.comment, "reviewed" : false};
      const response = await fetch("http://localhost:4567/addComment", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      setAdd(!add);
      setVisibility(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.dropMenuAndContent}>
      <div>
        <h1>Statistic</h1>
        <div className={styles.content}>
          <ThreeBubbles
            renderData={[
              ['Overall Rating', state.overall_rating + ' / 5'],
              ['Average GPA', state.average_gpa],
              ['Hours Per Week', state.hours],
            ]}
          />
          <div>
            <Diagram
              gradeMap={gradeMap}
              distribution={state.grade_distribution}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <p style={{alignSelf: 'flex-end', fontSize: 'x-small', opacity: '0.4'}}>Data collected from UW for 2016-2021</p>
        <div>
          <div className={styles.title}>
            <div className={styles.discussion}>课程评价</div>
            <Button className={styles.addbutton} type="primary" shape="round" size="large" onClick={() => {
              setVisibility(true);
            }}>
              Add Reviews
            </Button>
          </div>
          <Modal visible={visibility}
                 title="课程评论"
                 onOk={handleOk}
                 onCancel={() => {
                    setVisibility(false);
                 }}
                 confirmLoading={loading}
          >
            <Form form={form}>
              <Form.Item name="instructor" rules={[{ required: true }]}>
                <Input placeholder="Instructor Name..." />
              </Form.Item>
              <Form.Item name="quarter" rules={[{ required: true }]}>
                <Input placeholder="Quarter..." />
              </Form.Item>
              <Form.Item name="comment" rules={[{ required: true }]}>
                <Input placeholder="Comment..." />
              </Form.Item>
            </Form>
          </Modal>
          <div className="comment">
            {totalComments()}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateProps = (state: any) => {
  return {
    professors: state.courseInfo.professors,
    courseCode: state.courseInfo.courseCode,
    gradeMap: state.courseInfo.gradeMap,
  };
};

const actionCreator = {
  updateBreakdown: (payload: {}) => {
    return {
      type: 'courseInfo/updateBreakdown',
      payload,
    };
  },
};

export default connect(mapStateProps, actionCreator)(RatingCard);
