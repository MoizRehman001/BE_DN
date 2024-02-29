const express = require('express'); // will import the express module to create the routes 
const router = express.Router(); // will help is to set the route 
const Person = require('../model/person'); // will import the Person object schema from the Person Schema 

// Get all the persons api
router.get('/' , async (req,res) => {
    console.log("get started");
    try{
        // res.send("get Request")
        const persons = await Person.find();
        res.json(persons)
        console.log("resolved")
    }catch(err){
        console.log("Error "+err);
    }
})

// Add the new uer to the table
router.post('/', async (req,res) => {
    try {
        const nanoidModule = await import('nanoid'); // using nanoid to map the unique id with the added object
        const nanoid = nanoidModule.nanoid || nanoidModule.default;

        const person = new Person({
            id: nanoid(), // using nano id to generate the unique id for every person
            name: req.body.name,
            tech: req.body.tech,
            salary: req.body.salary,
            experience: req.body.experience,
            age: req.body.age
        });

        const a1 = await person.save();
        res.json(a1);
    } catch (err) {
        console.log("Error " + err);
        res.status(500).json({ error: 'Server error' });
    }
})

// Get the user based on the id
router.get('/:id' , async (req,res)=>{
    try{
        const person = await Person.findById(req?.params?.id)
        res.json(person)
    }catch(err){
        req.send("Error : "+err)
    }
} )

// Update the person based on id
router.patch('/:id', async (req, res) => {
    try {
        const person = await Person.findById(req?.params?.id);
        
        if (!person) {         //if person is not there return person not found
            return res.status(404).json({ message: 'Person not found' });
        }

        if (req.body.name) {    //if name is available update only name
            person.name = req.body.name;
        }

        if (req.body.tech) {      //if tech is available update only tech
            person.tech = req.body.tech;
        }

        if (req.body.salary) {     //if salary is available update only salary
            person.salary = req.body.salary;
        }

        if (req.body.experience) {     //if name is experience update only experience
            person.experience = req.body.experience;
        }

        if (req.body.age) {     //if age is available update only age
            person.age = req.body.age;
        }

        const updatedPerson = await person.save();
        res.json(updatedPerson);
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
});

// Delete the user or users . taking the parameters in array 
router.post('/delete', async (req, res) => {
    try {
        const ids = req.body.ids; // we will get the ids in the form of array
        console.log(req)
        console.log(ids)
        const deletionResults = await Promise.all(ids.map(async (id) => { // using map which is HOC we are taking one id at a time and deleting it from the database
            const person = await Person.findById(id); // finding the person based on id
            if (!person) {
                return { id: id, message: 'Person not found' }; // check if person is not there
            }
            const deletionResult = await person.deleteOne(); //deleting the person from the database
            return { id: id, deletionResult: deletionResult };
        }));
        res.json(deletionResults);
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
});

module.exports = router