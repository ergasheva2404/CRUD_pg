import booksService from "../services/books.js";

class BookController {
    async create(req, res) {
        const data = await booksService.create(req)

        return res.status(data.status).json(data.body)
    }
    async getAll(req, res) {
        const data = await booksService.getAll(req)

        return res.status(data.status).json(data.body)
    }
    async getAvailable(req, res) {
        const data = await booksService.getAvailable()

        return res.status(data.status).json(data.body)
    }
    async getOne(req, res) {
        const data = await booksService.getOne(req)

        return res.status(data.status).json(data.body)
    }
    async update(req, res) {
        const data = await booksService.update(req)
        
        return res.status(data.status).json(data.body)
    }
    async remove(req, res) {
        const data = await booksService.remove(req)
        return res.status(data.status).json(data.body)
    }
}

export default new BookController()