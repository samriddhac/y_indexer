import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import reducers from './reducers/index';
import {saveState} from './common/utils';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducers);

store.subscribe(throttle(()=>{
	saveState({
		searchState: {
			saved_download:store.getState().searchState.saved_download
		}
	});
}, 1000));

export default store;