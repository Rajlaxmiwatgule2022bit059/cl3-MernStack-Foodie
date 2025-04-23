import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevents page reload

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        alert("Account created successfully");
        navigate("/login"); // ✅ go to login page
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Account</h2>
      <form onSubmit={handleSubmit}> {/* ✅ no action attribute */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="geolocation" className="form-label">Address</label>
          <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-success me-2">Submit</button>
        <Link to="/login" className="btn btn-danger">Already a user</Link>
      </form>
    </div>
  );
}
