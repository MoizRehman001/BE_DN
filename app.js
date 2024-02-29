// to update the data (PATCH)
// http://localhost:9000/person/<id> 
// Payload = {
    // "name": "Mahroof"
    // "tech": "Data Science"
    // "salary": "9999",
    // "experience": "20",
    // "age": "21"
// }
// taking the parameter conditionally
// ----------------------------------------------------------------------------------
// to get all the data (GET)
// http://localhost:9000/person
// ----------------------------------------------------------------------------------
// to delete all the data (POST)
// http://localhost:9000/person
// Payload = {
    // "ids" : ["65df2a3b05ef62f5b0440964","65df2a5d05ef62f5b0440967"]
// }
// will take ids in array format
// ------------------------------------------------------------------------------------
// to add all the data (POST)
// http://localhost:9000/person/
// Payload = {
//     "name": "Kiran",
//     "tech": "java",
//     "salary": "9999",
//     "experience": "5",
//     "age": "25"
// }


const express = require('express');
const mongoose = require('mongoose');
const PORT = 9000;
const cors = require('cors'); // adding cors to allow all origin to communicate
const url = 'mongodb://localhost/dataneuron';

const app = express();
// this will enable cors for all routes
app.use(cors());

mongoose.connect(url); // connect the application do mongodb using url of DB

const con = mongoose.connection; // will take con object to help connecting the application 

// this will connect to our database
con.on('open' , function(){ 
    console.log('connected..')
})


app.use(express.json());//this middleware will parse It is the process of converting a JSON string to a JSON object for data manipulation.

const personRouter = require('./routes/persons') // this take all the routes from the persons.js
app.use('/person' , personRouter) // this middleware will redirect all the request coming from /person route to personRouter file 

app.listen(PORT , () => {  // this will start the server based on PORT 
    console.log(`server started at port ${PORT}`);
})