import React, { useEffect, useState } from "react";
import "./ViewCard.css";
import ViewCard from './ViewCard';
import '../Button.css';


export default function Major(props) {
    const [majors, setMajors] = useState([]);

    const handle = (text) => {
        fetch('https://uwise-back-end.herokuapp.com/newStudent/major?resource=' + text)
          .then(response => response.json())
          .then(data => {
            setMajors(data);
          })
          .catch(error => {
            console.error(error);
          });
      };

    useEffect(() => {
        handle(props.major);
    });

    return <>
        <div className="allContent">
            {(majors.map((major) => {
                return <>
                            <ViewCard
                                class="circle"
                                image={major["image"]}
                                title={major["title"]}
                                content={major["content"]}
                                link={major["link"]}
                                hover={() => {
                                    console.log("Nothing");
                                } }
                                click={() => {
                                    console.log("Nothing");
                                }} />
                        </>;
            }))}
        </div>
        <button className="back" onClick={() => {
            props.click();
        }}>Back</button>
    </>
}