require('dotenv').config({ path: require('find-config')('.env') })
const app = require("express")()
const port = 3000 || 5000

const pool = require("./db");
console.log(pool)

app.listen( port,()=>{
    console.log(`port survive on port ${port}`)
})