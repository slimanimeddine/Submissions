/* eslint-disable no-undef */
const listHelper = require('./test_helper')

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    expect(listHelper.totalLikes(blogs)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    expect(listHelper.totalLikes(blogs)).toBe(blogs[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('find the most liked blog', () => {
    const mostLiked = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }

    expect(listHelper.favoriteBlog(listHelper.blogs)).toEqual(mostLiked)

  })
})

describe('most blogs', () => {
  test('find the author with the most blogs', () => {
    const expectedAuthor = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    expect(listHelper.mostBlogs(listHelper.blogs)).toEqual(expectedAuthor)
  })
})

describe('most likes', () => {
  test.only('find the author whose blogs have the most likes', () => {
    const expectedAuthor = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    expect(listHelper.mostLikes(listHelper.blogs)).toEqual(expectedAuthor)
  })
})