const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs
    .map(blog => blog.likes)
    .reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const arr = blogs.map(blog => blog.likes)
  const max = Math.max(...arr)
  const index = arr.indexOf(max)

  const res = blogs
    .map(blog => {
      return {
        author: blog.author,
        title: blog.title,
        likes: blog.likes
      }
    })

  return res[index]
}

const mostBlogs = blogs => {
  const authorNumBlogs = name => {
    let count = 0
    blogs
      .forEach(blog => {
        if (blog.author === name) count ++
      })

    return count
  }

  const authors = blogs.map(blog => {
    return {
      author: blog.author,
      blogs: authorNumBlogs(blog.author)
    }
  })

  const arr = authors.map(author => author.blogs)
  const max = Math.max(...arr)
  const index = arr.indexOf(max)

  return authors[index]
}

const mostLikes = blogs => {
  const authorTotalLikes = name => {
    let count = 0
    blogs
      .forEach(blog => {
        if (blog.author === name) count += blog.likes
      })

    return count
  }

  const authors = blogs.map(blog => {
    return {
      author: blog.author,
      likes: authorTotalLikes(blog.author)
    }
  })

  const arr = authors.map(author => author.likes)
  const max = Math.max(...arr)
  const index = arr.indexOf(max)

  return authors[index]
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}