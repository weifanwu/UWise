import { Cascader } from "antd";
import { Checkbox } from "antd";

const { SHOW_CHILD } = Cascader;
const levels = [
    {
        label: '100',
        value: '100',
    },
    {
        label: '200',
        value: '200',
    },
    {
        label: '300',
        value: '300',
    },
    {
        label: '400',
        value: '400',
    },
    {
        label: '400+',
        value: '400+',
    },
];
const credits = [
    {
        label: '1',
        value: '1',
    },
    {
        label: '2',
        value: '2',
    },
    {
        label: '3',
        value: '3',
    },
    {
        label: '4',
        value: '4',
    },
    {
        label: '5',
        value: '5',
    },
    {
        label: '5+',
        value: '5+',
    },
]
const types = [   
    {
        label: 'C',
        value: 'C',
    },
    {
        label: 'DIV',
        value: 'DIV',
    },
    {
        label: 'SSc',
        value: 'SSc',
    },
    {
        label: 'NSc',
        value: 'NSc',
    },
    {
        label: 'RSN',
        value: 'RSN',
    },
    {
        label: 'A&H',
        value: 'A&H',
    },
    {
        label: 'W',
        value: 'W',
    },
];

export default function Filter(props) {
    const majors = props.majors.map((major) => ({
        label: major,
        value: major,
    }))
    const onChange = (value) => {
        console.log(value);
    };
    return (
        <>
            <h5>专业</h5>
            <Cascader
                style={{
                width: '100%',
                }}
                options={majors}
                onChange={onChange}
                multiple
                maxTagCount="responsive"
                showCheckedStrategy={SHOW_CHILD}
            />
            <h5>等级</h5>
            <Checkbox.Group 
                options={levels} 
                defaultValue={['major']} 
                onChange={onChange} 
                style={{display: 'flex', flexDirection: 'column'}}
            />
            <h5>学分（待完成）</h5>
            <Checkbox.Group 
                options={credits} 
                defaultValue={['major']} 
                onChange={onChange} 
                style={{display: 'flex', flexDirection: 'column'}}
            />
            <h5>类型（待完成）</h5>
            <Checkbox.Group 
                options={types} 
                defaultValue={['major']} 
                onChange={onChange} 
                style={{display: 'flex', flexDirection: 'column'}}
            />
        </>
    );
};
