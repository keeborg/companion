import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import Search from '@vkontakte/vkui/dist/components/Search/Search'
import List from '@vkontakte/vkui/dist/components/List/List'
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar'
import { useState, useEffect } from "react"
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner"
import EventListItem from './EventListItem'
import InfoMessages from '../InfoMessages'

import '../css/main.css'
import {useAllEvents, useSearchedEvents} from '../../Helpers/Events/EventServerHooks'

const AllEvents = function ({ id, go, fetchedUser }) {
	const [popout, setPopout] = useState(<ScreenSpinner className="preloader" size="large" />)
	const [events, setEvents] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [pageNumber, setPageNumber] = useState(1)

	useAllEvents(setEvents, setPopout) // get first new events

	useSearchedEvents(setEvents, setPopout, searchQuery, pageNumber)

	const handleSearch = (searchQuery) => {
		setSearchQuery(searchQuery)
		setPageNumber(1)
	}

	useEffect(() => {

	}, [searchQuery, pageNumber])

	const getFound = () => {
		const searchText = searchQuery.toLowerCase()
		//console.log(events)
		return events.filter( ({ title }) =>  title.toLowerCase().indexOf(searchText) > -1 )
	}

	return(
		<Panel id={id}>
			<PanelHeader>События рядом с вами</PanelHeader>
			<FixedLayout vertical="top">
				<Search onChange={handleSearch} />
			</FixedLayout>
			{popout}
			{
				events &&
				<List id="event-list">
					{
					getFound().length > 0  ? 
						getFound().map((event, i) => <EventListItem key={event.id} id={event.id} title={event.title} />)
					:
						<InfoMessages type="no-events" />
					}
				</List>
			}
			{
				fetchedUser &&
				<Group id="user-block">
					<Cell
						before={fetchedUser.photo_100 ? <Avatar src={fetchedUser.photo_200}/> : null}
						description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
					>
						{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
					</Cell>
				</Group>
			}

			<Group title="Navigation Example">
				<Div>
					<Button size="xl" level="2" onClick={go} data-to="persik">
						Show me the Persik, please
					</Button>
				</Div>
			</Group>
		</Panel>
	)
}

AllEvents.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_100: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
}

export default AllEvents
