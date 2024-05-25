import React, { useState } from "react";
import { Cascader, Checkbox } from "antd";

const { SHOW_CHILD } = Cascader;
const levels = [
    { label: '100', value: '100' },
    { label: '200', value: '200' },
    { label: '300', value: '300' },
    { label: '400', value: '400' },
    { label: '400+', value: '400+' },
];
const credits = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '5+', value: '5+' },
];
const types = [   
    { label: 'C', value: 'C' },
    { label: 'DIV', value: 'DIV' },
    { label: 'SSc', value: 'SSc' },
    { label: 'NSc', value: 'NSc' },
    { label: 'RSN', value: 'RSN' },
    { label: 'A&H', value: 'A&H' },
    { label: 'W', value: 'W' },
];

export default function Filter({ majors, onFilterChange }) {
    const [selected, setSelected] = useState([[], [], [], []]);

    const majorOptions = majors.map((major) => ({
        label: major,
        value: major,
    }));

    const handleMajorChange = (value) => {
        selected[0] = value;
        onFilterChange(selected[0], selected[1], selected[2], selected[3]);
    };

    const handleLevelChange = (value) => {
        selected[1] = value;
        onFilterChange(selected[0], selected[1], selected[2], selected[3]);
    };

    const handleCreditChange = (value) => {
        selected[2] = value;
        onFilterChange(selected[0], selected[1], selected[2], selected[3]);
    };

    const handleTypeChange = (value) => {
        selected[3] = value;
        onFilterChange(selected[0], selected[1], selected[2], selected[3]);
    };

    return (
        <>
            <br/>
            <h5>专业</h5>
            <Cascader
                style={{ width: '100%' }}
                options={majorOptions}
                onChange={handleMajorChange}
                multiple
                maxTagCount="responsive"
                showCheckedStrategy={SHOW_CHILD}
            />
            <br/>
            <br/>
            <h5>等级</h5>
            <Checkbox.Group 
                options={levels} 
                defaultValue={[]} 
                onChange={handleLevelChange} 
                style={{display: 'flex', flexDirection: 'column'}}
            />
            <br/>
            <h5>以下功能待完成，选中后无效果</h5>
            <h5>学分</h5>
            <Checkbox.Group 
                options={credits} 
                defaultValue={[]} 
                onChange={handleCreditChange} 
                style={{display: 'flex', flexDirection: 'column'}}
            />
            <br/>
            <h5>类型</h5>
            <Checkbox.Group 
                options={types} 
                defaultValue={[]} 
                onChange={handleTypeChange} 
                style={{display: 'flex', flexDirection: 'column'}}
            />
        </>
    );
}
