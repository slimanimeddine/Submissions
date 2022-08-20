/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../slices/blogsSlice'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    const handleTitleChange = event => {
        setTitle(event.target.value)
    }

    const handleUrlChange = event => {
        setUrl(event.target.value)
    }

    const canSave = [title, url].every(Boolean) && addRequestStatus === 'idle'

    const onCreateBlogClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending') 
                await dispatch(addNewBlog({ title, url })).unwrap()
                setTitle('')
                setUrl('')
            } catch (error) {
                console.error('failed to create the blog: ', error) 
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    return (
        <form>
            <div>
          title
                <input
                    type='text'
                    id='title'
                    value={title}
                    name='title'
                    onChange={handleTitleChange}
                />
            </div>
            <div>
          url
                <input
                    type='text'
                    id='url'
                    value={url}
                    name='url'
                    onChange={handleUrlChange}
                />
            </div>
            <button id='create-button' onClick={onCreateBlogClicked} type='button' disabled={!canSave}>create</button>
        </form>  
    )
}

export default BlogForm