import pool from "../config/db.js";

class BooksService {
    async create(req) {
        try {
            const { title, author, year } = req.body
            const result = await pool.query("insert into books (title, author, year) values ($1, $2, $3) returning *", [title, author, year])
            return {
                status: 201,
                body: result.rows[0]
            }
        }
        catch (error) {
            return {
                status: 400,
                message: error.message
            }
        }
    }

    async getAll(req) {
        try {
            const { author, sort } = req.query;
            const allowedSort = ["id", "title", "author", "year"];
            const orderBy = allowedSort.includes(sort) ? sort : "id";

            let query = "select * from books";
            const params = [];
            if (author) {
                query += " where author ilike $1";
                params.push(`%${author}%`);
            }
            query += ` order by ${orderBy}`;

            const result = await pool.query(query, params);
            return { status: 200, body: result.rows };
        }
        catch (error) {
            return {
                status: 500,
                message: error.message
            }
        }
    }

    async getAvailable() {
        try {
            const result = await pool.query("select * from books where available = true order by id");
            return {
                status: 200,
                body: result.rows
            }
        }
        catch (error) {
            return {
                status: 500,
                message: error.message
            }
        }
    }

    async getOne(req) {
        try {
            const result = await pool.query("select * from books where id = $1", [req.params.id]);
            if (!result.rows.length)

                return {
                    status: 404,
                    message: "Book not found"
                }
            return {
                status: 200,
                body: result.rows[0]
            }
        }
        catch (error) {
            return {
                status: 400,
                message: error.message
            }
        }
    }

    async update(req) {
        try {
            const { title, author, year, available } = req.body;
            const result = await pool.query("update books set title = coalesce($1, title), author = ($2, author), year = ($3, year), available = ($4, available) where id = $5 returning *",
                [title ?? null, author ?? null, year ?? null, available ?? null, req.params.id]
            )
            if (!result.rows.length) return { status: 404, body: { error: "Book not found" } };
            return {
                status: 200,
                body: result.rows[0]
            }
        }
        catch (error) {
            return {
                status: 400,
                message: error.message
            }
        }
    }

    async remove(req) {
        try {
            const result = await pool.query("delete from books where id = $1 returning *", [req.params.id]);
            if (!result.rows.length) return { status: 404, body: { error: "Book not found" } };
            return {
                status: 200,
                message: "Book deleted", book: result.rows[0]


            };
        }
        catch (error) {
            return {
                status: 400,
                message: error.message
            }
        }
    }
}

export default new BooksService();