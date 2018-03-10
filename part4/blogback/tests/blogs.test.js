const { initialBlogs, nonExistingId, blogsInDb } = require('./blogs_helper')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const {app, server} = require('../index')
//const app = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const blogs = blogsInDb()

test('dummy is called', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has multiple blogs equals the likes of sum of those', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {

  test('when there are no blogs null is returned', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })
  test('when list has multiple blogs equals the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
  test('when list has one blog equals the only blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
})

describe('blog api', () => {
  beforeAll(async () => {
    await Blog.remove({})
    let blogObject = new Blog(blogs[0])
    await blogObject.save()
  
    logbObject = new Blog(blogs[1])
    await blogObject.save()
  
    logbObject = new Blog(blogs[2])
    await blogObject.save()
  
    logbObject = new Blog(blogs[3])
    await blogObject.save()
  
    logbObject = new Blog(blogs[4])
    await blogObject.save()

    blogs=blogsInDb()
  
  })
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(blogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
  
    const contents = response.body.map(r => r.content)
  
    expect(contents).toContain('React patterns')
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      // ....
    }
  
    const blogsBefore = await blogsInDb()
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAfter = await blogsInDb()
  
    expect(blogsAfter.length).toBe(blogsBefore.length+1)
    expect(blogsAfter).toContainEqual(newBlog)
  })

  afterAll(() => {
    server.close()
  })
})