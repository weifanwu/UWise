import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "./ResourceMap.css";
import ViewCard from "./ViewCard";
import Checkbox from "../CheckBox";
import L from "leaflet";
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/system';



export default function ResourceMap(props) {
    const beginning = {"name" : "University of Washington", "x": 47.65440627742146, "y": -122.30476957834502, "pop": "这里是华盛顿大学！"};
    const [type, setType] = useState(["饭店"]);
    const [locations, setLocations] = useState([]);
    const [marker, setMarker] = useState(beginning);
    const icon = L.icon({
        iconUrl: 'images/location-pin.png',
        iconSize: [32, 32], // Set the size of the icon
        iconAnchor: [16, 32], // Set the anchor point of the icon
    })

    const handleChange = async (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setType(prevType => [...prevType, name]);
        } else {
            setType(prevType => prevType.filter(item => item !== name));
        }
    };

    useEffect(
        ()=> {
            fetchData();
        }, [type]
    );

    async function fetchData() {
        try {
            const types = type.join(",");
            const response = await fetch("https://uwise-back-end.herokuapp.com/findLocation?types=" + types);
            if (response.ok) {
                const data = await response.json();
                setLocations(data);
            } else {
                throw new Error('Response not okay');
            }
            } catch (error) {
            }
      }
      

    return<>
        <div>
            <h2>Filter:</h2>
            <div className="boxs">
                <Checkbox id="1" name="饭店" title="饭店" defaultChecked={true} handleChange={handleChange}/>
                <Checkbox id="2" name="超市" title="超市" defaultChecked={false} handleChange={handleChange}/>
                <Checkbox id="3" name="药店" title="药店" defaultChecked={false} handleChange={handleChange}/>
                <Checkbox id="4" name="娱乐" title="娱乐" defaultChecked={false} handleChange={handleChange}/>
                <Checkbox id="5" name="食堂" title="食堂" defaultChecked={false} handleChange={handleChange}/>
                <Checkbox id="6" name="购物中心" title="购物中心" defaultChecked={false} handleChange={handleChange}/>
                <Checkbox id="7" name="爬山" title="爬山" defaultChecked={false} handleChange={handleChange}/>
            </div>
        </div>
        <div className="huskymap">
            <div className="locations">
                    {locations.map((location) => {
                        return <ViewCard link="https://mp.weixin.qq.com/s/csniL6IfoQkpsiT7usUGGA" class="location" image="https://s2.loli.net/2023/06/17/4LdVCuzJvwqG9Sj.jpg" title={location.name} content={location.description} click={() => {console.log("Nothing")}} hover={
                            () => {
                                setMarker({"x": location.x, "y": location.y, "name": location.name, "description": location.description, "pop": location.pop});
                            }
                        }/>
                    })}
            </div>
            <div className="map">
                <MapContainer  style={{ height: "70vh", width: "93vh"}} center={[47.65440627742146, -122.30476957834502]} zoom={14} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[marker.x, marker.y]} icon={icon}>
                        <Popup>
                        {marker.name}<br /> {marker.pop}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
      </>
}