import React, { useState } from 'react';
import '../App.css';
import './HeroSection.css';
import Introduction from "./Introduction";
import { AiFillWechat } from "react-icons/ai";
import { Modal } from 'antd';

function HeroSection() {
    const [value, setValue] = useState(false);
    return (
    <>
        <div className='hero-container'>
          <video src='https://d3qpxblrgmhuz7.cloudfront.net/videos/example.m4v' autoPlay loop muted />
          <h1>Be Wise With UWise</h1>
          <p>"在智慧中发现成功"</p>
        </div>
        <div id="weChat" onClick={
            () => {
                setValue(true);
            }}
        >
            添加小助手
            <AiFillWechat size={20}/>
        </div>
        <h1 id="title">我们能做什么？</h1>
        <div className="intro-section">
            {/*<Introduction image="../images/diverse.png" alt="big data" header="4.0资源" description="所有需要的冲4.0资源    4.0 = 辅导+答疑+刷题" text="UWise 有专业的本校4.0学生做tutor, 我们提供各种课程以及tutoring 并搭配专业的答疑老师进行群内实时答疑；同时 我们收录了近5年的所有科目和考试题 作为强大题库，配套给学生刷题以帮助大家更好的保A冲4.0 " button="课程评论" src="/products"/>*/}
            <Introduction image="../images/data.png" alt="communication" header="选课攻略" description="最全最真实的选课攻略     考的好 不如选的好" text="我们有历年的华大官方的课程统计数据和历届学生的真实课评，以及每科成绩分布图。通过课程统计数据，学生可以更好的了解每一门课的内容以及难度，我们还有收录了每个quarter学生对不同professor的评论 更好的帮助学生避雷傻逼教授 以帮助华大学生选课。" button="课程评价" src="/products"/>
            <Introduction image="../images/networking.png" alt="The image for some reason is broken" header="问题交流" description="实时高效的问题交流平台  没有人是一座孤岛" text="我们有专业申请和交流的平台论坛 以供大家分享信息 询问问题。在这里 你可以找到志同道合或者有相似问题的朋友 也能收到过来人的一些有用建议和经验分享。我们期待海水退却，将每一座孤岛连接起来。" button="Mastodon" src="https://uwcse.com/explore"/>
            <Introduction image="../images/news.png" alt="news" header="新闻汇总" description="史上最全面时效的消息整理  大学生活本应多姿多彩" text="我们会每周更新整合近期 活动信息和大事件。在这里 你可以获取到所有的信息，包括但不局限于：IMA活动，UW体育比赛，学校组织的Activities，学生社团的比赛和活动，新闻大事件，演唱会，专业申请分享会，Career fair招聘会，实习信息，lab research，宿舍攻略，好吃的饭店外卖推荐等信息" button="新闻" src="/services"/>
        </div>
        <Modal
          title="小助手Yoyo"
          visible={value}
          onOk={() => {
            setValue(false);
          }}
          onCancel={() => {
            setValue(false);
          }}
          >
            <img src="../images/小助手.jpeg"/>
        </Modal>
    </>);
}

export default HeroSection;