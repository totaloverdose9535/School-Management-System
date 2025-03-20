import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import MainDashboard from '../components/MainDashboard'

export default function UpdateStudent() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    feesPaid: ""
  });

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    const oldData = { ...formData }

    oldData[inputName] = inputValue
    setFormData(oldData)

  };


  const GetStudent = () => {
    axios.get(`/api/student/GetStudent/${id}`).then((res) => {
      let data = res.data
      setFormData(data.singleStudent)
    })
  }

  useEffect(() => {
    GetStudent()
  }, [])

  const UpdateStudent = (e) => {
    e.preventDefault()
    try {
      axios.put(`/api/student/UpdateStudent/${id}`, formData).then((res) => {
       
        toast.success("Student Updated Successful", { position: "bottom-right", autoClose: 2000, transition: Bounce })
        navigate("/Student")
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <MainDashboard />
      <ToastContainer />
      <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-xl ring-2 ring-blue-300/50 rounded-lg">
        <a href="/Student" className="inline-block mb-4">
          <button className="rounded-md px-4 py-2 font-semibold text-white bg-black hover:bg-gray-800">Back</button>
        </a>

        <form onSubmit={UpdateStudent} className="space-y-6">
          <h2 className="text-3xl text-center font-semibold text-gray-900">Update Student</h2>

          <div>
            <label className="block text-sm font-medium text-gray-900">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Fees Paid:</label>
            <input type="number" name="feesPaid" value={formData.feesPaid} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-base text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <button type="submit" className="rounded-lg ml-65 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none">Submit</button>
        </form>
      </div>
    </>
  )
}
