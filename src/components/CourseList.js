import React, { useEffect, useState } from 'react';
import api from '../api/api';

function CourseList() {
  const [courses, setCourses] = useState([]);

  const loadCourses = () => {
    api.get('/courses').then(res => setCourses(res.data));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const deleteCourse = async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      loadCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Cannot delete due to dependencies');
    }
  };

  return (
    <ul>
      {courses.map(course => (
        <li key={course.courseId}>
          <strong>{course.courseId}</strong>: {course.title}
          <br />
          Prerequisites: {course.prerequisites.map(p => p.courseId).join(', ')}
          <button onClick={() => deleteCourse(course.courseId)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default CourseList;
