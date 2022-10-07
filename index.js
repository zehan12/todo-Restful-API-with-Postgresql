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

app.post( "/todos", async ( req, res ) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [ description ]
        );
        res.json(newTodo);
    } catch ( error ) {
        console.error(error.message)
    }
} )



app.listen( port,()=>{
    console.log(`port survive on port ${port}`)
})