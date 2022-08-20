/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBlogById, updateBlog, removeBlog } from '../slices/blogsSlice'

const Blog = ({ blogId, currentUser }) => {
    const { title, url, likes, user } = useSelector(state => selectBlogById(state, blogId))
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const blog = useSelector(state => selectBlogById(state, blogId))
    const isRemovable = blog.user === currentUser.id
    const removeBtnStyle = {display: isRemovable ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const incLikes = async () => {
        const modifiedBlog = { ...blog, likes: blog.likes + 1, user: user.id }
        try {
            await dispatch(updateBlog(blogId, modifiedBlog)).unwrap()
        } catch (error) {
            console.error('failed to increment likes: ', error)
        }
    }

    const delBlog = async () => {
        const ok = window.confirm(`remove blog ${blog.title} ?`)
        if (ok) {
            try {
                await dispatch(removeBlog(blogId)).unwrap()
            } catch (error) {
                console.error('failed to remove blog: ', error)
            }  
        }
    }

    return (
        <div className='blogStyle'>
            {title} | {user.name}
            <button onClick={toggleVisibility}>view</button>
            {visible && (
                <div>
                    <div>{url}</div>
                    <div>
                        likes {likes}
                        <button onClick={incLikes}>like</button>
                    </div>
                    <button style={removeBtnStyle} onClick={delBlog}>remove</button>
                </div>                        
            )}
        </div>
    )
}

export default Blog