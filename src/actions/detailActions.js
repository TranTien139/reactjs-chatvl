import axios from 'axios';

export function getDetailArticle(id) {
    return function (dispatch) {
        axios.get('/api/detail/'+id).then(function (response) {
            dispatch({type:'GET_ARTICLE_DETAIL', payload: response.data});
        }).catch(function (err) {
            dispatch({type:'GET_DETAIL_REJECT', payload: err});
        })
    }
}