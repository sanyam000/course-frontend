/*import React from 'react';
import CourseForm from './components/CourseForm.jsx';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Course Management</h1>
      <CourseForm />
    </div>
  );
}

export default App;*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const API_BASE = 'http://localhost:8080/api/courses';

function App() {
  const [view, setView] = useState('list');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseId: '',
    title: '',
    description: '',
    prerequisites: [],
  });

  useEffect(() => {
    if (view === 'list') fetchCourses();
  }, [view]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCourses(res.data);
    } catch (err) {
      toast.error("Course Added unsuccesfull");
    }
  };

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async () => {
    try {
      await axios.post(API_BASE, newCourse);
      alert('Course added successfully');
      setNewCourse({ courseId: '', title: '', description: '', prerequisites: [] });
      setView('list');
    } catch (err) {
      alert('Error: ' + err.response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchCourses();
    } catch (err) {
      alert('Error: ' + err.response.data);
    }
  };

  return (

  
    <div  className='app-container'style={{ padding: '1rem' }}>
      <h1 className='nav-buttons'>Course Management</h1>
      <div  style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('list')} style={{ marginRight: '1rem' }}>
          Courses Available
        </button>
        <button onClick={() => setView('add')}>Add Course</button>
      </div>

      {view === 'list' && (
        <div>
          <h2>Courses Available</h2>
          <ul>
            {courses.map((c) => (
              <li key={c.courseId}>
                <strong>{c.courseId}</strong> - {c.title}
                <button onClick={() => handleDelete(c.courseId)} style={{ marginLeft: '1rem' }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === 'add' && (
        <div>
          
          <h2>Add New Course</h2>
          <input
            name="courseId"
            placeholder="Course ID (e.g., CS209)"
            value={newCourse.courseId}
            onChange={handleChange}
          />
          <br />
          <input
            name="title"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={handleChange}
          />
          <br />
          <input
            name="description"
            placeholder="Course Description"
            value={newCourse.description}
            onChange={handleChange}
          />
          <br />
          <button onClick={handleAddCourse} style={{ marginTop: '1rem' }}>
            Add Course
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

