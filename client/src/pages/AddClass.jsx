import React from 'react'
import { useState } from "react";
import { Bounce, toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import MainDashboard from '../components/MainDashboard';

export default function AddClass() {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    maxCapacity: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    const oldData = { ...formData }

    oldData[inputName] = inputValue
    setFormData(oldData)
  };



  const SaveClass = (e) => {
    e.preventDefault();

    try {
      axios.post(`/api/class/Create_class`, formData).then((res) => {

        setFormData({
          name: "",
          year: "",
          maxCapacity: ""
        })
        toast.success("Class Created Successful", { position: "bottom-right", autoClose: 2000, transition: Bounce })
      })
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <>
      <ToastContainer />
      <MainDashboard />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg shadow-indigo-500/50 ring-2 ring-blue-300/50 rounded-lg">
        <a href="/Class" className="inline-block mb-4">
          <button className="rounded-md text-md px-4 py-2 font-semibold text-white bg-gray-800 hover:bg-gray-700">
            Back
          </button>
        </a>

        <h2 className="text-3xl text-center font-bold text-gray-900 mb-6">Add Class</h2>

        <form onSubmit={SaveClass} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Class Name</label>
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
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Max Capacity</label>
            <input
              type="number"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
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
