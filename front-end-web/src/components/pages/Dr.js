import React, { useEffect, useState } from "react";
import { WelcomeBoard } from "./Wb";

export function Dr() {
    const [data, setdata] = useState([])
    useEffect(() => {
        const host = process.env.REACT_APP_BACKEND_HOST;
        fetch(host + '/dr/getDR')
            .then(response => response.json())
            .then(data => setdata(data))
            .catch(error => console.error(error));
    }, []);
    const [priority1, setpriority1] = useState([])
    const [priority2, setpriority2] = useState([])
    useEffect(() => {
        setpriority1(data.filter(item => item.Priority == "1"))
        setpriority2(data.filter(item => item.Priority == "2"))
    }, [data])
    return (
        <div id="Dr">
            <div style={{ paddingBottom: "50px" }}></div>
            <WelcomeBoard priority1={priority1} priority2={priority2} />
        </div>
    )
}