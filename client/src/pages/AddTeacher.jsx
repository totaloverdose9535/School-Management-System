import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import MainDashboard from '../components/MainDashboard';

export default function AddTeacher() {
  let [classList, setclassList] = useState([])


  let getAllClasses = () => {
    axios.get("/api/class/GetClass").then((res) => {
      return res.data
    }).then((finalData) => {
      if (finalData.status) {
        setclassList(finalData.classList)
      }
    })
  }

  useEffect(() => {
    getAllClasses()
  }, [])

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


  const SaveTeacher = (e) => {
    e.preventDefault();

    try {
      axios.post(`/api/teacher/SaveTeacher`, formData).then((res) => {
      
        setFormData({
          name: "",
          gender: "",
          dob: "",
          email: "",
          salary: "",
          assignedClass: ""
        })
        toast.success("Teacher Added Successful", { position: "bottom-right", autoClose: 2000, transition: Bounce })
      })
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <>
      <ToastContainer />
      <MainDashboard />
      <div className="max-w-2xl mx-auto my-12 p-6 bg-white shadow-xl shadow-indigo-500/50 ring-2 ring-blue-300/50 rounded-lg">
        <a href="/Teacher">
          <button className="mb-4 px-4 py-2 rounded-lg bg-black text-white text-md font-semibold hover:bg-gray-800">
            Back
          </button>
        </a>

        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Add Teacher</h2>

        <form onSubmit={SaveTeacher} className="space-y-4">
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

          {/* Assigned Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Assigned Class:</label>
            <select
              name="assignedClass"
              value={formData.assignedClass}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Class</option>
              {classList?.map((cls) => (
                <option key={cls._id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
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
