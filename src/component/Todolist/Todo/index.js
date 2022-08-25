import React, { useState, useRef } from "react"

// icons
import deleteIcon from "./../../../../static/garbage-can.svg"
import editIcon from "./../../../../static/pencil.svg"
import doneIcon from "./../../../../static/done.svg"
// Todo
const Todo = ({ task, refreshTodos }) => {
  const [editing, setEditing] = useState(false)
  const [taskToUpdate, setTaskToUpdate] = useState(task)
  const inputEl = useRef(null)

  // Handlers
  const handleChange = e => {
    setTaskToUpdate({ ...task, text: e.target.value })
  }

  const handleEdit = () => {
    setEditing(true)
    inputEl.current.focus() // Focus the input field
  }

  // Functions
  const updateTodo = async () => {
    try {
      await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(taskToUpdate),
      })
      setEditing(false)
    } catch (error) {
      console.error("Error occured: ", error)
    }
  }

  const deleteTodo = async () => {
    const id = task._id

    try {
      await fetch("/api/deleteTodo", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      })
      refreshTodos()
    } catch (error) {
      console.error("Error occured: ", error)
    }
  }

  // Sub Components
  const editButton = editing ? (
    <a
      onClick={updateTodo}
      className="text-indigo-600 text-base p-1 hover:text-indigo-900 cursor-pointer"
    >
      <img src={doneIcon} alt="done" className="min-w-5 h-5 inline" />
    </a>
  ) : (
    <a
      onClick={handleEdit}
      className="text-indigo-600 text-base p-1 hover:text-indigo-900 cursor-pointer"
    >
      <img src={editIcon} alt="edit" className="min-w-5 h-5 inline" />{" "}
    </a>
  )

  const todoText = editing ? (
    <input
    className="text-sm text w-full px-2 ml-2 font-medium  focus:ring focus:border-blue-300 overflow-scroll  font-medium outline-none text-gray-900"
      value={taskToUpdate.text}
      onChange={handleChange}
      ref={inputEl}
    />
  ) : (
    <input
    className="text-sm px-2 w-full  ml-2 font-mediumcursor-default font-medium overflow-scroll overflow-scroll  outline-none text-gray-900"
      value={taskToUpdate.text}
      onChange={handleChange}
      readOnly
      ref={inputEl}
    />
  )

  // Return
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                    <div className="ml-4">{todoText}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center justify-end text-right text-sm font-medium">
                    {editButton}
                    <a onClick={deleteTodo}
                      className="text-indigo-600 text-base p-2 hover:text-indigo-900 ml-4 cursor-pointer"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Todo