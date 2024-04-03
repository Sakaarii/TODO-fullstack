import { useState } from "react"


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
  const [editable, setEditable] = useState([])

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
      id: todos.length>0?String(Number(todos[todos.length-1].id) + 1): "1"
    }
    console.log(newObject)
    setEditable(editable.concat(true))
    setTodos(todos.concat(newObject))
    setInput('')
  }

  // Handles the ability to delete the todo
  const handleDelete = (event) =>{
    event.preventDefault()
    const index = todos.findIndex(element=>element.name === event.target.value)
    setEditable(editable.filter((element, i)=>i !== index))
    setTodos(todos.filter(element=>element.name !== event.target.value))
  }

  // Handles the ability to edit the description of the todo
  const handleEdit = (event, index) =>{
    event.preventDefault()
    const copy = [...editable]
    copy[index] = !editable[index]
    setEditable(copy)
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
        <p className="NavTitle">History</p>
      </nav>
      <div className="</div>TodoAppContainer">
        <div className="TodosContainer">
          <Input handleSubmit={handleSubmit} input={input} onInputChange={onInputChange} />
          {todos.map((element,index)=>{
            return(
              <div key={element.id} className="TodoElement">
                <div className="TodoObject">
                  <p className="TodoText">{element.date} - {element.name}</p>
                  <button value={element.name} onClick={handleDelete} className="DeleteButton">✓</button>
                </div>
                <div className="TodoDescription">
                  <textarea className="TodoDescText" spellCheck='false' readOnly={editable[index]} value={todos[index].description} onChange={(event)=>{handleDesc(event, index)}}></textarea>
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
