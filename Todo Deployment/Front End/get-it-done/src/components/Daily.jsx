import React, { useState } from 'react'
import './styles.css'
import TaskList from './TaskList'

function Daily() {
    const [input, setInput] = useState('')
    console.log(input, "input")
    return (
        <div className='Main'>
            <h2>TASKS</h2>
            <TaskList />

           
        </div>
    )
}

export default Daily