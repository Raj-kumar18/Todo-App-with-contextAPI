import { useState,useEffect } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import { TodoForm, TodoItem } from './components'


function App() {
  const [todos, setTodo] = useState([])

  const addTodo = (todo) => {
    setTodo((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id,todo)=>{
    setTodo((prev)=> prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id)=>{
    setTodo((prev) => prev.filter((todo)=> todo.id !== id))
  }

  const toggleComplete = (id)=>{
    setTodo((prev)=> prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo,completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodo(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  
  


  return (
    <>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div class="relative min-h-screen py-8 h-full w-full bg-slate-950"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
      
        
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              <TodoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo}/>
                </div>
              ))}
            </div>
          </div>
          </div>
          </div>
      </TodoProvider>
    </>
  )
}

export default App
