const express = require("express");
const path = require("path");
require("dotenv-flow").config();
const { MongoClient } = require('mongodb');



// defaults to port 3001 if no value is given for the environment variable
const PORT = process.env.PORT || 3001;
const HOST = "localhost";

const app = express();

// initialize middleware
const buildPath = path.join(__dirname, "client/build");

const createUser = async(email, pass) => {
    const client = new MongoClient(process.env.MONGO_URI, {useUnifiedTopology: true});
    try{

        await client.connect();
        const db = client.db("groups_maker_data");
        const users = db.collection("users");

        const userDocument = {
            email: email,
            password: pass
        }

        await users.insertOne(userDocument);

    } catch(e){
        console.log(e);
        throw e;
    } finally{
        client.close();
    }
}

const authenticateUser = async(req, res) => {
    const client = new MongoClient(process.env.MONGO_URI, {useUnifiedTopology: true});
    try{
        await client.connect();

        const db = client.db("groups_maker_data");
        const users = db.collection("users");

        const {email, password} = req.body;

        const user = await users.findOne({"email": email, "password": password});
        
        if(user){
            res.status(200).json({"email": email, "pass": password, "auth": true, "msg": "User authentication successful"});        
        } else {
            res.status(200).json({"email": email, "pass": password, "auth": false, "msg": "User authentication unsuccessful"});
        }
    } catch(e){
        res.status(500).json({"Error": e, "msg": "User authentication failed"});
    } finally {
        client.close();
    }
}

const createStudent = async(req, res) => {
    const client = new MongoClient(process.env.MONGO_URI, {useUnifiedTopology: true});
    try{
        await client.connect();

        const db = client.db("groups_maker_data");
        const students = db.collection("students");

        const{firstName, lastName, grade, points, user} = req.body;

        const studentDoc = {
            firstName: firstName,
            lastName: lastName,
            grade: grade,
            points: points,
            user: user
        }

        await students.insertOne(studentDoc);

        
        res.status(200).json({"firstName": firstName, "lastName": lastName, "grade": grade, "points": points, "user": user, "msg": "New student successfully added"});   
    } catch(e) {
        
        res.status(500).json({"Error": e, "msg": "New student could not be added"});
        
    } finally {
        
        client.close();
        
    }
}

const getStudents = async(req, res) => {
    const client = new MongoClient(process.env.MONGO_URI, {useUnifiedTopology: true});
    try{
        await client.connect();

        const db = client.db("groups_maker_data");
        const students = db.collection("students");

        const query = {user: req.body.user};

        const studentList = await students.find(query).toArray();

        const modifiedArr = studentList.map((ele, index) => ({...ele, "id": index}));
        
        res.status(200).json({"students": modifiedArr, "user": req.body.user, "msg": "Student list successfully retrieved"});
    } catch(e) {
        res.status(500).json({"Error": e, "msg": "Student list retrieval failed"});
    } finally{
        client.close();
    }
}

app.use(express.static(buildPath));

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// ROUTES

app.post("/newUser", async (req,res) => {
    try{
        await createUser(req.body.email, req.body.password);
        res.status(200).json({"email": req.body.email, "pass": req.body.password, "msg": "New user successfully added"});
    } catch(e){
        res.status(500).json({"error": e, "msg": "New user could not be added to database"});
    }
});

app.post("/checkUser", async(req,res) => {
    await authenticateUser(req, res);
});

app.post("/newStudent", async (req, res) => {
    await createStudent(req, res);
});

app.post("/getStudents", async (req, res) => {
    await getStudents(req, res);
});

app.get("*", (req, res) => {
    res.sendFile(buildPath + "/index.html");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});