import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notifMessage, setNotificationMessage] = useState('')
    const [notifClassname, setNotifClassname] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            blogService.setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            setNotificationMessage(`${user.name} logged in successfully`)
            setNotifClassname('success')   
            setTimeout(() => {
                setNotificationMessage(null)
                setNotifClassname(null)   
            }, 5000)
        } catch (error) {
            setNotificationMessage('wrong username or password')
            setNotifClassname('error')   
            setTimeout(() => {
                setNotificationMessage(null)
                setNotifClassname(null)   
            }, 5000)

        }
    }

    const logout = () => {
        const confirmLogout = window.confirm('Are you sure?')
        if (confirmLogout) {
            window.localStorage.removeItem('loggedUser')
            user.set(null)
        }
    }

    const loginForm = () => (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={handleLogin}>
                <div>
          username
                    <input
                        type='text'
                        id='username'
                        value={username}
                        name='username'
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
          password
                    <input
                        type='password'
                        id='password'
                        value={password}
                        name='password'
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button id='login-button' type='submit'>login</button>
            </form>
        </div>
    )

    const addBlog = async blogObject => {
        try {
            const addedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(addedBlog))
            setNotificationMessage(`a new blog ${addedBlog.title} added`)
            setNotifClassname('success')   
            setTimeout(() => {
                setNotificationMessage(null)
                setNotifClassname(null)   
            }, 5000)
        } catch (error) {
            setNotificationMessage(`${error.message}`)
            setNotifClassname('error')   
            setTimeout(() => {
                setNotificationMessage(null)
                setNotifClassname(null)   
            }, 5000)      
        }
    }

    const incLikes = async id => {
        const blog = blogs.find(b => b.id === id)
        const modifiedBlog = {...blog, likes: blog.likes + 1, user: user.id}

        try {
            const returnedBlog = await blogService.update(id, modifiedBlog)
            setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
        } catch (error) {
            setNotificationMessage(error.message)
            setNotifClassname('error')
            setTimeout(() => {
                setNotificationMessage(null)
                setNotifClassname(null)          
            }, 5000)
        }
    }

    const removeBlog = async id => {
        const blogToRemove = blogs.find(b => b.id === id)
        const ok = window.confirm(`remove blog ${blogToRemove.title} by ${blogToRemove.author}`)

        if (ok) {
            try {
                await blogService.remove(id)
                setBlogs(blogs.filter(b => b.id !== id))
                setNotificationMessage('blog was removed successfully')
                setNotifClassname('success')
                setTimeout(() => {
                    setNotificationMessage(null)
                    setNotifClassname(null)          
                }, 5000)              
            } catch (error) {
                setNotificationMessage(error.message)
                setNotifClassname('error')
                setTimeout(() => {
                    setNotificationMessage(null)
                    setNotifClassname(null)          
                }, 5000)      
            }  
        }
    }

    const blogForm = () => (
        <Togglable buttonLabel='create new blog'>
            <BlogForm
                createBlog={addBlog}
            />
        </Togglable>
    )

    const showUser = () => (
        <div>
            <h1>Blogs</h1>     
            <div>
                {user.name} logged in 
                <button onClick={logout}>logout</button>
            </div> 
            {blogForm()}
            <div>
                {
                    blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map(blog => 
                            <Blog
                                key={blog.id}
                                title={blog.title}
                                author={blog.author}
                                url={blog.url}
                                likes={blog.likes}
                                name={user.name}
                                incLikes={() => incLikes(blog.id)}
                                removeBlog={() => removeBlog(blog.id)}
                                isRemovable={user?.username?.toString() === blog?.user?.username?.toString()}
                            />
                        )
                }
            </div>
        </div>
    )


    return (
        <div>
            <Notification message={notifMessage} classname={notifClassname} /> 
            {
                user === null 
                    ? loginForm()
                    : showUser() 
            }
        </div>
    )
}

export default App
