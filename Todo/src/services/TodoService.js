import axios from 'axios'
const todosURL = 'http://localhost:3001/api/todo'
const deletedURL = 'http://localhost:3001/api/deleted'

const getAllDeleted = ()=>{
    return axios.get(deletedURL)
}

const getAllTodos = () =>{
    return axios.get(todosURL)
}

const createTodo = newObject =>{
    return axios.post(todosURL, newObject)
}

const createDeleted = newObject =>{
    return axios.post(deletedURL, newObject)
}

const deleteTodo = (id) =>{
    return axios.delete(`${todosURL}/${id}`)
}

export default {
    getAllDeleted: getAllDeleted,
    getAllTodos: getAllTodos,
    createTodo: createTodo,
    createDeleted: createDeleted,
    deleteTodo: deleteTodo
}