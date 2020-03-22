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
import EventsListItem from './EventsListItem'
import InfoMessages from '../../Helpers/InfoMessages'

import '../css/main.css'
import { useEvents } from './hooks/useEvents'

const EventsList = function ({ id, go, fetchedUser }) {
	const [searchQuery, setSearchQuery] = useState('')
	const [pageNumber, setPageNumber] = useState(1)
	const [loading, setLoading] = useState(null)

	const handleSearch = (searchQuery) => {
		setSearchQuery(searchQuery)
		setPageNumber(1)
	}

	const { events } = useEvents(pageNumber, searchQuery, setLoading);

	return(
		<Panel id={id}>
			<PanelHeader>События рядом с вами</PanelHeader>
			<FixedLayout vertical="top">
				<Search onChange={handleSearch} />
			</FixedLayout>
			{loading}
			{
				<List id="events">
					{
						(events !== undefined && events.length > 0)
					&&
						events.map((event, i) => <EventsListItem key={event.id} id={event.id} title={event.title} />)
					}
					{ loading && <Div><InfoMessages type="loading" /></Div> }
					{ (!loading && (events === undefined || events.length === 0)) && <Div><InfoMessages type="no-events" /></Div> }
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

EventsList.propTypes = {
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

export default EventsList
