import {GET_TEXT} from '../actions/action-types';


const INITIAL_STATE = {
	metadata:{},
	text:{}
};
export default function (state=INITIAL_STATE, action) {
	let newState = {};
	switch(action.type) {
		case GET_TEXT:
			newState = { ...state, 
				metadata:action.payload.metadata,
				text:action.payload.text
			};
			return newState;
		default:
			return state;
	}
}