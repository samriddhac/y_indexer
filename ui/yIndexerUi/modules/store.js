import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(reducers);

/*store.subscribe(throttle(()=>{
	if(store.getState().contactState.myContact!==undefined &&
		store.getState().contactState.myContact!==null &&
		store.getState().contactState.myContact!=='') {
		saveState({
			contactState: {
				myContact:store.getState().contactState.myContact,
				subscribedTo:store.getState().contactState.subscribedTo,
				publishingTo:store.getState().contactState.publishingTo,
				selectedReceiver:store.getState().contactState.selectedReceiver
			}
		});
	}
}, 1000));*/

export default store;