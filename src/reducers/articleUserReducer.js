export function articleUserReducer(state = { users: [] }, action) {
    switch(action.type){
        case 'GET_USER_ARTICLE':
            return {...state, users:[...action.payload]};
            break;

        default:
            return state;
    }
    return state;
}