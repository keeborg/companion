import React from "react"
import PropTypes from "prop-types"
import Div from "@vkontakte/vkui/dist/components/Div/Div"

import "./info_messages.css"

const InfoMessages = props => {
    switch (props.type) {
        case 'no-events':
            return <Div className="no-events info-msg">Нет ни одного подходящего события</Div>
        case 'loading':
            return <Div className="loading info-msg">Загрузка...</Div>
        default:
            return ''
    }
};

InfoMessages.propTypes = {
    type: PropTypes.string.isRequired
}

export default InfoMessages
