// src/components/UpdateModal.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from "react-modal";
import "./UpdateModal.scss"; // Add your styles here

Modal.setAppElement("#root"); // For accessibility

const UpdateModal = ({ isOpen, onRequestClose, user, onUpdate }) => {
  const [formData, setFormData] = useState(user || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:4000/public/admin/update/company", formData);
      if (response.data.success) {
        alert(response.data.message);
        onUpdate(formData);
        onRequestClose();
      } else {
        setError(response.data.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update User"
      className="updateModal" 
    >
      <h2>Update User</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            aria-label="First Name"
          />
        </label>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            aria-label="Last Name"
          />
        </label>
        <label htmlFor="businessName">
          Business Name:
          <input
            type="text"
            id="businessName"
            name="compName"
            value={formData.compName || ''}
            onChange={handleChange}
            aria-label="Business Name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            aria-label="Email"
          />
        </label>
        <label htmlFor="address">
          Address:
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            aria-label="Address"
          />
        </label>
        <label htmlFor="state">
          State:
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            aria-label="State"
          />
        </label>
        <label htmlFor="category">
          Category:
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            aria-label="Category"
          />
        </label>
        <label htmlFor="status">
          Status:
          <select
            id="status"
            name="status"
            value={formData.status || 'active'}
            onChange={handleChange}
            aria-label="Status"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </Modal>
  );
};

export default UpdateModal;
