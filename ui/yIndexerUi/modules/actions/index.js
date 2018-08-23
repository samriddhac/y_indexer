import {CHANGE_VIEW} from './action-types';

export function changeView(value) {
	return {
		type:CHANGE_VIEW,
		payload: value
	};
}