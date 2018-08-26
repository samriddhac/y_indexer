import { combineReducers } from 'redux';
import ViewStateReducer from './view-state-reducer';
import SearchStateReducer from './search-state-reducer';
import ContentStateReducer from './content-state-reducer';


const rootReducer = combineReducers({
	viewState: ViewStateReducer,
	searchState: SearchStateReducer,
	contentState: ContentStateReducer
});

export default rootReducer;