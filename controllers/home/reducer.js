import LOCAL_EVENT from './reduxType';
import REQUEST_STATE from '../common/requsetState';

let initialWebsocketState={
    local:{
        webSocketState:REQUEST_STATE.REQUEST_INIT,
    },
    remote:{
    }
};

export function Websocket(state =  JSON.parse(JSON.stringify(initialWebsocketState)), action) {

  switch (action.type) {

    case LOCAL_EVENT.WEBSOCKET_BUILD:
      state.local.webSocketState = REQUEST_STATE.REQUEST_WAIT;
      return {
        ...state,
      };
      break;
    case LOCAL_EVENT.WEBSOCKET_TIMEOUT:
      state.local.webSocketState = REQUEST_STATE.REQUEST_TIMEOUT;
      return {
        ...state,
      };

    case LOCAL_EVENT.WEBSOCKET_OPEN:
      state.local.webSocketState = REQUEST_STATE.REQUEST_OK;
      return {
        ...state,
      };
      break;
    case LOCAL_EVENT.WEBSOCKET_CLOSE:
      state.local.webSocketState = REQUEST_STATE.REQUEST_INIT;
      return {
        ...state,
      };
      break;
    case LOCAL_EVENT.WEBSOCKET_ERROR:
      state.local.webSocketState = REQUEST_STATE.REQUEST_ERROR;
      return {
        ...state,
      };
      break;
    case LOCAL_EVENT.WEBSOCKET_MESSAGE:
      return {
        ...state,
      };
      break;
    default:
      return {
        ...state,
      };
  }
}





let initialTestReduxState={
  local:{
    value:''
  },
  remote:{
  }
};

export function TestRedux(state = initialTestReduxState, action) {

  switch (action.type) {

    case LOCAL_EVENT.TEST_REDUX:
      state.local.value = action.data.value;
      return {
        ...state,
      };
      break;
    default:
      return {
        ...state,
      };
      break;
  }
}
