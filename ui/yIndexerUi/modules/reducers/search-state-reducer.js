import {SEARCH_YOUTUBE, 
	START_DOWNLOAD,
	LOAD_DOWNLOAD,
	DELETE_DOWNLOAD,
	SET_READY_STATE,
	SET_CONTEXT} from '../actions/action-types';
import {STATUS_READY, STATUS_PENDING} from '../common/constants';
import _ from 'lodash';

const INITIAL_STATE = {
	context:1,
	search_results: [],
	saved_download: []
};
export default function (state=INITIAL_STATE, action) {
	let newState = {};
	switch(action.type) {
		case SEARCH_YOUTUBE:
			newState = { ...state, 
				search_results:getResult(action.payload, state.search_results),
				next_page_token:action.payload.data.nextPageToken,
				text:action.payload.text
			};
			return newState;
		case START_DOWNLOAD:
			newState = { ...state, 
				saved_download:setSavedDownload(action.payload.data,state.saved_download),
				search_results:setResultStatus(action.payload.data, 
					action.payload.data.status,state.search_results)
			};
			return newState;
		case LOAD_DOWNLOAD:
			newState = { ...state, 
				saved_download:[...action.payload.data]
			};
			return newState;
		case DELETE_DOWNLOAD:
			newState = { ...state, 
				saved_download:deleterecord(action.payload.data, state.saved_download),
				search_results:setResultStatus(action.payload.data, 
					'',state.search_results)
			};
			return newState;
		case SET_CONTEXT:
			newState = { ...state, 
				context:action.payload.data
			};
			return newState;
		case SET_READY_STATE:
			newState = { ...state, 
				saved_download:setResultStatusReady(action.payload.data,state.saved_download)};
			return newState;
		default:
			return state;
	}
}

function setSavedDownload(data, prevresult) {
	exists = false;
	let searchresult = [];
	if(prevresult && prevresult.length>0) {
		prevresult.forEach((item)=>{
			if(item.id === data.id){
				item.status = STATUS_PENDING;
				exists = true;
			}
		});
	}
	if(exists===false){
		prevresult=[data, ...prevresult];
	}
	searchresult = [...prevresult];
	return searchresult;
}

function getResult(payload, prevresult) {
	if(payload.token && payload.token !==undefined
		&& payload.token!==null){
		return [ ...prevresult,...payload.data.items]
	}
	else {
		return [...payload.data.items]
	}
}

function setResultStatus(id,status,prevresult){
	let searchresult = [];
	if(prevresult && prevresult.length>0) {
		prevresult.forEach((item)=>{
			if(item.id === id){
				item.status = status;
			}
		});
	}
	searchresult = [...prevresult]
	return searchresult;
}

function setResultStatusReady(data, prevresult){
	let searchresult = [];
	if(prevresult && prevresult.length>0) {
		prevresult.forEach((item)=>{
			if(data[item.id] && data[item.id] === true){
				item.status = status;
			}
		});
	}
	searchresult = [...prevresult]
	return searchresult;
}

function deleterecord(id, prevresult) {
	let result = [];
	_.remove(prevresult, {id:id});
	result = [...prevresult]
	return result;
}