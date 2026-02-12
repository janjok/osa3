const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    Person
        .find({})
        .then(result => {
            console.log('phonebook:')
            result.forEach(p => {
                console.log(p.name, p.number)
            })
            mongoose.connection.close()
        })
} else if(process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person
        .save()
        .then(result => {
            console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
            mongoose.connection.close()
        })
    
}

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const password = process.env.PASSWORD

const url = `mongodb+srv://fullstack:${password}@cluster0.etwnlux.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

module.exports = mongoose.model('Person', personSchema)