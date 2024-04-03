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

  const onInputChange= (event)=>{
    event.preventDefault()
    setInput(event.target.value)
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    const newObject = {
      name: input,
      date: `${new Date().getDay()}/${new Date().getMonth()+1}`,
      description: "Placeholder Description",
      id: todos.length>0?String(Number(todos[todos.length-1].id) + 1): "1"
    }
    console.log(newObject)
    setTodos(todos.concat(newObject))
    setInput('')
  }

  const handleDelete = (event) =>{
    event.preventDefault()
    setTodos(todos.filter(element=>element.name !== event.target.value))
  }

  // const handleUp = (event) =>{
  //   event.preventDefault()
  //   if(event.button.value === "1"){
  //     return
  //   }else{
  //     let copy = [...todos]
  //     const place = Number(event.button.value)-1
  //     const one = copy[place]
  //     const two = copy[place-1]
  //     copy.splice(place-1,2,one,two)
  //     console.log(copy)
  //     setTodos(copy)
  //   }
    
  // }
  return (
    <>
      <div className="TodoAppContainer">
        <div className="TodosContainer">
          <Input handleSubmit={handleSubmit} input={input} onInputChange={onInputChange} />
          {todos.map(element=>{
            return(
              <div key={element.id} className="TodoElement">
                <div className="TodoObject">
                  <p className="TodoText">{element.date} - {element.name}</p>
                  <button value={element.name} onClick={handleDelete} className="DeleteButton">✓</button>
                </div>
                <div className="TodoDescription">
                  <p className="TodoDescText">{element.description}</p>
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
