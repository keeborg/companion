import React from 'react'
import axios from 'axios'
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner"
import { useState, useEffect } from "react"


const useEvents = (pageNumber, searchQuery, setLoading) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        setEvents([])
    }, [searchQuery])

    useEffect(() => {
        let ajaxRequest
        let cancel
        let url = 'https://companionapp.ru/events'

        setLoading(<ScreenSpinner className="preloader" size="large" />)

        if (searchQuery === '' || searchQuery === undefined) {
            url += '?page=' + pageNumber
            axios.get(url).then(
                (response) => {
                    setEvents(prevEvents => {
                        return [...prevEvents, ...response.data.data]
                    })
                    setLoading(null)
                },
                (error) => {
                    setLoading(null)
                    console.log('Error while getting events: ' + error)
                }
            )
        } else {
            url += '/' + searchQuery + '?page=' + pageNumber
            ajaxRequest = setTimeout(async () => {
                await axios({
                    method: 'GET',
                    url: url,
                    cancelToken: new axios.CancelToken(c => cancel = c)
                }).then(
                    (response) => {
                        if (Array.isArray(response.data.data)) {
                            setEvents(prevEvents => {
                                return [...prevEvents, ...response.data.data]
                            })
                        } else {
                            setEvents([])
                        }
                        setLoading(null)
                    },
                    (error) => {
                        setLoading(null)
                        if (axios.isCancel(error)) return
                        console.log('Error while getting events: ' + error)
                    }
                )
            }, 600)
        }

        return () => {
            cancel && cancel()
            clearTimeout(ajaxRequest)
        }

    }, [pageNumber, searchQuery])

    return { events }
}

export { useEvents}