import {CHANGE_VIEW,
		SEARCH_YOUTUBE} from './action-types';
import axios from 'axios';
import {API_SERVER} from '../common/constants';

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
				payload:{token:token, data:{}}
			});
		});
	}
}