/**
 * Created by Tien on 8/28/2017.
 */

import axios from 'axios';

function getArticleNew(page) {
    return function (dispatch) {
        axios.get('/api/new?page='+page).then(function (response) {
            dispatch({type:'GET_NEW_ARTICLE', payload: response.data});
        }).catch(function (err) {
            dispatch({type:'GET_NEW_REJECT', payload: err});
        })
    }
}

function getArticleCate(cate,page) {
    return function (dispatch) {
        axios.get('/api/cate/'+cate+'?page='+page).then(function (response) {
            dispatch({type:'GET_CATE_ARTICLE', payload: response.data});
        }).catch(function (err) {
            dispatch({type:'GET_CATE_REJECT', payload: err});
        })
    }
}

function getArticleUser(userslug,page) {
    return function (dispatch) {
        axios.get('/api/userpost/'+userslug+'?page='+page).then(function (response) {
            dispatch({type:'GET_USER_ARTICLE', payload: response.data});
        }).catch(function (err) {
            dispatch({type:'GET_USER_REJECT', payload: err});
        })
    }
}

function getTopUserWeek() {
    return function (dispatch) {
        axios.get('/api/get-top-user-week').then(function (response) {
            dispatch({type:'GET_TOPUSER_ARTICLE', payload: response.data});
        }).catch(function (err) {
            dispatch({type:'GET_TOPUSER_REJECT', payload: err});
        })
    }
}

module.exports.getArticleNew = getArticleNew;
module.exports.getArticleCate = getArticleCate;
module.exports.getArticleUser = getArticleUser;
module.exports.getTopUserWeek = getTopUserWeek;