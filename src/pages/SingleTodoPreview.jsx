import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLocalStorage } from '../utils/local-storage'
import TodoLoader from '../components/TodoLoader'
import parse from 'html-react-parser';

const SingleTodoPreview = () => {
  const [todo, setTodo] = useState('')
  const { currentTodoId } = useParams()
  // const params = useParams()
  // console.log(params);  //{id: stringvalue passed} where id is what is passed in the web address i.e. /:id. id can be "todo-id" or whatever you call it

  useEffect(() => {
    const getCurrentTodo = () => {
      const todo_ls_name = process.env.REACT_APP_TODO_LOCAL_STORAGE_NAME
      const todoDatabase = getLocalStorage(todo_ls_name)
      const currentTodo = todoDatabase.find(todo => todo.id === currentTodoId)
      setTimeout(() => {
        setTodo(currentTodo)
      }, 1000)
    }
    if (currentTodoId) {
      getCurrentTodo();
    }
  }, [currentTodoId])

  return (
    <div className="mx-auto max-w-[65%] bg-[white] rounded-lg">
      {/* Header */}
      <header className="bg-[#F99417] rounded-lg">
        <h1 className="text-center text-[2rem] font-bold my-3 mb-5 border-b border-gray-400 rounded-lg italic">
          TODOLIST
        </h1>
      </header>
      {/* Main */}
      <main className="main shadow-xl border border-solid min-h-[95vh] px-5">
        {/* Todo Area */}
        {!todo ? 
        <TodoLoader /> : 
        (<div id="preview-todo-container" className="h-[70vh]">
          <section>
            <div className="mb-3 flex flex-row justify-between px-2 py-2 rounded-lg border-b-[2px]">
              {/* Todo input value */}
              <button className="text-lg font-medium truncate max-w-sm" id="todo-preview-name">{todo.title}
              </button>
              {/* edit icon */}
              <div className="flex justify-between">
                <button className="mr-[1rem] border border-gray-400 p-1 rounded-full align-self-start"
                // onClick={updatePreviewTodo('${id}')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-green-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                {/* Delete icon */}
                <button
                  // onClick={deleteTodo('${id}')}
                  className="border border-gray-400 p-1 rounded-full align-self-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
          <section className="flex gap-20 w-full border border-gray-300 py-2 px-3 rounded-lg text-sm" id="todo-description">
            <p className id="todo-preview-desc">{todo.description || parse(`<span className="text-center text-gray-400 italic text-lg">Your description will appear here</span>`)}</p>
          </section>
          {/* Date */}
          <section className="mt-3">
            <span className="mr-2 text-xs">{new Date(todo.createdAt).toDateString()}</span>
            <span className="mr-2">·</span>
            <span className="bg-red-600 rounded-full px-2 py-0.5">pending</span>
          </section>
          <section className="flex flex-row items-center justify-center mt-4">
            <a href="./index.html" className="flex flex-row justify-center">
              <button className>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-slate-600 hover:text-slate-800">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <Link to="/">
                <span className="text-sm ml-2">View all todos</span>
              </Link>
            </a>
          </section>
        </div>)}

      </main>
    </div>
  )
}

export default SingleTodoPreview
