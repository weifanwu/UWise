import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {Space} from 'antd';
function Cards(props) {

  return (
    <>
      <Space direction='vertical' style={{ marginBottom: "45px", marginLeft: "20px"}}>
        <div style={{ marginLeft: "20px", marginTop: "50px", marginBottom: "20px", fontSize: "25px" }}><strong>2024 Winter</strong></div>
        <Space style={{ marginLeft: "20px", marginRight: "20px", justifyContent: "start" }} align='start' size="large" wrap>

            <CardItem
              className="class"
              src='images/econ200.jpg'
              text='ECON200'
              label='300 USD'
              path='/payment'
              courseName="ECON200"
              isLoggedIn = {props.isLoggedIn}
            />
            <CardItem
              className="class"
              src='images/econ201.jpg'
              text='ECON201'
              label='300 USD'
              path='/payment'
              courseName="ECON201"
              isLoggedIn = {props.isLoggedIn}
            />
            <CardItem
              className="class"
              src='images/math125.png'
              text='MATH125'
              label='300 USD'
              path='/payment'
              courseName="MATH125"
              isLoggedIn = {props.isLoggedIn}
            />
        </Space>
      </Space>
    </>
  );
}

export default Cards;
