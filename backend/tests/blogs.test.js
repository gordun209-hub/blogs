const supertest = require('supertest')
const listHelper = require('./lost_helper')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
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


    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

test('a blog can be deleted ', async () => {
    const blogAtStart = await listHelper.blogsInDb()
    const blogToDelete = blogAtStart[0]
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

}, 10000)

afterAll(() => {
    mongoose.connection.close()
})