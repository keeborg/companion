import React from 'react';
import axios from 'axios';
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import { useState, useEffect } from "react";
import { setEvents as setEventsAction, clearEvents } from '../../../actions/eventsActions';
import { useDispatch, useSelector } from 'react-redux'


const useFetchEvents = (pageNumber, searchQuery, setLoading) => {
    const dispatch = useDispatch();

    const events = useSelector(state => state.events.items);

    useEffect(() => {
        dispatch(clearEvents());
    }, [searchQuery]);

    useEffect(() => {
        let ajaxRequest;
        let cancel;
        let url = 'https://companionapp.ru/events';

        setLoading(<ScreenSpinner className="preloader" size="large" />);

        if (searchQuery === '' || searchQuery === undefined) {
            url += '?page=' + pageNumber
            axios.get(url).then(
                (response) => {
                    dispatch(setEventsAction([...response.data.data]));
                    setLoading(null);
                },
                (error) => {
                    setLoading(null);
                    console.log('Error while getting events: ' + error);
                }
            );
        } else {
            url += '/' + searchQuery + '?page=' + pageNumber;
            ajaxRequest = setTimeout(async () => {
                await axios({
                    method: 'GET',
                    url: url,
                    cancelToken: new axios.CancelToken(c => cancel = c)
                }).then(
                    (response) => {
                        if (Array.isArray(response.data.data)) {
                            dispatch(setEventsAction([...response.data.data]));
                        } else {
                            dispatch(clearEvents());
                        }
                        setLoading(null);
                    },
                    (error) => {
                        setLoading(null);
                        if (axios.isCancel(error)) return;
                        console.log('Error while getting events: ' + error);
                    }
                )
            }, 600);
        }
        return () => {
            cancel && cancel();
            clearTimeout(ajaxRequest);
        }

    }, [pageNumber, searchQuery]);
    
    return { events };
}

export { useFetchEvents };