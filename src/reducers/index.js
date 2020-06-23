import events from './eventsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    events
});

export default rootReducer;