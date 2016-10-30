import {store,dispatcher} from '../../core/index';
import REMOTE_MESSAGE_TYPE from './remoteMessageType';
import LOCAL_EVENT from './reduxType';
import {RequestSerialPortList} from './actions';

dispatcher.on(REMOTE_MESSAGE_TYPE.WEBSOCKET_OPEN,(event)=>{
  let data = {event:event};
  store.dispatch({type:LOCAL_EVENT.WEBSOCKET_OPEN,data});
  RequestSerialPortList();
});

dispatcher.on(REMOTE_MESSAGE_TYPE.WEBSOCKET_CLOSE,(event)=>{
  let data = {event:event};
  store.dispatch({type:LOCAL_EVENT.WEBSOCKET_CLOSE,data});
  store.dispatch({type:LOCAL_EVENT.SERIAL_PORT_DEFAULT,data:{}});
});

dispatcher.on(REMOTE_MESSAGE_TYPE.WEBSOCKET_ERROR,(event)=>{
  let data = {event:event};
  store.dispatch({type:LOCAL_EVENT.WEBSOCKET_ERROR,data});
});

