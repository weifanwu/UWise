import ReactDOM from "react-dom";
import { Checkbox } from "antd";
import { mountNode } from "antd";


const { createRoot } = ReactDOM;

// const {  Checkbox  } = antd;
const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};
const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
];
const optionsWithDisabled = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Pear',
    value: 'Pear',
  },
  {
    label: 'Orange',
    value: 'Orange',
    disabled: false,
  },
];
const App = () => (
  <>
    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
    <br />
    <br />
    <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
    <br />
    <br />
    <Checkbox.Group
      options={optionsWithDisabled}
      disabled
      defaultValue={['Apple']}
      onChange={onChange}
    />
  </>
);
const ComponentDemo = App;


createRoot(mountNode).render(<ComponentDemo />);
