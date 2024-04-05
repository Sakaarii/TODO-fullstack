const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://samuelpaunonenn:duuo66655@cluster0.sgbvsem.mongodb.net/todoObjects?retryWrites=true&w=majority&appName=Cluster0")

TodoObject = mongoose.model('TodoObject', {
    name: String,
    id: String,
    description: String,
    date: String,
    editable: Boolean
})

DeleteObject = mongoose.model('DeleteObject', {
    name: String
})

TodoObject.findOneAndDelete

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))



// Define a GET route
app.get('/api/todo', (req, res) => {
    TodoObject.find({}).then(result => {
        res.json(result)
    })
});

// Define a POST route
app.post('/api/todo', (req, res) => {
    const todo = req.body
    TodoObject(todo).save().then(result => {
        res.json(result)
    })
});

app.put('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    const todo = req.body
    TodoObject.findOneAndUpdate({id:id}, todo).then(result => {
        res.json(result)
    })
})

// Define a GET route
app.get('/api/deleted', (req, res) => {
    DeleteObject.find({}).then(result => {
        res.json(result)
    })
});

// Define a POST route
app.post('/api/deleted', (req, res) => {
    const removed = req.body
    DeleteObject(removed).save().then(result => {
        res.json(result)
    })
});



// Define a DELETE route
app.delete('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    TodoObject.findOneAndDelete({id:id}).then(result => {
        res.status(204).end()
    })
});

const PORT = 3001
// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});