import Raptor from '../../core/index';
import REQUEST_STATE from '../common/requsetState';
import REMOTE_MESSAGE_TYPE from './remoteMessageType';

import './handleMesssage';//必须引用,为了执行文件中的程序。

import LOCAL_EVENT from './reduxType';

export function BuildWebSocket(url = ''){
  Raptor.ws.link(url);
  Raptor.store.dispatch({type:LOCAL_EVENT.WEBSOCKET_BUILD,data:{url:url}});
}

export function CloseWebSocket() {
  Raptor.ws.close();
  Raptor.store.dispatch({type:LOCAL_EVENT.WEBSOCKET_BUILD,data:{}});
}

export function TestRedux() {
  let date = new Date();
  let strTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " +
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  Raptor.store.dispatch({type:LOCAL_EVENT.TEST_REDUX,data:{value:strTime}});
}


