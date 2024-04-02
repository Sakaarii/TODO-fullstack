import { useState } from "react"


const Input = ({onInputChange, input, handleSubmit})=>{
  return(
    <>
      <form action='submit' onSubmit={handleSubmit}>
        <input value={input} onChange={onInputChange}/>
      </form>
    </>
  )
}

const App =()=> {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])

  const onInputChange= (event)=>{
    event.preventDefault()
    setInput(event.target.value)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    const newObject = {
      name: input,
      id: todos.length>0?String(Number(todos[todos.length-1].id) + 1): "1"
    }
    setTodos(todos.concat(newObject))
    setInput('')
  }

  const handleDelete = (event) =>{
    event.preventDefault()
    setTodos(todos.filter(element=>element !== event.target.value))
  }

  const handleUp = (event) =>{
    event.preventDefault()
    const copy = [...todos]
    const place = Number(event.button.value)-1
    const popped = copy.splice(place,1)
    copy.splice(place-1,0,popped)
    setTodos(copy)
  }
  return (
    <>
      <Input handleSubmit={handleSubmit} input={input} onInputChange={onInputChange} />
      {todos.map(element=>{
        return(
          <div key={element.id}>
            <p>{element.name} <button value={element.name} onClick={handleDelete}>delete</button><button value={element.id} onClick={handleUp}>up</button></p>
          </div>
        )
      })}
    </>
  )
}

export default App
