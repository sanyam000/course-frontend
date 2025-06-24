import React, { useEffect, useState } from 'react';
import api from '../api/api';

function InstanceForm({ onSuccess }) {
  const [courseId, setCourseId] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    api.get('/courses').then(res => setAllCourses(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/instances', { courseId, year, semester });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={courseId} onChange={e => setCourseId(e.target.value)}>
        <option>Select Course</option>
        {allCourses.map(c => (
          <option key={c.courseId} value={c.courseId}>
            {c.courseId} - {c.title}
          </option>
        ))}
      </select>
      <input type="number" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
      <input type="number" placeholder="Semester" value={semester} onChange={e => setSemester(e.target.value)} />
      <button type="submit">Create Instance</button>
    </form>
  );
}

export default InstanceForm;
