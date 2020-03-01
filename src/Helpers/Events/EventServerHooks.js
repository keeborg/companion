import { useState, useEffect } from 'react'
import axios from 'axios'


function useAllEvents(setEvents, setPopout) {
    useEffect(() => {
        axios.get("https://companionapp.ru/events")
            .then(
                (response) => {
                    setEvents(response.data)
                    setPopout(null)
                },
                (error) => {
                    console.log('Error while getting events: ' + error)
                }
            )
    }, [])

    return null
}

function useSearchedEvents(setEvents, setPopout, searchQuery, pageNumber) {
    useEffect(() => {
        axios({
            method: 'GET',
            url: "https://companionapp.ru/events",
            params: {q: searchQuery, page: pageNumber}
        })
        .then(
            (response) => {
                setEvents(response.data)
                setPopout(null)
            },
            (error) => {
                console.log('Error while getting events: ' + error)
            }
        )
    }, [searchQuery, pageNumber])

    return null
}

export { useAllEvents, useSearchedEvents }