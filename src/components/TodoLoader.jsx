import React from 'react'

const TodoLoader = () => {
    return (
        <section className="">
            <div className="mb-3 flex flex-row justify-center px-2 py-4 bg-gray-200 animate-pulse rounded-lg border-b-[2px]">
                <p>Loading todos ... please wait</p>
            </div>
        </section>
    )
}

export default TodoLoader
