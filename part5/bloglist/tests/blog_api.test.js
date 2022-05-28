/* eslint-disable no-undef */
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
}, 100000)

describe('step 1', () => {
  test('GET request to /api/blogs', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('GET request to /api/blogs, json format, number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.blogs.length)
  })

})

describe('step 2', () => {
  test('verifying the unique identifier of blogs is id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    }, 100000)
  })
})

describe('step 3', () => {
  test('POST request to /api/blogs', async () => {
    const newBlog = {
      title: '48 Laws of Power',
      author: 'Robert Greene',
      url: 'http://www.url.com',
      likes: 25,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()

    const titles = blogs.map(b => b.title)

    expect(blogs).toHaveLength(helper.blogs.length + 1)
    expect(titles).toContain('48 Laws of Power')
  })
})

describe('step 4', () => {
  test('default value of likes', async () => {
    const newBlog = {
      title: 'a book lmao',
      author: 'an author lol',
      url: 'http://www.urlkinda.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(response.body.likes).toBe(0)
  })
})

describe('step 5', () => {
  test('url and title missing when adding a blog', async () => {
    const newBlog = {
      author: 'an author lol',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('step 6', () => {
  test('deleting a blog', async () => {
    const blogToDeleteId = helper.blogs[0]._id

    await api
      .delete(`/api/blogs/${blogToDeleteId}`)
      .expect(204)

    const blogs = await helper.blogsInDB()

    expect(blogs).toHaveLength(helper.blogs.length - 1)
  })
})

describe('step 7', () => {
  test('updating a blog', async () => {
    const blogToUpdate = helper.blogs[0]._id

    const newBlog = {
      title: 'a title',
      url: 'http://www.url.com',
      likes: 4
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate}`)
      .send(newBlog)

    expect(response.body.likes).toBe(newBlog.likes)
    expect(response.body.title).toBe(newBlog.title)
    expect(response.body.url).toBe(newBlog.url)
  })
})

describe('users creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('rootroot', 10)

    const user = new User({
      username: 'root',
      passwordHash
    })

    await user.save()
  })

  test('when the username or the password is missing', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      name: 'Slimani Imed',
      password: '123456'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('when the username or the password is less than 3 letters', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      name: 'Slimani Imed',
      username: 'i',
      password: '123imed'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('when the username is already used', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      name: 'Slimani Imed',
      username: 'root',
      password: '123imed'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('when adding a user with proper credentials', async () => {
    const usersAtStart = await helper.usersInDB()

    const newUser = {
      name: 'Slimani Imed',
      username: 'imed',
      password: '123imed'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})