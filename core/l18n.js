import React from 'react';
import { Alert } from 'antd';
const l18n = {};

l18n.getErrMsg=(event, code)=> {
  if (l18n.error[event] && l18n.error[event][-code]) {
    return l18n.error[event][-code]
  }
  return event;
};

l18n.getErrAlert=(e)=> {
  console.log(e);
  return <Alert
    message={l18n.error.Error}
    description={l18n.getErrMsg(e.error, e.code)}
    type="error"
    showIcon
  />
};



l18n.error= {
  'Error': '错误提示',
  'UserLoginError': {
    1: '用户名或密码错误',

  },
  'UserRegisterError': {
    1: '注册超时',
    2: '邮箱已经存在',
    3: '用户已经存储'
  },

};

export default l18n;
