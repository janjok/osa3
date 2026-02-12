const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/mongo')

app.use(express.static('dist'))

morgan.token('body', request => {
    return JSON.stringify(request.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.etwnlux.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const newId = () => {
    let max = persons.length
    max += 1
    return String(max)
}

app.get('/api/persons/', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/info', (request, response) => {
    const date = Date()

    response.send(`Phonebook has info for ${persons.length} people <br/> ${date}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if(!body.name){
        return response.status(400).json({
            error: 'name must be added'
        })
    } else if(!body.number){
        return response.status(400).json({
            error: 'number bust be added'
        })
    } else if(persons.some(p => p.name === body.name)){
        return response.status(400).json({
            error: 'name bust be unique'
        })
    } else {
        const person = {
        name: body.name,
        number: body.number,
        id: newId()
        }
        persons = persons.concat(person)
        response.json(person)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})