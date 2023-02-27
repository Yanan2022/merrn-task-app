import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { Task } from "./Task"
import TaskForm from "./TaskForm"
import axios, { Axios } from "axios"
import { URL } from "../App";


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        completed: false
    });

    const {name} = formData
    const handleInputChange = (e)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }

    const getTasks = async ()=>{
        setIsLoading(true);
        try {
           const {response} = await axios.get(`${URL}/api/tasks`);
           console.log(response);
           setIsLoading(false)
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getTasks()
    }, [])
    
    
   
    const createTask = async (e)=>{
        e.prefentDefault();
        if (name === "") {
            return toast.error("Input field cannot be empty")
        }

        

        try {
            await axios.post(`${URL}/api/tasks`, formData)
                            setFormData({...formData, name : ""})

           toast.success('Ajout reussi');                 
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div>
        <h2>Task Manager</h2> 
        <TaskForm name={name} 
            handleInputChange={handleInputChange} 
            createTask={createTask}
        /> 
        <div className="--flex-between --pb">
            <p>
                <b>Total Tasks: </b> 1
            </p> 
            <p>
                <b>Completed Tasks: </b> 1
            </p> 
        </div>
        <hr/>
        <Task/> 
    </div>
  )
}

export default TaskList