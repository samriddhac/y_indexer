import {CHANGE_VIEW,
		SEARCH_YOUTUBE,
		START_DOWNLOAD,
		LOAD_DOWNLOAD,
		DELETE_DOWNLOAD,
		SET_CONTEXT} from './action-types';
import axios from 'axios';
import {API_SERVER, STATE} from '../common/constants';
import {AsyncStorage} from 'react-native';

export function changeView(value) {
	return {
		type:CHANGE_VIEW,
		payload: value
	};
}

export function search(value, token) {
	let url = API_SERVER+'/search/videos?'+'text='+value+'&max_result='+20
	if(token) {
		url = url + '&page_token='+token
	}
	request = axios.get(url);
		return (dispatch) => {
			request.then((response) => {
				dispatch({
					type:SEARCH_YOUTUBE,
					payload:{token:token, data:response.data.data}
				});
			}).catch(function(err) {
			    console.log('error ',err);
			    dispatch({
					type:SEARCH_YOUTUBE,
					payload:{token:token, text:value, data:{}}
				});
			});
		}
}

export function download(value, token) {
	let url = API_SERVER+'/process/videos?'+'id='+value.id;
	request = axios.get(url);
	return (dispatch) => {
		request.then((response) => {
			dispatch({
				type:START_DOWNLOAD,
				payload:{data:value}
			});
		}).catch(function(err) {
		    console.log('error ',err);
		});
	}
}

export function loaddownload(){
	return (dispatch) => {
		AsyncStorage.getItem(STATE).then((result)=>{
		 let data = JSON.parse(result);
		 let returnObject = {
		 	type:LOAD_DOWNLOAD,
			payload:{data:[]}
		 }
		 if(data!==undefined && data!==null) {
		 	if(data.searchState!==undefined && 
			 	data.searchState!==null && 
			 	data.searchState.saved_download!==undefined && 
			 	data.searchState.saved_download!==null && 
			 	data.searchState.saved_download.length>0) {
			 		returnObject ={
						type:LOAD_DOWNLOAD,
						payload:{data:data.searchState.saved_download}
					};
			}
		 }
		 dispatch(returnObject);
		}).catch(function(err) {
		    console.log('error ',err);
		});
	}
}

export function deletedownload(value) {
	return {
		type:DELETE_DOWNLOAD,
		payload:{data:value}
	};
}

export function setcontext(value) {
	return {
		type:SET_CONTEXT,
		payload:{data:value}
	};
}
