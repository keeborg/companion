import React from 'react'
import axios from 'axios'
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner"

let ajaxRequest
let cancel

function getEvents(pageNumber, setEvents, setPopout) {
    setPopout(<ScreenSpinner className="preloader" size="large" />)
    let url = 'https://companionapp.ru/events?page='
    url = pageNumber ? url + pageNumber : url + '1'

    clearTimeout(ajaxRequest) // cancelling timeout & request from getSearchedEvents
    cancel && cancel()

    const request = async () => {
        await axios.get(url)
        .then(
            (response) => {
                setEvents(response.data.data)
                setPopout(null)
            },
            (error) => {
                setPopout(null)
                console.log('Error while getting events: ' + error)
            }
        )
    }

    request()

    return null
}

function getSearchedEvents(searchQuery, pageNumber, setEvents, setPopout) {
    setPopout(<ScreenSpinner className="preloader" size="large" />)
    let url = 'https://companionapp.ru/events/'
    url = searchQuery && pageNumber ? url + searchQuery + '?page=' + pageNumber : url

    clearTimeout(ajaxRequest)
    cancel && cancel()

    ajaxRequest = setTimeout(async () => {
        await axios({
            method: 'GET',
            url: url,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(
            (response) => {
                if (Array.isArray(response.data.data)) {
                    setEvents(response.data.data)
                } else {
                    setEvents([])
                }
                setPopout(null)
            },
            (error) => {
                setPopout(null)
                if (axios.isCancel(error)) return
                console.log('Error while getting events: ' + error)
            }
        )
    }, 600)


    return null
}

export { getEvents, getSearchedEvents }