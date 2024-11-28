import React, { useEffect, useState } from 'react';
import '../../styles/deleteContactModal.css'
import { Context } from '../store/appContext';

export const Single = ({contact}) => {

    return (
        <div className='full-component mt-5'>
			<div className='to-do-list'>
				<div className='list-header'>
					<div className='user-name p-1'>
						<h5 className='user-name-text'>{contact.name}</h5>
					</div>
				</div>
				
				<div className='p-3'>
					<p className="contact-info">📞 {contact.phone}</p>
					<p className="contact-info">📧 {contact.email}</p>
					<p className="contact-info">📍 {contact.address}</p>
					<p className="contact-info">📍 {contact.id}</p>
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