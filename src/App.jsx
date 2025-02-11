import "./App.css";
import { useState } from "react"
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";

export default function App() {
  // Data ( Model )
  const [modalIndex, setModalIndex] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  
  const [tasks, setTasks] = useState([
    { title: "Learn React", description: "Complete React course", completed: false },
    { title: "Build Project", description: "Create a todo list app", completed: true },
  ]);

  // edit task
  const openTaskToEdit = (index) => {
    setEditTaskIndex(index);
    setModalIndex(true);
    setNewTaskTitle(tasks[index].title);
    setNewTaskDescription(tasks[index].description);
  }

  // Controller
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTaskTitle.trim() !== "" && newTaskDescription.trim() !== "") {
      let newTaskObj = { 
        title: newTaskTitle, 
        description: newTaskDescription, 
        completed: false 
      };
      setTasks([...tasks, newTaskObj]);
      // Reset form
      event.target.reset();
      setNewTaskTitle("");
      setNewTaskDescription("");
      Swal.fire({
        icon: "success",
        text: "New Task Added Successfully!",
        timer: 1200
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Please Fill All Task Details",
        timer: 1500
      });
    }
  }

  const toggleComplete = (index) => {
    let copy = [...tasks];
    copy[index].completed = !copy[index].completed;
    setTasks(copy);
  }

  const handleDelete = (index) => {
    Swal.fire({
      title: 'Are you sure you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks(tasks.filter((_, i) => i !== index));
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        )
      }
    })
  }

  const saveChanges = (event) => {
    event.preventDefault();
    if (newTaskTitle.trim() !== "" && newTaskDescription.trim() !== "") {
      let newTaskObj = { 
        title: newTaskTitle, 
        description: newTaskDescription,
        completed: tasks[editTaskIndex].completed 
      };
      let copy = [...tasks];
      copy[editTaskIndex] = newTaskObj;
      setTasks(copy);
      setModalIndex(false);
      Swal.fire({
        icon: "success",
        text: "Task Updated Successfully!",
        timer: 1200
      });
    }
  }

  // View
  return (
    <div className="container py-5 App">
      <title>Todo List</title>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <form className="bg-white border rounded shadow p-4 mb-4" onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">Add New Task</h2>
            <div className="mb-3">
              <input 
                onChange={(event) => setNewTaskTitle(event.target.value)}
                className="form-control" 
                type="text" 
                placeholder="Enter Task Title"
              />
            </div>
            <div className="mb-3">
              <textarea 
                onChange={(event) => setNewTaskDescription(event.target.value)}
                className="form-control" 
                placeholder="Enter Task Description"
                rows="3"
              ></textarea>
            </div>
            <button className="btn btn-info w-100">Add Task</button>
          </form>

          <div className="task-list">
            {tasks.map((task, index) => (
              <div key={index} className={`task-item p-3 mb-3 rounded shadow-sm ${task.completed ? 'bg-success' : 'bg-white'}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <input 
                      type="checkbox"
                      className="form-check-input"
                      checked={task.completed}
                      onChange={() => toggleComplete(index)}
                    />
                    <label className={`form-check-label ${task.completed ? 'text-decoration-line-through' : ''}`}>
                      {task.title}
                    </label>
                  </div>
                  <div>
                    <button 
                      className="btn btn-warning btn-sm mx-2"
                      onClick={() => openTaskToEdit(index)}
                    >
                      <MdEdit />
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
                <p className="mb-0 mt-2 text-muted">{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalIndex ? (
        <div className="ourModal d-flex justify-content-center align-items-center" onClick={() => setModalIndex(false)}>
          <form onSubmit={saveChanges} onClick={(event) => event.stopPropagation()} className="bg-dark border rounded shadow col-12 col-md-6 p-4 animate__animated animate__fadeInDown">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-white">Edit Task</h2>
              <IoMdCloseCircle className="text-danger fs-2" style={{cursor: 'pointer'}} onClick={() => setModalIndex(false)} />
            </div>
            <div className="mb-3">
              <input 
                defaultValue={tasks[editTaskIndex].title}
                onChange={(event) => setNewTaskTitle(event.target.value)}
                className="form-control"
                type="text"
                placeholder="Enter Task Title"
              />
            </div>
            <div className="mb-3">
              <textarea 
                defaultValue={tasks[editTaskIndex].description}
                onChange={(event) => setNewTaskDescription(event.target.value)}
                className="form-control"
                placeholder="Enter Task Description"
                rows="3"
              ></textarea>
            </div>
            <button className="btn btn-primary w-100">Save Changes</button>
          </form>
        </div>
      ): null
      }
    </div>
  );
}
