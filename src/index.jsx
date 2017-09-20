import React, {Component} from 'react';
import {render} from 'react-dom';
// Import routing components
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Main from './common/main.component.jsx';
import Home from './common/home.component.jsx';
import NotFoundPage from './common/NotFoundPage.jsx';

import ArticleDetail from './article/article-detail.component.jsx';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers/index';
import Upload from './common/upload.jsx';
import Register from './auth/register.jsx';
import Login from './auth/login.jsx';
import  Category from './Article/Category.jsx';
import  UserPost from './Article/UserPost.jsx';
import  Search from './Article/Search.jsx';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import { AUTH_USER } from './actions/typesActions.js';

import cookie from 'react-cookies';
const token = cookie.load('token');

if (token) {
    store.dispatch({ type: AUTH_USER, payload: token.user});
}

function loggedIn() {
    if (token) {
        return true;
    }else {
        return false;
    }
}

function requireAuth(nextState, replace) {
    if (!loggedIn()) {
        replace({
            pathname: '/login'
        })
    }
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={Main}>
                <Route path="/" component={Home} />
                <Route path="/chi-tiet/:id" component={ArticleDetail} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/upload" component={Upload} onEnter={requireAuth} />
                <Route path="/chuyen-muc/:slug" component={ Category } />
                <Route path="/user/:slug" component={ UserPost } />
                <Route path="/tim-kiem" component={ Search } />
                <Route path="*" component={NotFoundPage} />
            </Route>
        </Router>
    </Provider> ,
    document.getElementById('root')
);