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