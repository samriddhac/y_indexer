import {SEARCH_YOUTUBE} from '../actions/action-types';

const INITIAL_STATE = {
	search_results: []
};
export default function (state=INITIAL_STATE, action) {
	switch(action.type) {
		case SEARCH_YOUTUBE:
			let newState = { ...state, search_results:getResult(action.payload, state.search_results)};
			return newState;
		default:
			return state;
	}
}

function getResult(payload, prevresult) {
	if(payload.token && payload.token !==undefined
		&& payload.token!==null){
		return [...payload.data.items, ...prevresult]
	}
	else {
		return [...payload.data.items]
	}
}