export function articleReducers(state = { news: [] }, action) {
        switch(action.type){
            case 'GET_NEW_ARTICLE':
                 return {...state, news:[...action.payload]};
                break;

            default:
                return state;
        }
        return state;
}