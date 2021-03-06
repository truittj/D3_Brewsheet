import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import ToDoList from "./ToDoList";
import StartData from "./FormInitialData"
import { set, local } from "d3";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App () {
    const [ todos, setTodos ] = useState([])
    const [ docElms, setDocElms ] = useState([])
    const todoNameRef = useRef()
    const docElmsRef = useRef()

    useEffect (()=> {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])
    
    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodos(e) {
        const name = todoNameRef.current.value
        if (name === '') return 
        setTodos(prevTodos => {
            return [...prevTodos, 
                { 
                    id: uuidv4(), 
                    name: name, 
                    complete: false
                }]
            })
        todoNameRef.current.value = null
    }

    function handleAddDocElems(e) {
        const name = docElmsRef.current.value
        if (name === '') return 
        setDocElms(prevDocElms => {
            return [...prevDocElms, 
                { 
                    id: uuidv4(), 
                    name: name, 
                    complete: false
                }]
            })
            docElmsRef.current.value = null
    }

    function handleClear() {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    return (
    <>
        <StartData 
            onSubmit={handleAddDocElems}
            
            />
        <ToDoList todos={todos} toggleTodo={toggleTodo} />
        
        <input ref={todoNameRef} type="text" />
        <button onClick={handleAddTodos}>Add ToDo</button>
        <button onClick={handleClear}>Clear Completed Todos</button>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    );
}
export default App; 

