export const setEvents = (events) => {
    return {
        type: 'SET_EVENTS',
        payload: events
    };
};

export const clearEvents = () => {
    return {
        type: 'CLEAR_EVENTS'
    };
};

export const addEvent = (event) => {
    return {
        type: 'ADD_EVENT',
        payload: event
    };
};