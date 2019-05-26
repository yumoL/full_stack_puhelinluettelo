const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://lym:${password}@cluster0-xkimt.mongodb.net/puhelinluettelo?retryWrites=true`
mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 5) {

    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(() => {
        console.log(`Lisätään ${name} numero ${number} luetteloon`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('Puhelinluettelo:')
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}


