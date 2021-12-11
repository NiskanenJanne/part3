require('dotenv').config()
const { request, response } = require('express');
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const Person = require('./models/person');
const { findByIdAndRemove } = require('./models/person');

const mongoose = require('mongoose')

const app = express()

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ))
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

let puhelinluettelo = []

app.get('/info', (request, response) => {
    const date_ob = new Date();
    console.log(date_ob, "hrt");
    const people = puhelinluettelo.length
    console.log(people)
    response.send(`Phonebook has info for ${people} people.<br></br> ${date_ob}`)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>{
        if (person){
        response.json(person)
        }
        else {
            response.status(404).end()
        }
    })
})
        /*
    const id = Number(request.params.id)
    const person = puhelinluettelo.find(person => person.id === id)
    if (person) {
        response.json(person)
    } 
    else {
        response.status(404).end()
    } edellinen*/


app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id).then(result =>{
        response.status(204).end()    
    })
})
/*
const generateId = () => {
    min = Math.ceil(1);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1) + min);
    
}
*/

app.post('/api/persons', (request, response) => {
    
    const body = request.body
    var n = 0
    
    for (i = 0; i < puhelinluettelo.length; i++) {
        console.log(puhelinluettelo[i].name)
        if (body.name === puhelinluettelo[i].name){
            n = 1
            i = puhelinluettelo.length + 1
            return response.status(400).json({ 
                error: 'name must be unique' 
            })
        }
    }
    if (!body.name) {
        n = 1
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!body.number) {
        n = 1
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }
    if (n === 0) {
        const person = new Person({
            name: body.name,
            number: body.number
        })
        person.save().then(response => {
            console.log("added " + body.name + " number " + body.number + " to phonebook")
            
        })
        puhelinluettelo = puhelinluettelo.concat(person)
        response.json(person)
        
    }
    
    /*
    {
        const person = {
        id: generateId(),
        name: body.name,
        number: body.number   
    }*/
})
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

const PORT =  process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*
const { request, response } = require('express');
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')

const app = express()

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ))
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

let puhelinluettelo = [
    
]

app.get('/info', (request, response) => {
    const date_ob = new Date();
    console.log(date_ob, "hrt");

    
    
    const people = puhelinluettelo.length
    
    console.log(people)
    response.send(`Phonebook has info for ${people} people.<br></br> ${date_ob}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = puhelinluettelo.find(person => person.id === id)
    if (person) {
        response.json(person)
    } 
    else {
        response.status(404).end()
    } 
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    puhelinluettelo = puhelinluettelo.filter(person => person.id !== id)
    
    response.status(204).end()
    
})
const generateId = () => {
    min = Math.ceil(1);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min + 1) + min);
    
}

app.post('/api/persons', (request, response) => {
    
    const body = request.body
    var n = 0
    
    for (i = 0; i < puhelinluettelo.length; i++) {
        console.log(puhelinluettelo[i].name)
        if (body.name === puhelinluettelo[i].name){
            n = 1
            i = puhelinluettelo.length + 1
            return response.status(400).json({ 
                error: 'name must be unique' 
            })
        }
    }
    if (!body.name) {
        n = 1
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    
    if (!body.number) {
        n = 1
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }
    

    if (n === 0){
        const person = {
        id: generateId(),
        name: body.name,
        number: body.number   
    }
    puhelinluettelo = puhelinluettelo.concat(person)
    response.json(person)   }
     
})

  
app.get('/api/persons', (request, response) => {
    response.json(puhelinluettelo)
})

const PORT =  process.env.PORT || 
app.listen(PORT, () => {
    console.log('Server listening on port :3001');
});*/