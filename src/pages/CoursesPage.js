import React from 'react';
import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';

function CoursesPage() {
  return (
    <>
      <h2>Create Course</h2>
      <CourseForm onSuccess={() => window.location.reload()} />
      <h2>Course List</h2>
      <CourseList />
    </>
  );
}

export default CoursesPage;
