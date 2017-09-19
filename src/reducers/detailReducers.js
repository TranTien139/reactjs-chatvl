export function detailReducers(state = { details: [] }, action) {
    switch(action.type){
        case 'GET_ARTICLE_DETAIL':
            return {...state, details: action.payload};
            break;
        default:
            return state;
    }
    return state;
}