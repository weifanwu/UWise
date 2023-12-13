import { React, useEffect, useState, useRef } from "react";


export default function Content(props) {
    const elementRef = useRef();
    const [data, setData] = useState([]);
    const url = "http://localhost:4567/resources?resource=" + props.title;
    useEffect(() => {
        getData();
      }, []);
    

    async function getData() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const content = await response.json();
                setData(content);
            } else {
                console.log("Response is not okay");
            }
        } catch(e) {
            console.log(e);
        }
    }

    const go = () => {
        const element = document.getElementById("good");
        element.scrollIntoView({ behavior: 'smooth' });
    }
    
    return <>
             <div className="section">
                <h1>{props.title}</h1>
                <div className="contents">
                    {data.map((one) => {
                        return <div className="resource">
                                    <p><a href={one.link} target="_blank">{one.name}</a></p>
                                    <p>wonderful student!</p>
                                </div>
                        })}
                </div>
            </div>
    </>
}