import React from "react";
import Div from "@vkontakte/vkui/dist/components/Div/Div";

import "./css/events.css";

const EventListItem = props => (
    <Div id={props.id} className="event-list-item">
        {props.title}
    </Div>
);


export default EventListItem;
