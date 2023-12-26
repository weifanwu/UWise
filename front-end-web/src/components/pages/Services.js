import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import OldCards from '../OldCards';
import { Space } from 'antd';


export default function Services(props) {
  return <>
            <div className='classes'>
              <Space direction='vertical' align='start'>
                <Cards update={props.update}/>
                <OldCards update={props.update}/>
              </Space>
            </div>
         </>
}
