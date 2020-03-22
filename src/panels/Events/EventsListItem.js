import React from "react"
import Div from "@vkontakte/vkui/dist/components/Div/Div"

import "./css/events.css"

const EventsListItem = props => (
    <Div id={props.id} className="events-item">
        {props.title}
    </Div>
)


export default EventsListItem
