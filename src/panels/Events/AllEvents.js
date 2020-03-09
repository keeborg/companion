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
import InfoMessages from '../../Helpers/InfoMessages'

import '../css/main.css'
import { getEvents, getSearchedEvents} from '../../Helpers/Events/EventServerHelper'

const AllEvents = function ({ id, go, fetchedUser }) {
	const [popout, setPopout] = useState(null)
	const [events, setEvents] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [pageNumber, setPageNumber] = useState(1)

	useEffect(() => {
		getEvents(pageNumber, setEvents, setPopout)
	}, [])

	useEffect(() => {
		if (searchQuery) {
			getSearchedEvents(searchQuery, pageNumber, setEvents, setPopout)
		} else {
			getEvents(pageNumber, setEvents, setPopout)
		}
	}, [searchQuery, pageNumber])

	// for ajax pagination
	const handleSearch = (searchQuery) => {
		setSearchQuery(searchQuery)
		setPageNumber(1)
	}

	return(
		<Panel id={id}>
			<PanelHeader>События рядом с вами</PanelHeader>
			<FixedLayout vertical="top">
				<Search onChange={handleSearch} />
			</FixedLayout>
			{popout}
			{
				<List id="event-list">
					{
						events.length > 0
					?
						events.map((event, i) => <EventListItem key={event.id} id={event.id} title={event.title} />)
					:
							<Div className="TODO info message"></Div>

					}
				</List>
			}
			{/*{*/}
			{/*	fetchedUser &&*/}
			{/*	<Group id="user-block">*/}
			{/*		<Cell*/}
			{/*			before={fetchedUser.photo_100 ? <Avatar src={fetchedUser.photo_200}/> : null}*/}
			{/*			description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}*/}
			{/*		>*/}
			{/*			{`${fetchedUser.first_name} ${fetchedUser.last_name}`}*/}
			{/*		</Cell>*/}
			{/*	</Group>*/}
			{/*}*/}

			{/*<Group title="Navigation Example">*/}
			{/*	<Div>*/}
			{/*		<Button size="xl" level="2" onClick={go} data-to="persik">*/}
			{/*			Show me the Persik, please*/}
			{/*		</Button>*/}
			{/*	</Div>*/}
			{/*</Group>*/}
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
			title: PropTypes.string
		})
	})
}

export default AllEvents
