import React from 'react';
import ReactDOM from 'react-dom';
import './test.less';

import {  Button } from 'antd';

const prefixCls='Test';

export default class test extends React.Component {
    render() {
        return (<div className={`${prefixCls}`}>
            <Button type="primary">测试按键</Button>
            <p>测试文字</p>
            <div className={`${prefixCls}-div`}></div>
        </div>);
    }
}
