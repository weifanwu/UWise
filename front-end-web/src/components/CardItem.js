import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Modal } from 'antd';

function CardItem(props) {

  const currentClasses  = useSelector((state) => state.classes.value);
  const [popOut, setPopOut] = useState(false);

  const history = useNavigate();

  const handleRedirect = () => {
    history(props.path);
  };

  return (
    <>
      <div className='cards__item' onClick={() => {
        localStorage.setItem('currentClass', props.courseName);
        if (!currentClasses.includes(props.courseName)) {
          setPopOut(true);
        } else {
          handleRedirect();
        }
        }}>
        <div className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
          <img
            className='cards__item__img'
            alt='Travel Image'
            src={props.src}
          />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </div>
      </div>
      <Modal
        title="小助手Yoyo"
        visible={popOut}
        onOk={() => {
          setPopOut(false);
        }}
        onCancel={() => {
          setPopOut(false);
        }}
        footer={null}
        >
          <div style={{ textAlign: 'center' }}>
            <p>1.请联系小助手买课</p>
            <img style={{ width: "200px" }} src="/images/小助手.jpeg"></img>
            <p>2. 鼠标悬浮在“课程”上以输入兑换码</p>
            <img style={{ width: "200px" }} src="/images/activate.png"></img>
          </div>
      </Modal>
    </>
  );
}

export default CardItem;
