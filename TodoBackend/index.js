const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let todos = [
]

let deleted = [
]

// Define a GET route
app.get('/api/todo', (req, res) => {
    res.json(todos)
});

// Define a POST route
app.post('/api/todo', (req, res) => {
    const todo = req.body
    todos = todos.concat(todo)
    res.json(todo)
});

// Define a GET route
app.get('/api/deleted', (req, res) => {
    res.json(deleted)
});

// Define a POST route
app.post('/api/deleted', (req, res) => {
    const removed = req.body
    deleted = deleted.concat(removed)
    res.json(removed)
});



// Define a DELETE route
app.delete('/api/todo/:id', (req, res) => {
    const id = req.params.id;
    todos = todos.filter(element => element.id !== id)
    res.status(204).end()
});

const PORT = 3001
// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});