import React, { useEffect, useState } from 'react';
import '../../styles/deleteContactModal.css'

function DeleteContactModal({toggleModal, onConfirm, contactId}){
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            toggleModal();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <p>Are you sure you want to delete the contact #{contactId}?</p>
                <div className="button-container">
                    <button className="cancel-button" onClick={toggleModal}>Cancel</button>
                    <button className="confirm-button" onClick={() => {onConfirm(contactId); toggleModal();}}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteContactModal;