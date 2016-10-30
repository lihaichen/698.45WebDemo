import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import Home from './home/index';
import Page1 from './page1/index';

const Routes = ({ history }) =>
<Router history={history}>
    <Route path="/" component={Home}/>
    <Route path="/Page1" component={Page1}/>
    </Router>;

Routes.propTypes = {
    history: PropTypes.any,
};

export default Routes;
