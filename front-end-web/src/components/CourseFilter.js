import ReactDOM from "react-dom";
import { Checkbox } from "antd";

const { createRoot } = ReactDOM;

const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};

// const options = [
//   {
//     label: 'Apple',
//     value: 'Apple',
//   },
//   {
//     label: 'Pear',
//     value: 'Pear',
//   },
//   {
//     label: 'Orange',
//     value: 'Orange',
//   },
// ];
// const optionsWithDisabled = [
//   {
//     label: 'Apple',
//     value: 'Apple',
//   },
//   {
//     label: 'Pear',
//     value: 'Pear',
//   },
//   {
//     label: 'Orange',
//     value: 'Orange',
//     disabled: false,
//   },
// ];

export default function Filter(props) {
  const majors = props.majors
  const levels = ['100', '200', '300', '400', '400+'];

  return (
    <>
      <h3>专业</h3>
      <Checkbox.Group 
        options={majors} 
        defaultValue={['major']} 
        onChange={onChange} 
        style={{display: 'flex', flexDirection: 'column'}}
      />
      <br />
      <br />
      <h3>等级</h3>
      <Checkbox.Group 
        options={levels} 
        defaultValue={['major']} 
        onChange={onChange} 
        style={{display: 'flex', flexDirection: 'column'}}
      />
      <br />
      <br />
      <h3>其他（待完成）</h3>
      {/* <Checkbox.Group
        options={optionsWithDisabled}
        disabled
        defaultValue={['Apple']}
        onChange={onChange}
      /> */}
    </>
  )
};
