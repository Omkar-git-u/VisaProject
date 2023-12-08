import express, { response } from 'express'
//import { request } from 'http';
import mongoose from 'mongoose';
import { Student } from './studentMod.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const connectdb = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/schooldb');
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}

app.post("/student", async (request, response) => {
    try{
        const reqData = request.body;
        const student = new Student(reqData);
        await student.save();
        response.send({message: "student inserted"});
    }catch(error){
        response.send({message: "SOmething went wronngg"})
    }
})

app.get("/student", async(request, response) =>{
    try {
        const students = await Student.find();
        response.send({students:students});
    } catch (error) {
        response.send({message: "Soething not right"})
    }
})

app.get("/student/:roll", async(request, response) => {
    try {
        const student = await Student.findOne({roll: request.params.roll});
        if(student == null)
        {
            response.status(404).send("student not in the list ")
        }
        else
        {    
            response.send({student:student});
        }
    } catch (error) {
        response.status(500).send({message: "Soething not right"})
    }
});

app.delete("/student/:roll", async(request, response) => {
    try {
        const student = await Student.deleteOne({roll: request.params.roll});
        response.send({message:"student deleted"});

    } catch (error) {
        response.status(500).send({message: "Soething not right"})
    }
});
 
app.put("/student/:roll", async(request, response) => {
    try {
        const student = await Student.updateOne({roll: request.params.roll}, request.body);
        response.send("student data updaed ")
    } catch (error) {
        response.status(500).send({message: "Soething not right"})
    }
});

app.listen( 4900, () => {
    console.log("server stared on 4900");
    connectdb();
    //mongoose.connect('mongodb://127.0.0.1:27017/institutedb');

})


// {
//     "roll" : 4,
//     "name" : "neha",
//     "marks": 90,
//     "gender":"female"
// }