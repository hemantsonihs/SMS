import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStudent = () => {
  const [form, setForm] = useState({ name: '', age: '', class: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:4000/students', form).then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Student</h1>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="class" placeholder="Class" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStudent;