/* eslint-disable react/prop-types */
import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = event => {
        setTitle(event.target.value)
    }
    const handleAuthorChange = event => {
        setAuthor(event.target.value)
    }
    const handleUrlChange = event => {
        setUrl(event.target.value)
    }

    const addBlog = event => {
        event.preventDefault()

        createBlog({
            title,
            author,
            url
        })

        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
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
          author
                <input
                    type='text'
                    id='author'
                    value={author}
                    name='author'
                    onChange={handleAuthorChange}
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
            <button id='create-button' type='submit'>create</button>
        </form>  
    )
}

export default BlogForm