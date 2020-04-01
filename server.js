const express = require('express');
const mongoose = require('mongoose');
const app = express();

//connecting to the database
mongoose.connect('mongodb://localhost:27017/fruitDB', { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
 name:  {
     type: String,
     required: [true, "Error: no name specified" ]//the property name must not be empty
 },
    rating: {
        type: Number, //must be a number
        min: 1, //minimum value allowed 1
        max: 10 //maximum value allowed 10
    }, 
    review: String 
});


//use the schema to create a Mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

//create a fruit document
const fruit = new Fruit({
    name: "Apple",
    rating: 10,
    review: "Sweet and crunchy"
});

const banana = new Fruit({
    name: "Banana",
    rating: 5,
    review: "Soft texture"
});
 
const lemon = new Fruit({
    name: "Lemon",
    rating: 5,
    review: "Sour as hell"
});

const orange = new Fruit({
    name: "orange",
    rating: 8
});



Fruit.insertMany([banana, lemon, orange], (error)=> {
    if(error){
        console.log(err);
    } else {
        console.log("Fruit successfully added to the fruitDB");
    }
})



const personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number    
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    firstName: 'John',
    lastName: 'Doe',
    age: 29
});

//we access the fruits collection through the Fruit model
Fruit.find(function(error, fruits) {
    if(error){
        console.log(error);
    } else {

        mongoose.disconnect();
        //console.log(fruits);
        fruits.forEach(fruit => {
            console.log(fruit.name);
        });

    }
});

//delete a record
Fruit.deleteOne({name: "orange"}, function(error){
    if(error){
         console.log(error);
     } else {
         console.log("Item successfully deleted.");
     }
});


app.listen(3000, ()=>{
    console.log("Server is Running on Port 3000");
});