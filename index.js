require('dotenv').config({ path: require('find-config')('.env') })
const app = require("express")()
const port = 3000 || 5000

const pool = require("./db");

app.use(require("express").json());

/*
|--------------------------------------------------------------------------
|  Routes
|--------------------------------------------------------------------------
|
| This file is where you write all your routes for todo
|
*/

//* @desc      create a todo
//* @route     POST /todos

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

//* @desc      get all todos
//* @route     GET /todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//* @desc      get a single todo
//* @route     GET /todos/:todoId

app.get("/todos/:todoId", async (req, res) => {
    const { todoId } = req.params;
    try {
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [todoId]
        );
        if (!todo.rows.length) {
            res.status(401).json({ error: "todo not found" })
        } else {
            res.json(todo.rows);
        }
    } catch (error) {
        console.error(error.message)
        res.status(401).json({ error: "Something went wrong!!" })
    }
})

//* @desc      update a todo
//* @route     PUT /todos/:todoId

app.put( "/todos/:todoId", async ( req, res ) => {
    try {
        const { todoId } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [ description, todoId ] )
        res.json({message:"todo updated"})
    } catch ( error ) {
        console.error(error.message)
        res.status(401).json({ error: "Something went wrong!!" });
    }
})


//* @desc      delete a todo 
//* @route     DELETE /todos/:todoId

app.get( "/todos/:todoId", async ( req, res ) => {
    try {
        const { todoId } = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [todoId]);
        res.json({message:"todo delete successfully!!"})
    } catch ( error ) {
        console.error(error.message)
        res.status(401).json({ error: "Something went wrong!!" });
    }
})

app.listen(port, () => {
    console.log(`port survive on port ${port}`)
})