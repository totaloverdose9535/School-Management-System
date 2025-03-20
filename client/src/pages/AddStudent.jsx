import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import MainDashboard from '../components/MainDashboard';

export default function AddStudent() {
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
    feesPaid: "",
    class: ""
  });

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    const oldData = { ...formData }

    oldData[inputName] = inputValue
    setFormData(oldData)

  };
  const SaveStudent = (e) => {
    e.preventDefault();

    try {
      axios.post(`/api/student/SaveStudent`, formData).then((res) => {
     
        setFormData({
          name: "",
          gender: "",
          dob: "",
          email: "",
          feesPaid: "",
          class: ""
        })
        if (res.data.message) {
          toast.error(res.data.message, { position: "bottom-right", autoClose: 2000, transition: Bounce })
          return res.data.message
        } else {
          toast.success("Student Added Successful", { position: "bottom-right", autoClose: 2000, transition: Bounce })
        }
      })
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <>
      <ToastContainer />
      <MainDashboard />
      <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow-lg shadow-indigo-500/50 ring-2 ring-blue-300/50 rounded-lg">
        <a href="/Student" className="inline-block mb-4">
          <button className="rounded-md text-md px-4 py-2 font-semibold text-white bg-gray-800 hover:bg-gray-700">
            Back
          </button>
        </a>

        <h2 className="text-3xl text-center font-bold text-gray-900 mb-6">Add Student</h2>

        <form onSubmit={SaveStudent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fees Paid</label>
            <input
              type="number"
              name="feesPaid"
              value={formData.feesPaid}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <select
              name="class"
              value={formData.class}
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
