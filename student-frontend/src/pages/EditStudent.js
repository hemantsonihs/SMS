import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStudent = () => {
  const [form, setForm] = useState({ name: '', age: '', class: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/students`).then(res => {
      const student = res.data.find(s => s._id === id);
      if (student) setForm(student);
    });
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:4000/students/${id}`, form).then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Student</h1>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="age" value={form.age} onChange={handleChange} />
      <input name="class" value={form.class} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditStudent;
