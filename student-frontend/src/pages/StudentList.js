import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/students').then(res => setStudents(res.data));
  }, []);

  const deleteStudent = id => {
    axios.delete(`http://localhost:4000/students/${id}`).then(() => {
      setStudents(students.filter(s => s._id !== id));
    });
  };

  return (
    <div>
      <h1>Student List</h1>
      <Link to="/add">Add Student</Link>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} ({student.age}) - Class: {student.class} {' '}
            <Link to={`/edit/${student._id}`}>Edit</Link> {' '}
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;