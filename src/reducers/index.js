import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import userReducer from './userReducer';
import fileReducer from './fileReducer';
import uploadReducer from './UploadReducer';
import AppReducer from './AppReducer';

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    loader: AppReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));