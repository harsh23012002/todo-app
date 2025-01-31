import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
function App() {

  const [todo,setTodo]=useState("")
  const [todos,setTodos]=useState([])
  const [showFinished,setshowFinished] = useState(true)

  useEffect(() => { 
   let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos =JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
    }, [])
    
  const saveToLS =(params)=>{
    localStorage.setItem("todos", JSON.stringify(todos) )
  }

  const toggleFinished =(e) =>{
    setshowFinished(!showFinished)
  }


  const handleEdit=(e,id)=>{
      let t=todos.filter(i=>i.id === id)
      setTodo(t[0].todo)
      let newTodos =todos.filter(item=>{
        return item.id!==id
      })
      setTodos(newTodos)
      saveToLS()
    }

  const handleDelete=(e, id)=>{
      let newTodos= todos.filter(item=>{
        return item.id!==id
      }) 
      setTodos(newTodos)
      saveToLS()
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
 
  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id ===id;
    }) 
      let newTodos=[...todos];
      newTodos[index].isCompleted= !newTodos[index].isCompleted;
      setTodos(newTodos)
      saveToLS()
  }

  return (
    <>
    <Navbar />
    <div className="md:container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
    <h1 className='font-bold text-center text-2xl'>iTask- Manage your todos at  one place</h1>
    <div className='addtodo my-5 flex flex-col gap-4'>
    <h2 className='text-2xl font-bold'>Add a Todo</h2>   
    <div className="flex">
    <input  onChange={handleChange} value={todo}  type="text" className='w-full bg-white rounded-full px-5  py-1'/>
    <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 font-bold
     p-3 py-1 text-sm text-white disabled:bg-violet-700 rounded-full mx-2'>Save</button>
    </div>
    </div>
    <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
    <label  className='mx-2' htmlFor="show">Show Finished</label>
    <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
    <h2 className='text-2xl font-bold'>Your Todos</h2>  
    <div className='todos'>
      {todos.length===0 && <div className='m-5' >No Todos is display</div>}
      {todos.map(item=>{

    return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
      <div className='flex gap-5'>
      <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id='' />
      <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
      </div>
      <div className='buttons flex h-full'>
      <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 font-bold
       p-2 py-1 text-sm text-white rounded-md mx-1'><FaEdit /></button>
      <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 font-bold 
      p-2 py-1 text-sm text-white rounded-md mx-1'><MdDeleteForever /></button>
      </div>
      </div> 
    })}
    </div>
  </div>
    </>
  );
}

export default App;
