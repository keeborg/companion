const initialState = {
    events: [],
    lastEventTimestamp: '0000-01-01 00:00:00'
};

const eventsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_EVENTS':
            return { ...state, events: [...state.events, ...action.payload] };
        case 'CLEAR_EVENTS':
            return { ...state, events: [] };
        default:
            return state;
    }
}

export default eventsReducer;