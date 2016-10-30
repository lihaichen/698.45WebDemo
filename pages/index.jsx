import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import Routes from './routes';
import { Provider } from 'react-redux';
import {store} from '../core/index';

import './index.less';

ReactDOM.render(

    <Provider store={store}>
        <Routes history={browserHistory} />
    </Provider>,
    document.getElementById('root'));


