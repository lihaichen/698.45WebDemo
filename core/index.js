import WS from './ws';
import AppDispatcher from './appDispatcher';
import Helper from './helper';
import l18n from './l18n';
import Reducers from '../controllers/Index';
import { createStore } from 'redux'
import Conf from './conf';

let store = createStore(Reducers);
store.subscribe(() => console.log('redux状态',store.getState()));

let Dispatcher = new AppDispatcher();
const ws = new WS(Dispatcher,store);
//ws.link(Conf.wsUrl);


export default {
  conf: Conf,
  helper: Helper,
  dispatcher: Dispatcher,
  l18n: l18n,
  store: store,
  ws:ws
};
