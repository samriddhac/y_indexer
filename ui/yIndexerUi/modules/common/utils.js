import { AsyncStorage } from 'react-native';
import { STATE } from './constants';

export const saveState = async (state) => {
	try {
		const serializedState = JSON.stringify(state);
		await AsyncStorage.setItem(STATE, serializedState);
	}
	catch(err) {
		console.error(err);
	}
}

export const filterByStatus = (list,status) => {
	let results = [];
	if(list!==undefined && list!==null & list.length>0) {
		list.forEach((item)=>{
			if(item.status === status) {
				results.push(item.id);
			}
		});
	}
	return results;
}

export const listToString = (list) => {
	let results = '';
	if(list!==undefined && list!==null & list.length>0) {
		results = list.join();
	}
	return results;
}