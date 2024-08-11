import {useState, useEffect} from 'react'
import TodoInput from './components/TodoInput.jsx';
import TodoList from './components/TodoList.jsx';
import Header from './components/Header.jsx';



function App() {
  
  //creates todos which is an array of all tasks
  const [todos, setTodos ] = useState([])

  //creates tooValue which is the value that is added to the list from add/input
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({ todos: newList}))
  }

  //handles input and add button
  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  //handles delete button
  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)

    setTodos(newTodoList)
  }

  //handles edit button
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  //allows local variables to be saved when page is refreshed
  useEffect(() => {
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  
  }, [])
  
  return (
    <>
        <Header />
        <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
        <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />       
    </>
  )
} 

export default App
