import React from "react";
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
    const majorOptions = majors.map((major) => ({
        label: major,
        value: major,
    }));

    const handleMajorChange = (value) => {
        onFilterChange(value, null);
    };

    const handleLevelChange = (value) => {
        onFilterChange(null, value);
    };

    // TODO: call onFilterChange after field credits added to data
    const handleCreditsChange = (value) => {
        // onFilterChange(value, null);
        return null;
    };

    // TODO: call onFilterChange after field type added to data
    const handleTypeChange = (value) => {
        // onFilterChange(null, value);
        return null;
    };

    return (
        <>
            <h5>专业</h5>
            <Cascader
                style={{ width: '100%' }}
                options={majorOptions}
                onChange={handleMajorChange}
                multiple
                maxTagCount="responsive"
                showCheckedStrategy={SHOW_CHILD}
            />
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
                onChange={handleCreditsChange} 
                style={{display: 'flex', flexDirection: 'column'}}
            />
            <h5>类型</h5>
            <Checkbox.Group 
                options={types} 
                defaultValue={[]} onChange={handleTypeChange} 
                style={{display: 'flex', flexDirection: 'column'}}
            />
        </>
    );
}
