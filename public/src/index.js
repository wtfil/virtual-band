import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import App from './containers/App';

import * as reducers from './reducers';
import audio from './audio';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const combined = combineReducers(reducers);
const store = createStoreWithMiddleware(combined);

audio.listenTo(store);

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector('.app')
);
