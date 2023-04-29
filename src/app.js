const express = require("express")
const conn = require("./db/conn");
const Student = require('./models/students')

const app = express()
const port = process.env.PORT ||  8000;

app.use(express.json())



//create a new student 
// app.post("/students", (req, res) => {
//     console.log(req.body)
//     const user = new Student(req.body)

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((err) => {
//         res.status(400).send(err)
//     })
// })


// second way to create a new student
app.post("/students", async(req, res) => {
    const user = new Student(req.body)
    
    try{
        const createUser = await user.save();
    res.status(201).send(createUser);

    }catch(e){
        res.status(400).send(e)
    }
})


app.listen(port, (req, res)=>{
    console.log(`connection is setup at ${port }`)
})