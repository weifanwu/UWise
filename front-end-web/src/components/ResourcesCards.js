import React from "react";
import Card from "./ResourcesCard";
import "./ResourcesCards.css";

export default function ResourcesCards(props) {
    return <>
            <h1>地表最强新闻！</h1>
            <div className="resource-cards">
                {props.content.map((item) => {
                    return <Card className={props.classPage === "home" ? "home-cards" : "card" } item={item} showPage={props.showPage} setPageContent={props.setPageContent}/>
                })}
            </div>
           </>
}