import React from 'react'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';
import TodoList from '../components/TodoList';
import TodoLoader from '../components/TodoLoader';
import { showConfirmModal } from '../utils/showModal';

const TodoDashboard = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [todos, setTodos] = useState([])
    const [todoInput, setTodoInput] = useState("")
    const [formError, setFormError] = useState({
        isError: false,
        errorMessage: null,
    });
    const [todoIdToUpdate, setTodoIdToUpdate] = useState(null)

    const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME

    const fetchTodo = () => {
        const todoDatabase = getLocalStorage(todo_ls_name)
        setTodos(todoDatabase)
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const handleEditMode = (todoId) => {
        setIsEditMode(true)
        setTodoIdToUpdate(todoId)
        const todoDatabase = getLocalStorage(todo_ls_name)
        // Find the exact todo to edit
        const todoToUpdate = todoDatabase?.find((todo) => todo.id === todoId)
        if (!todoToUpdate) {
            return
        }

        // todoInput.focus()
        // todoInput.value = todoToUpdate.todoName
        setTodoInput(todoToUpdate.title)
    }

    // Update
    const updateTodo = () => {
        console.log('clicked!');
        if (!todoInput) {
            setFormError({
                isError: true,
                errorMessage: "Todo title cannot be empty",
            })
            return
        }

        // Read the local storage
        const todoDatabase = getLocalStorage(todo_ls_name)
        // Find the todo's index
        const todoIndex = todoDatabase.findIndex((todo) => todo.id === todoIdToUpdate);
        if (todoIndex !== -1) {
            // Update the todo with the edited task
            todoDatabase[todoIndex].title = todoInput;
            // Store in local storage
            setLocalStorage(todo_ls_name, todoDatabase);
            setIsEditMode(false)
            setTodoInput("")
            fetchTodo()
        }
    }

    // Create a todo
    const createTodo = (event) => {
        try {
            event.preventDefault()
            if (!todoInput) {
                setFormError({
                    isError: true,
                    errorMessage: "You must enter a todo!"
                })

                setTimeout(() => {
                    setFormError({
                        isError: false,
                        errorMessage: null
                    })
                }, 5000)
                return
            }
            // New todo the user creates
            const newTodo = {
                title: todoInput,
                id: uuidv4(),
                createdAt: Date.now()
            }

            const todoDatabase = getLocalStorage(todo_ls_name)
            // Store new todo in the database.
            todoDatabase?.push(newTodo);

            // Store back in the localstorage
            setLocalStorage(todo_ls_name, todoDatabase);
            fetchTodo()
            setTodoInput("")

            // // Update the UI
            // displayNewTodos("#todos", generateTodoTemplate)
            // // Reset form value
            // todoInput = ""
        } catch (error) {
            console.log(error.message);
        }

    }

    // Delete a todo
    const deleteTodo = (todoId) => {
        const handleDeleteTodo = () => {
            // Read the local storage
            const todoDatabase = getLocalStorage(todo_ls_name)
            // Delete the actual todo
            const newTodoDatabase = todoDatabase.filter((todo) => todo.id !== todoId)
            // Store in local storage
            setLocalStorage(todo_ls_name, newTodoDatabase)
            // Render updated todo
            fetchTodo()
        }

        showConfirmModal({
            title: 'Delete Todo',
            text: 'Do you want to delete this todo?',
            icon: 'warning',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            callback: handleDeleteTodo
        })

    }

    useEffect(() => {
        fetchTodo()
    }, [])


    return (
        <div className="mx-auto max-w-[65%] bg-[white] rounded-lg">
            <header className="bg-[#F99417] rounded-lg">
                <h1 className="text-center text-[2rem] font-bold my-3 mb-5 rounded-lg italic">TODOLIST</h1>
            </header>
            <main className="main shadow-xl border border-solid border-t-0 min-h-[95vh] px-5">
                <form className="flex flex-row justify-between mb-2 pb-3 border-b border-gray-400" onSubmit={(event) => createTodo(event)}>
                    <div className="w-[50%]">
                        <input type="text" placeholder="Type in your todo here" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} className="w-full px-3 py-1 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none" />
                        {/* Error message */}
                        {formError?.isError && (<span className="text-red-500 block">{formError.errorMessage}</span>)}
                    </div>
                    {isEditMode ? (<button type="button" className="self-start bg-[#4D4C7D] text-[white] px-3 py-2 rounded-lg" onClick={updateTodo}>Update todo</button>)
                        : (<button className="self-start bg-green-700 text-[white] px-3 py-2 rounded-lg ">Add todo</button>)}
                </form>
                {!isLoading && todos.length === 0 && (<p className="text-center text-gray-600 my-auto">Your todos will appear here when you add them</p>)}

                {/* Todo section */}
                {isLoading ? 
                (<section className='flex flex-col gap-2'>
                    <TodoLoader /> 
                    <TodoLoader /> 
                    <TodoLoader />
                </section>):

                    (<>
                        <div className="h-[70vh]">
                            {todos?.sort((a, b) => b.createdAt - a.createdAt).map(({ id, title, createdAt }) => {
                                return (
                                    <>
                                        <TodoList
                                            id={id}
                                            title={title}
                                            createdAt={createdAt}
                                            key={`todo-list-${id}`}
                                            handleEditMode={handleEditMode}
                                            deleteTodo={deleteTodo}
                                        />
                                    </>)
                            })
                            }</div>
                    </>)}
            </main>
        </div>

    );
}

export default TodoDashboard
