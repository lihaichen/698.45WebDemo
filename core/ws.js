
import REMOTE_MESSAGE_TYPE from '../controllers/home/remoteMessageType';

export default class WS {

  constructor(dispatcher,store) {
    this.Dispatcher = dispatcher;
    this.store = store;
  }
  link(url) {

    this.ws = new WebSocket(url);

    this.ws.onopen = (evt)=> {

      this.Dispatcher.emit(REMOTE_MESSAGE_TYPE.WEBSOCKET_OPEN, evt);
    };

    this.ws.onclose = (evt)=> {
      this.Dispatcher.emit(REMOTE_MESSAGE_TYPE.WEBSOCKET_CLOSE, evt);
    };

    this.ws.onmessage = (evt)=> {
      const msg = JSON.parse(evt.data);
      this.Dispatcher.emit(msg.event, msg);
    };

    this.ws.onerror = (evt)=> {
      this.emit(REMOTE_MESSAGE_TYPE.WEBSOCKET_ERROR, evt);
    };
  }
  close(){
    this.ws.close();
  }

  on(event, self, callback) {
    this.Dispatcher.on(event, callback, self);
  }

  remove(event, self, callback) {
    this.Dispatcher.removeListener(event, callback, self);
  }

  emit(action) {
    this.ws.send(JSON.stringify(action));
  }

  error(action){
    if (this.Dispatcher)
      this.Dispatcher.emit(action.error, action);
  }

}
