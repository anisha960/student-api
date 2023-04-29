const express = require("express")
const conn = require("./db/conn");
const Student = require('./models/students')

const app = express()
const port = process.env.PORT ||  8000;

app.use(express.json())



//create a new student 
app.post("/students", (req, res) => {
    console.log(req.body)
    const user = new Student(req.body)

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.listen(port, (req, res)=>{
    console.log(`connection is setup at ${port }`)
})