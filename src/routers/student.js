const express = require("express");
const router = new express.Router();
const Student = require("../models/students")




//  create a new student
router.post("/students", async(req, res) => {
    const user = new Student(req.body)
    // console.log(user)
    try{
        const createUser = await user.save();
        res.status(201).send(createUser);
        console.log("hello",createUser)
    }catch(e){
        res.status(400).send(e)
    }
})

// read the data of register student
router.get("/students", async(req, res) => {
    try{
     const studentsData = await Student.find()
     res.send(studentsData);
    }catch(e){
        res.send(e)
    }
})

//get a indivisual student data using id
router.get("/students/:id", async(req, res) => {
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

//update the student by its id
router.patch("/students/:id", async(req, res) => {
    try{
        const _id = req.params.id;
       const updateStudents =  await Student.findByIdAndUpdate(_id, req.body, {
        new : true
       });
    //    console.log(updateStudents)
       res.send(updateStudents);
    }catch(e){
        console.log(e)
    }
})

//delete student by it's id
router.delete("/students/:id", async(req, res) => {
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        // console.log(deleteStudent)
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
       res.status(500).send(e)
    }
})


module.exports = router;