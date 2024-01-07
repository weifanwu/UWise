import React, { useEffect, useState } from "react";

import { Tabs, Card, Button, Breadcrumb } from 'antd';
import { Typography, Box, Stack } from "@mui/material";
import Lectures from "../LectureCard";

export default function Payment(props) {
    const currentClass = localStorage.getItem("currentClass");
    const classToName = {"ECON200": "Francis", "ECON201": "shipei"};
    const items = [
        {
          key: '1',
          label: '课程大纲',
          children: <Lectures courseName={currentClass}/>,
        },
        // {
        //   key: '2',
        //   label: '笔记',
        //   children: <img src="images/uwise-notes.jpg"/>,
        // }
      ];

    return <>
        <Breadcrumb
            style={{ margin: "20px 0px 15px 100px" }}
            separator=">"
            items={[
            {
                title: 'Home',
                href: '/',
            },
            {
                title: '公开课',
                href: '/classes',
            },
            {
                title: currentClass,
            }
            ]}
        />
        <div style={{ height: "100%", background: '#F4F6F6' }}>
            <Stack direction="row" style={{ background: 'white', margin: "10px 220px", padding: '20px', borderRadius: '8px'  }}>
                <Card style={{ width: 180, height: 100, background: "#7E5109" }}>
                    <Typography fontSize={30} color="white">{currentClass}</Typography>
                </ Card>
                <Box style={{ margin: '20px 100px 0px 20px' }}>
                    <Typography fontSize={18} >主讲导师：{classToName[currentClass]}</Typography>
                    <Typography fontSize={15} >失效时间：2024/06/12</Typography>
                </Box>
                <Box>
                    <Button style={{ marginTop: 30, marginLeft: 300 }} onClick={() => {
                    if (!props.userInfo) {
                        props.setIsModalOpen(!props.isModalOpen)
                    } else {
                        window.open('https://washington.zoom.us/j/3813523196', "_blank");
                    }
                    }}>Zoom直播链接</Button>
                </Box>
            </Stack>
            <Tabs 
                defaultActiveKey="1" items={items} 
                style={{ margin: "20px 220px", background: 'white', padding: '16px', borderRadius: '8px' }}
            />
        </div>
    </>
}