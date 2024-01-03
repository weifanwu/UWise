import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {Space} from 'antd';
function OldCards(props) {

  return (
    <>
      <Space direction='vertical' style={{ marginBottom: "45px" }}>
        <div style={{ marginTop: "50px", marginBottom: "20px", fontSize: "25px" }}><strong>Past Courses</strong></div>
        <Space style={{ margin: "0 auto", justifyContent: "space-evenly" }} align='center' size="large" wrap>
            <CardItem
              className="class"
              src='images/cse121.jpg'
              text='CSE121'
              label='300 USD'
              courseName="CSE121"
              path='/payment'
              update={props.update}
            />
            <CardItem
              className="class"
              src='images/amath301.png'
              text='AMATH301'
              label='300 USD'
              courseName="AMATH301"
              path='/payment'
              update={props.update}
            />
            <CardItem
              className="class"
              src='images/math124.jpg'
              text='MATH124'
              label='300 USD'
              path='/payment'
              courseName="MATH124"
              update={props.update}
            />
            <CardItem
              className="class"
              src='images/chem142.jpeg'
              text='CHEM142'
              label='300 USD'
              path='/payment'
              courseName="CHEM142"
              update={props.update}
            />
            <CardItem
              className="class"
              src='images/cse122.jpg'
              text='CSE122'
              label='300 USD'
              path='/payment'
              courseName="CSE122"
              update={props.update}
            />
        </Space>
      </Space>
    </>
  );
}

export default OldCards;
