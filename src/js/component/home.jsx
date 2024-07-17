import React, { useEffect } from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("")
	const [misTareas, setMisTareas] = useState([])

	const handleCreateTask = () => {
		setMisTareas([...misTareas, tarea])
		setTarea("")
	}

	useEffect(()=>{
		createUser()
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
		.then(resp => resp.json())
		.then(data => data)
		.catch(error => console.log(error))

	}

	const viewUserTodo = () => {
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


	return (
		<div className="text-center">
			<h1>TODO LIST </h1>
			<input type="text" onChange={(e)=>setTarea(e.target.value)} value={tarea}/>
			<button onClick={()=>createTodo(tarea)}>Añadir tarea</button>
			<ul>
				{misTareas.map((posicion)=>(<div>
					<li>{posicion}</li>
					<button onClick={()=>setMisTareas(misTareas.filter((item)=>item !== posicion))}>Eliminar</button>
					</div>))}
			</ul>
		</div>
	);
};

export default Home;
