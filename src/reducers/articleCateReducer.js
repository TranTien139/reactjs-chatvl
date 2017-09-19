export function articleCateReducer(state = { cates: [] }, action) {
    switch(action.type){
        case 'GET_CATE_ARTICLE':
            return {...state, cates:[...action.payload]};
            break;

        default:
            return state;
    }
    return state;
}