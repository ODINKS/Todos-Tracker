import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import TodoDashboard from './pages/TodoDashboard';
import SingleTodoPreview from './pages/SingleTodoPreview';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<TodoDashboard />} />
        <Route path='/todo/:currentTodoId' element={<SingleTodoPreview />} />
      </Routes>
    </>
  );
}

export default App;
