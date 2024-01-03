import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import {Space} from 'antd';
function Cards(props) {

  return (
    <>
      <Space direction='vertical'>
        <div style={{ marginTop: "50px", marginBottom: "20px", fontSize: "25px" }}><strong>2024 Winter</strong></div>
        <Space style={{ margin: "0 auto", justifyContent: "space-evenly" }} align='center' size="large" wrap>
            <CardItem
              className="class"
              src='images/econ200.jpg'
              text='ECON200'
              label='300 USD'
              path='/payment'
              courseName="ECON200"
              update={props.update}
            />
            <CardItem
              className="class"
              src='images/econ201.jpg'
              text='ECON201'
              label='300 USD'
              path='/payment'
              courseName="ECON201"
              update={props.update}
            />
            <CardItem
              className="class"
              src='images/math125.png'
              text='MATH125'
              label='300 USD'
              path='/payment'
              courseName="MATH125"
              update={props.update}
            />
        </Space>
      </Space>
    </>
  );
}

export default Cards;
