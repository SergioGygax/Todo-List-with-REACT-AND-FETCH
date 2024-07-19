import React, { useEffect } from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("")
	const [misTareas, setMisTareas] = useState([])

	// const handleCreateTask = () => {
	// 	setMisTareas([...misTareas, tarea])
	// 	setTarea("")
	// }

	useEffect(()=>{
		createUser()
		viewUserTodos()
	},[])

	const createUser = () => {
		fetch("https://playground.4geeks.com/todo/users/SergioAnez", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify()
		})
		.then(resp => resp.json())
		.then(data => data)
		.catch(error => console.log(error))

	}

	const createTodo = (todo) => {
		fetch("https://playground.4geeks.com/todo/todos/SergioAnez", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				label: todo,
				is_done: false
			  })
		})
		.then(resp => {
			if(resp.ok){
				viewUserTodos()
			}
			resp.json()})
		.then(data => data)
		
		.catch(error => console.log(error))

	}

	const viewUserTodos = () => {
		fetch("https://playground.4geeks.com/todo/users/SergioAnez")
		.then(resp => resp.json())
		.then(data => setMisTareas(data.todos))
		.catch(error => console.log(error))
	}

	const deleteTodo = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify()
		})
		.then(resp => {
			if(resp.ok){
				viewUserTodos()
			}
			resp.json()})
		.then(data => data)
		.catch(error => console.log(error))
	}

	const handleCreateTask = () => {
		createTodo(tarea)
		setTarea("")
		// viewUserTodos()
	}

	const handleDeleteTask = (id) => {
		deleteTodo(id)
	}

	return (
		<div className="text-center">
			<h1>TODO LIST </h1>
			<input type="text" onChange={(e)=>setTarea(e.target.value)} value={tarea}/>
			<button onClick={()=>handleCreateTask()}>Añadir tarea</button>
			<ul>
				{misTareas.map((posicion)=>(<div key={posicion.id}>
					<li>{posicion.label}</li>
					<button onClick={()=>handleDeleteTask(posicion.id)}>Eliminar</button>
					</div>))}
			</ul>
		</div>
	);
};

export default Home;
