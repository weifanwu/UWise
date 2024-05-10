import ReactDOM from "react-dom";
import { Checkbox } from "antd";

// const { createRoot } = ReactDOM;

export default function FilterContainer(props) {
// const {  AppstoreOutlined, MailOutlined, SettingOutlined  } = icons;
// const {  Menu  } = antd;
const items = [
   {
    key: 'grp',
    label: '专业',
    type: 'group',
    children: [
      {
        key: '13',
        label: 'Option 13',
      },
        // props.majors.map((major, index) => {
        //     key: major,
        //     label: 'major' + index
        // })
    ],
  },
   {
    key: 'grp',
    label: '等级',
    type: 'group',
    children: [
      {
        key: '100 level',
        label: '100',
      },
      {
        key: '200 level',
        label: '200',
      },
      {
        key: '300 level',
        label: '300',
      },
      {
        key: '400 level',
        label: '400',
      },
      {
        key: '400+ level',
        label: '400+',
      },
    ],
  },
  {
    key: 'grp',
    label: '学分（待完成）',
    type: 'group',
    children: [
      {
        key: '1 credit',
        label: '1',
      },
      {
        key: '2 credit',
        label: '2',
      },
      {
        key: '3 credit',
        label: '3',
      },
      {
        key: '4 credit',
        label: '4',
      },
      {
        key: '5 credit',
        label: '5',
      },
      {
        key: '5+ credit',
        label: '5+',
      },
    ],
  },
  {
    key: 'grp',
    label: '类型（待完成）',
    type: 'group',
    children: [
      {
        key: 'C',
        label: 'C',
      },
      {
        key: 'DIV',
        label: 'DIV',
      },
      {
        key: 'SSc',
        label: 'SSc',
      },
      {
        key: 'NSc',
        label: 'NSc',
      },
      {
        key: 'RSN',
        label: 'RSN',
      },
      {
        key: 'A&H',
        label: 'A&H',
      },
      {
        key: 'W',
        label: 'W',
      },
    ],
  },
  {
    key: 'grp',
    label: '难度（待完成）',
    type: 'group',
    children: [
            {
        key: '1 difficulty',
        label: '1',
      },
      {
        key: '2 difficulty',
        label: '2',
      },
      {
        key: '3 difficulty',
        label: '3',
      },
      {
        key: '4 difficulty',
        label: '4',
      },
      {
        key: '5 difficulty',
        label: '5',
      },
    ],
  },
];

//   const onClick = (e) => {
//     console.log('click ', e);
//   };
  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };
  return (
    <Checkbox.Group
        onChange={onChange} 
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
    // <Checkbox.Group 
    // options={majors} 
    // defaultValue={['major']} 
    // onChange={onChange} 
    // style={{display: 'flex', flexDirection: 'column'}}
    // />
  );
};
