import {combineReducers} from "redux";

//here import reducers to be combined
import {articleReducers} from "./articleReducers.js";
import {detailReducers} from "./detailReducers.js";
import {articleCateReducer} from "./articleCateReducer.js";
import {articleUserReducer} from "./articleUserReducer.js";
import authReducer from './auth_reducer.js';
import {topUserWeek} from './topUserWeek.js';
import { reducer as formReducer } from 'redux-form';

//here combine the reducers
export default combineReducers({
    news : articleReducers,
    cates : articleCateReducer,
    users : articleUserReducer,
    details :detailReducers,
    auth: authReducer,
    topweek:topUserWeek,
    form: formReducer
});