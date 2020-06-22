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
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline'
import EventsListItem from './EventsListItem'
import InfoMessages from '../../Helpers/InfoMessages/InfoMessages'

import '../css/main.css'
import { useEvents } from './hooks/useEvents'

const MyEvents = ({ id, go }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(null)

    const handleSearch = (searchQuery) => {
        setSearchQuery(searchQuery)
        setPageNumber(1)
    }

    //const { events } = useEvents(pageNumber, searchQuery, setLoading);
    const events = '';

    return(
        <Panel id={id}>
            <PanelHeader>Мои события</PanelHeader>
            <FixedLayout vertical="top">
                <Search onChange={handleSearch} />
                <Div style={{paddingTop: 0, paddingBottom: 0}}>
                    <Button onClick={go} data-to="add-event" stretched mode="primary" size="l">
                        Добавить событие
                    </Button>
                </Div>
            </FixedLayout>
            {loading}
            {
                <List id="events" style={{paddingTop: 90 + 'px'}}>
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

        </Panel>
    )
}

MyEvents.propTypes = {
}

export default MyEvents
