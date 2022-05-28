/* eslint-disable react/prop-types */
import React, { useState } from 'react'

const Blog = ({ title, author, url, likes, name, incLikes, removeBlog, isRemovable }) => {
    const [visible, setVisible] = useState(false)

    const removeBtnStyle = {display: isRemovable ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className='blogStyle'>
            {title} | {author}
            <button onClick={toggleVisibility}>view</button>
            {visible && (
                <div>
                    <div>{url}</div>
                    <div>
                        likes {likes}
                        <button onClick={incLikes}>like</button>
                    </div>
                    <div>{name}</div>
                    <button style={removeBtnStyle} onClick={removeBlog}>remove</button>
                </div>                        
            )}
        </div>
    )
}

export default Blog