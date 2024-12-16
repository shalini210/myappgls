import React from 'react'
import { useRef } from 'react';
import axios from 'axios';
import { useState ,useEffect} from 'react';


export default function Task() {
  const [dbtasks,setdbtasks ]= useState([])
    const [tasks,settasks]=useState();
    let tasknameref = useRef("");
    let gettasks =()=>
    {     
      let tui = dbtasks.map((task)=><tr><td>{task.taskname}</td> <td>{task.status}</td></tr>)
      axios.get("http://localhost:8080/task")
      .then((d)=>
      {
          setdbtasks(d.data)
      })
      .catch(()=>console.log("err"))
      settasks(tui)
    }
    
    useEffect(  gettasks,[dbtasks] )


    const addTask = ()=>
    {
        var data = {name:tasknameref.current.value}
        console.log(data);
        axios.post("http://localhost:8080/task",data)
        .then(()=>
        {
         gettasks()
        })
        .catch(()=>console.log("err"))
    }
  return (
    <>
    <div>        
        <p>TaskName :
            <input type="text" ref={tasknameref}/>
        </p>
        <input type="button" value="add task" onClick={()=>addTask()}/>
   
<table>
  {tasks}
</table>
    
    </div>
    </>
  )
}
