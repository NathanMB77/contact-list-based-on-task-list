import React, { useEffect, useState, useContext } from 'react';
import DeleteContactModal from './deleteContactModal.jsx';
import CreateContactModal from './createContactModal.jsx';

import { Context } from "../store/appContext";

const TaskList = ({agenda}) =>{

	const { store, actions } = useContext(Context);
	const [isHovered, setIsHovered] = useState(null);
	const [currentAgenda, setCurrentAgenda] = useState('');
	const [deleteContactModal, setDeleteContactModal] = useState(false);
	const [createContactModal, setCreateContactModal] = useState(false);
	const [deleteContactId, setDeleteContactId] = useState(1000);

	useEffect(() => {
		
	}, [agenda]);

    const toggleDeleteContactModal = (contactId) => {
        setDeleteContactModal(!deleteContactModal)
		setDeleteContactId(contactId);
    }

	const openCreateContactModal = (agenda) => {
		setCreateContactModal(true);
		setCurrentAgenda(agenda);
	};

	function requestDeleteContact(contactId){
		fetch('https://playground.4geeks.com/contact/agendas/' + agenda.slug + '/contacts/' + contactId, {
			method: 'DELETE'
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('failed to delete task');
			}
			else {
				actions.deleteContact(agenda.slug, contactId);
				console.log('success. contact #' + contactId + ' has been deleted');
			}
		})
		.catch(error => {
			console.error(error);
		});
	}

	return (
		<div className='full-component'>
			{createContactModal && <CreateContactModal onClose={() => setCreateContactModal(false)} agenda={currentAgenda}/>}
			{deleteContactModal && <DeleteContactModal toggleModal={toggleDeleteContactModal} onConfirm={requestDeleteContact} contactId={deleteContactId}/>}
			<div className='to-do-list'>
				<div className='list-header'>
					<div className='user-name'>
						<p className='user-name-text'>{agenda.slug}'s agenda</p>
					</div>
					{/* <button className='delete-user-button' onClick={() => {}}>Delete Agenda</button> */}
					<button className='add-button' onClick={() => openCreateContactModal(agenda.slug)}>create contact</button>
					<button className='add-button' onClick={() => actions.deleteAgenda(agenda.slug)}>X</button>
				</div>
				
				<div>
					{(agenda.contacts.length === 0) ? <div className='no-tasks'><p>No tasks. Add a task.</p></div> : <></>}
					<ul className='list'>
						{(agenda.contacts[0]) ? agenda.contacts.map((contact, index) => {
							let contactIds = [];
							contactIds.push(contact.id);
							return (
								<li className='list-item'
									key={index}>
									<div className='list-item-div' onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(null)}>
										<span onClick={() => window.location='/' + agenda.slug + '/' + contact.name}>
											<h5 className='contact'>{contact.name}</h5>
											<p className="contact-info">📞 {contact.phone}</p>
											<p className="contact-info">📧 {contact.email}</p>
											<p className="contact-info">📍 {contact.address}</p>
											<p className="contact-info">id {contact.id}</p>
										</span>
										<button 
											className={isHovered === index ? 'delete-button-active' : 'delete-button-hidden'}
											onClick={() => toggleDeleteContactModal(contact.id)}
											>
											✖
										</button>
									</div>
								</li>
							);
						}) : <></>}
					</ul>
				</div>
			</div>
			<div className='extra-pages'>
				<div className='second-page'></div>
				<div className='third-page'></div>
			</div>
			<br/>
		</div>
	) 
}

export default TaskList;