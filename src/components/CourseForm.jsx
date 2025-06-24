 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [prerequisites, setPrerequisites] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/courses')
      .then(res => setAllCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/courses', {
        title,
        courseId,
        description,
        prerequisites: prerequisites.map(id => ({ courseId: id }))
      });
      toast.success("Course added succesfully");
    } catch (err) {
      alert(err.response?.data || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Course</h2>
      <input placeholder="Course ID" value={courseId} onChange={e => setCourseId(e.target.value)} required />
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select multiple value={prerequisites} onChange={e => setPrerequisites([...e.target.selectedOptions].map(o => o.value))}>
        {allCourses.map(course => (
          <option key={course.courseId} value={course.courseId}>
            {course.courseId} - {course.title}
          </option>
        ))}
      </select>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
