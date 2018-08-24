import { combineReducers } from 'redux';
import ViewStateReducer from './view-state-reducer';
import SearchStateReducer from './search-state-reducer';


const rootReducer = combineReducers({
	viewState: ViewStateReducer,
	searchState: SearchStateReducer
});

export default rootReducer;