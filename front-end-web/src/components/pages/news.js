import React, { useEffect, useState } from 'react';
import ResourcesCards from '../ResourcesCards';
import ResourcePage from "./ResourcePage";
import Card from "../newCard";
import "./news.css"

export default function News() {
    // const [page, setPage] = useState("");
    // const [pageContent, setPageContent] = useState("");
    const [content, setContent] = useState([{name : "新闻一", picture: "images/communication.jpeg", intro : "有第一件特别牛逼的事情发生在了UW", position : "largest"},{name : "新闻二", picture: "images/communication.jpeg", intro : "有第二件特别牛逼的事情发生在了UW", position : "medium"},{name : "新闻三", picture: "/images/communication.jpeg", intro : "有第三件特别牛逼的事情发生在了UW", position : "medium"},{name : "新闻四", picture: "/images/communication.jpeg", intro : "有第四件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"},{name : "新闻五", picture: "/images/communication.jpeg", intro : "有第五件特别牛逼的事情发生在了UW", position : "small"}]);
    // const [show, setShow] = useState(true);
    // useEffect(() => {
    //     async function getContent() {
    //         if (page === "news") {
    //             setContent([{name : "新闻一", intro : "有第一件特别牛逼的事情发生在了UW"},{name : "新闻二", intro : "有第二件特别牛逼的事情发生在了UW"},{name : "新闻三", intro : "有第三件特别牛逼的事情发生在了UW"},{name : "新闻四", intro : "有第四件特别牛逼的事情发生在了UW"},{name : "新闻五", intro : "有第五件特别牛逼的事情发生在了UW"}]);
    //         } else if (page === "clubs") {
    //             setContent([{name : "club1", intro : "hahaha"},{name : "club2", intro : "招新"},{name : "club3", intro : "团建"},{name : "club4", intro : "活动"},{name : "club5", intro : "牛！"}]);
    //         } else if (page === "ima") {
    //             setContent([{name : "ima1", intro : "篮球"},{name : "ima2", intro : "足球"},{name : "ima3", intro : "排球"},{name : "ima4", intro : "羽毛球"},{name : "ima5", intro : "乒乓球"}]);
    //         } else if (page === "fun") {
    //             setContent([{name : "美甲", intro : "有意思"},{name : "洗脚", intro : "丑！"},{name : "打麻将", intro : "赌钱"},{name : "抽烟", intro : "呵呵"},{name : "奶茶店", intro : "奶茶"}]);
    //         } else if (page === "home") {
    //             setContent([{name : "news", intro : "hahaha"},{name : "clubs", intro : "招新"},{name : "ima", intro : "团建"},{name : "fun", intro : "活动"}]);
    //         }
    //     }
    //     getContent();
    // }, [page]);
    return <>
                <div className='resource'>

                    {/* <ResourceNav setPage={(name)=> {
                        setPage(name);
                    }} />
                    <div id="main-page">
                        {
                            show ? <ResourcesCards classPage={page} content={content} showPage={setShow} setPageContent={setPageContent} /> : <ResourcePage showPage={setShow} page={pageContent}/>
                        }
                    </div> */}
                    {content.map((oneNew) => {
                        return <Card position={oneNew.position} name={oneNew.name} intro={oneNew.intro} picture={oneNew.picture}/>
                    })}
                </div>
            </>
}