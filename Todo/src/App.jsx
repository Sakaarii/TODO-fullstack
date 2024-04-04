import { useEffect, useState } from "react"
import TodoService from "./services/TodoService"


// eslint-disable-next-line react/prop-types
const Input = ({onInputChange, input, handleSubmit})=>{
  return(
    <>
      <form action='submit' onSubmit={handleSubmit} className="TodoForm">
        <input value={input} onChange={onInputChange} className="TodoBar"/>
      </form>
    </>
  )
}

const App =()=> {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])
  const [history, setHistory] = useState([])

  useEffect(()=>{
    TodoService
      .getAllTodos()
      .then(response=>{
        setTodos(response.data)
      })
    TodoService
      .getAllDeleted()
      .then(response=>{
        setHistory(response.data)
      })
  }, [])

  // handles the change of the main input bar
  const onInputChange= (event)=>{
    event.preventDefault()
    setInput(event.target.value)
  }

  // Handles the submitting of a new todo
  const handleSubmit = (event) =>{
    event.preventDefault()
    const newObject = {
      name: input,
      date: `${new Date().getDay()}/${new Date().getMonth()+1}`,
      description: "This is a description",
      id: todos.length>0?String(Number(todos[todos.length-1].id) + 1): "1",
      editable: true
    }
    TodoService
      .createTodo(newObject)
      .then(response=>{
        setTodos(todos.concat(response.data))
        setInput('')
      })
  }

  // Handles the ability to delete the todo
  const handleDelete = (event, id) =>{
    event.preventDefault()
    const index = todos.findIndex(element=>element.name === event.target.value)
    const deleteObject = {
      name: todos[index].name
    }
    TodoService
      .createDeleted(deleteObject)
      .then(response=>{
        setHistory(history.concat(response.data))
      })
    TodoService
      .deleteTodo(id)
      .then(response=>{
        setTodos(todos.filter(element=>element.name !== event.target.value))
      })
  }

  // Handles the ability to edit the description of the todo
  const handleEdit = (event, index) =>{
    event.preventDefault()
    const copy = [...todos]
    copy[index].editable = !todos[index].editable
    setTodos(copy)
  }

  // Handles the description of the todo
  const handleDesc = (event, index) =>{
    event.preventDefault()
    const newTodos = [...todos]
    newTodos[index].description = event.target.value
    setTodos(newTodos)
  }

  return (
    <>
      <nav className="NavBar">
        <div className="NavDiv">
          <p className="NavTitle">✓</p>
          <div className="NavHistory">
            {history.map((element,index)=>{
              return(
                <div key={element.name} className="HistoryElement">
                  <p className="HistoryText">{element.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </nav>
      <div className="</div>TodoAppContainer">
        <div className="TodosContainer">
          <Input handleSubmit={handleSubmit} input={input} onInputChange={onInputChange} />
          {todos.map((element,index)=>{
            return(
              <div key={element.id} className="TodoElement">
                <div className="TodoObject">
                  <p className="TodoText">{element.date} - {element.name}</p>
                  <button value={element.name} onClick={(event)=>{handleDelete(event, element.id)}} className="DeleteButton">✓</button>
                </div>
                <div className="TodoDescription">
                  <textarea className="TodoDescText" spellCheck='false' readOnly={element.editable} value={todos[index].description} onChange={(event)=>{handleDesc(event, index)}}></textarea>
                  <button className="EditButton" onClick={(event)=>{handleEdit(event, index)}}>✎</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
