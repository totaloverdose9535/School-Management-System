import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import MainDashboard from '../components/MainDashboard';

export default function UpdateTeacher() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    salary: "",
    assignedClass: ""
  });

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    const oldData = { ...formData }

    oldData[inputName] = inputValue
    setFormData(oldData)
   

  };

  const GetTeacher = () => {
    axios.get(`/api/teacher/GetTeacher/${id}`).then((res) => {
      let data = res.data
      setFormData(data.singleTeacher)
    })
  }

  useEffect(() => {
    GetTeacher()
  }, [])

  const UpdateTeacher = (e) => {
    e.preventDefault()
    try {
      axios.put(`/api/teacher/UpdateTeacher/${id}`, formData).then((res) => {
       
        navigate("/Teacher")
        toast.success("Teacher Updated Successful", { position: "bottom-right", autoClose: 2000, transition: Bounce })

      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ToastContainer />
      <MainDashboard />
      <div className="max-w-2xl mx-auto my-12 p-6 bg-white shadow-xl shadow-indigo-500/50 ring-2 ring-blue-300/50 rounded-lg">
        <a href="/Teacher">
          <button className="mb-4 px-4 py-2 rounded-lg bg-black text-white text-md font-semibold hover:bg-gray-800 transition">
            Back
          </button>
        </a>

        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Update Teacher</h2>

        <form onSubmit={UpdateTeacher} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 ml-65 mt-5 text-white font-semibold px-6 py-3 shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>

    </>
  )
}
