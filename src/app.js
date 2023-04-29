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


// second method to create a new student
app.post("/students", async(req, res) => {
    const user = new Student(req.body)
    
    try{
        const createUser = await user.save();
    res.status(201).send(createUser);

    }catch(e){
        res.status(400).send(e)
    }
})

// read the data of register student
app.get("/students", async(req, res) => {
    try{
     const studentsData = await Student.find()
     res.send(studentsData);
    }catch(e){
        res.send(e)
    }
})

//get a indivisual student data using id
app.get("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
       const studentData = await Student.findById(_id)

       if(!studentData){
       return res.status(404).send();
       }else{
        res.send(studentData);
       }
      
    }catch(e){
        res.status(500).send(e)
    }
});


app.listen(port, (req, res)=>{
    console.log(`connection is setup at ${port }`)
})