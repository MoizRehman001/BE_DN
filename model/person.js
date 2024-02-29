const mongoose = require('mongoose'); // importing the mongoose to create the schema 

const personSchema = new  mongoose.Schema({  // schema for the person 
    id : {
        type : String, // this will accept the string as data type 
        required : true // this field is required 
    },
    name : {
        type : String, // this will accept the string as data type 
        required : true // this field is required 
    },
    tech : {
        type : String, // this will accept the string as data type 
        required : true // this field is required 
    },
    salary : {
        type : Number, // this will accept the number as data type 
        required : true // this field is required 
    },
    experience : {
        type : Number, // this will accept the number as data type 
        required : true // this field is required 
    },
    age : {
        type : Number, // this will accept the number as data type 
        required : true // this field is required 
    },
})

module.exports = mongoose.model("Person",personSchema); // exporting the schema 