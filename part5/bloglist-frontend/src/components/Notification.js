/* eslint-disable react/prop-types */
import React from 'react'

const Notification = ({ message, classname }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={classname}>
            {message}
        </div>
    )
}

export default Notification