import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import './custom_modal.css'

const CustomModal = (props) => {
    const [opened, setOpened] = useState(props.id === props.activeModal)

    useEffect(() => {
        setOpened(props.id === props.activeModal)
    }, [props.activeModal])


    const handleClose = (e) => {
        let classList = e.target.classList
        if (classList.contains('custom-modal-wrapper') || classList.contains('confirm')) {
            props.close()
        }
    }

    return(
        <div>
            {   opened &&
                <div className="custom-modal-wrapper" onClick={(e) => handleClose(e)}>
                    <div className="custom-modal">
                        <div className="custom-modal-header">
                            <button className="confirm" onClick={(e) => handleClose(e)}>Закрыть</button>
                        </div>
                        <div className="custom-modal-content">
                            <div style={{position: 'relative'}}>
                            {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

CustomModal.propTypes = {
    id: PropTypes.string.isRequired,
    activeModal: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired
}

export default CustomModal
