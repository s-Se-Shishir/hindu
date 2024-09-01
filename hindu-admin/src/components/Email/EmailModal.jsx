import React from 'react';

const emailModalStyles = {
  emailModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  emailModalContent: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    animation: 'slideIn 0.3s ease-out',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  sendButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
    backgroundColor: '#d14836',
    color: 'white',
  },
  closeButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
    backgroundColor: '#ddd',
  },
  slideIn: {
    from: {
      transform: 'translateY(-50px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
};

const EmailModal = ({ isOpen, onClose, emailDetails, onEmailChange, onSendEmail }) => {
  if (!isOpen) return null;

  return (
    <div style={emailModalStyles.emailModal}>
      <div style={emailModalStyles.emailModalContent}>
        <h2 style={{ marginBottom: '20px' }}>Compose Email</h2>
        <form onSubmit={onSendEmail}>
          <div style={emailModalStyles.formGroup}>
            <label style={emailModalStyles.label}>To:</label>
            <input 
              type="text" 
              name="to" 
              value={emailDetails.to} 
              onChange={onEmailChange}
              readOnly
              style={emailModalStyles.input}
            />
          </div>
          <div style={emailModalStyles.formGroup}>
            <label style={emailModalStyles.label}>Subject:</label>
            <input 
              type="text" 
              name="subject" 
              value={emailDetails.subject} 
              onChange={onEmailChange}
              style={emailModalStyles.input}
            />
          </div>
          <div style={emailModalStyles.modalActions}>
            <button type="submit" style={emailModalStyles.sendButton}>Send</button>
            <button 
              type="button" 
              style={emailModalStyles.closeButton} 
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
