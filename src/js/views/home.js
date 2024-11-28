import React, { useState, useEffect, useContext } from "react";
import TaskList from "../component/taskList.jsx";

import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [input, setInput] = useState('');

	function CreateUser(){
		fetch('https://playground.4geeks.com/contact/agendas/' + input, {
			method: 'POST'
		})
		.then(response => {
			if (response.ok) {
				actions.addAgenda(input, [])
			}
			else{
				throw new Error('Failed to crate user');
			}
		})
		.catch(error => {
			console.error(error);
		});
	}

	const handleKeyPress = (e) =>{
		if (e.keyCode === 13){
			CreateUser();
		}
	}

	return (
		<div>
			<div className='create-user-box'>
				<input className='input' type='text' placeholder='username' onKeyDown={handleKeyPress} onChange={(e) => setInput(e.target.value)}/>
				<button className='add-button' onClick={CreateUser}>Create User</button>
			</div>
			<ul className="mt-5">
			{store.agendas.map((agenda, index) => {
				return (
					<li key={index}>
						<TaskList agenda={agenda}/>
					</li>
				)
			})}
			</ul>
		</div>
	);
};