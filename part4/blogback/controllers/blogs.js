const blogsRouter = require('express').Router()
Blog = require('./../models/blog')
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response
                .status(201)
                .json(result)
        })
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})
blogsRouter.put('/:id', async (request, response) => {
    try {
        let blog = new Blog(request.body)
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
        response.json(blog)
    } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = blogsRouter