import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/createContactModal.css'

const CreateContactModal = ({onClose, agenda}) => {
  const { state, actions } = useContext(Context);
  const [contactInfo, setContactInfo] = useState({ 'name': '', 'phone': '', 'email': '', 'address': '' });

  const handleInputChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
 };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.createContact(contactInfo, agenda);
    onClose();
 };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
        onClose();
    }
};
  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <span className="close-span" >
          <button className='close m-0 p-0' onClick={onClose}>&times;</button>
          </span>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={contactInfo.name} onChange={handleInputChange} required />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={contactInfo.phone} onChange={handleInputChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={contactInfo.email} onChange={handleInputChange} required />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={contactInfo.address} onChange={handleInputChange} required />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateContactModal;