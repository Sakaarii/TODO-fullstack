import axios from 'axios'
const todosURL = '/api/todo'
const deletedURL = '/api/deleted'

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

const updateTodo = (id, newObject) =>{
    return axios.put(`${todosURL}/${id}`, newObject)
}


const deleteTodo = (id) =>{
    return axios.delete(`${todosURL}/${id}`)
}

export default {
    getAllDeleted: getAllDeleted,
    getAllTodos: getAllTodos,
    createTodo: createTodo,
    createDeleted: createDeleted,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo
}