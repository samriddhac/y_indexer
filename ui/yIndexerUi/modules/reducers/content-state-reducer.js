import {GET_TEXT, SET_CONTENT_STATUS} from '../actions/action-types';
import {STATUS_READY} from '../common/constants';

const INITIAL_STATE = {
	metadata:{},
	text:{}
};
export default function (state=INITIAL_STATE, action) {
	let newState = {};
	switch(action.type) {
		case GET_TEXT:
			newState = { ...state, 
				metadata:getMetadata(action.payload.metadata,action.payload.text),
				text:action.payload.text
			};
			return newState;
		case SET_CONTENT_STATUS:
			newState = { ...state, 
				metadata:{...state.metadata, status:action.payload.data}
			};
			return newState;
		default:
			return state;
	}
}

function getMetadata(metadata, text) {
	if(text.raw) {
		metadata.status = STATUS_READY
	}
	return metadata;
}