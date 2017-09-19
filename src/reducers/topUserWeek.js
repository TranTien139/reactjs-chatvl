export function topUserWeek(state = { topweek: [] }, action) {
    switch(action.type){
        case 'GET_TOPUSER_ARTICLE':
            return {...state, topweek:[...action.payload]};
            break;
        case 'GET_TOPUSER_REJECT':
            return {...state};
            break;
        default:
            return state;
    }
    return state;
}