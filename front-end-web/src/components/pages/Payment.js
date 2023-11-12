import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { incrementAsync } from "../../redux/slices";

export default function Payment(props) {
    const navigate =  useNavigate();
    const currentClass = props.classname;
    const value  = useSelector((state) => state.classes.value);
    console.log("this is the classes");
    console.log(value);
    return <>
        <div>
            <h1>{currentClass}</h1>
            <h3>课程介绍：</h3>
            <p>很6的一节课</p>
            <button onClick={() => {
                if (!props.userInfo) {
                    props.setIsModalOpen(!props.isModalOpen)
                } else if (!value.includes(currentClass)) {
                    alert('Please buy this class first!');
                } else {
                    navigate('/class/jOTfBlKSQYY');
                }
            }}>进入</button>
        </div>
    </>
}