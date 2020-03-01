import React from "react";
import PropTypes from "prop-types"
import Div from "@vkontakte/vkui/dist/components/Div/Div";

import "./css/info_messages.css";

const InfoMessages = props => {
    switch (props.type) {
        case 'no-events':
            return <Div className="no-events">Результатов нет:(</Div>;
        default:
            return '';
    }
};

InfoMessages.propTypes = {
    type: PropTypes.string.isRequired,
};

export default InfoMessages;
