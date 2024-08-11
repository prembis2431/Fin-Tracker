const express = require("express");
const cors = require("cors");
const {readdirSync} = require('fs') // readDirectorySync coming from 'fs', that is...file system
const { db } = require("./db/db");
// const router = require("./routes/Transactions")
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

// middlewares
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200,
// }
app.use(cors());
app.use(express.json())
app.get('/', (req, res)=>{  // we can send the response once we get the '/', i.e- the homepage
res.send('Hello World')
})

// routes

// it is going to read all the files which we have in routes folder
readdirSync('./routes').map((route)=> app.use('/api/v1', require('./routes/' + route))) // say, we have multiple files in the route folder directory...so we map them 
// app.use("/api", router)

const server = () => {
    db();
app.listen(PORT, ()=>{
    console.log(`we are listening to port: ${PORT}`)
})
};

server();
