import React, { useState } from 'react';
import './AddCourseForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    prerequisites: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      courseCode: formData.courseCode,
      courseName: formData.courseName,
      prerequisites: formData.prerequisites
        ? formData.prerequisites.split(',').map((code) => code.trim())
        : []
    };

    fetch('http://localhost:8080/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to add course');
        return response.json();
      })
      .then(() => {
        toast.success("Course added successfully!");
        setFormData({ courseCode: '', courseName: '', prerequisites: '' });
      })
      .catch(error => {
        console.log(error);
        toast.error("There is some problem in adding the course ")
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add New Course</h2>
      <div className="form-group">
        <label>Course Code:</label>
        <input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Course Name:</label>
        <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Prerequisites (comma-separated):</label>
        <input type="text" name="prerequisites" value={formData.prerequisites} onChange={handleChange} />

      </div>
      <button type="submit" className="submit-button">Add Course</button>
      <ToastContainer position="top-right" autoClose={3000} />

    </form>
    
  );
};

export default AddCourseForm;
