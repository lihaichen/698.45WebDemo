import React from 'react';
import "./index.less";

const prefixCls='Page1';

export default class Page1 extends React.Component {
    render() {
        return (<div className={`${prefixCls}`}>
            <h1>页面1</h1>
            <p>测试文字</p>
            <div className={`${prefixCls}-div`}></div>
        </div>);
    }
}