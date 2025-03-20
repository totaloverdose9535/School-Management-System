import axios from 'axios';
import { useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

export default function Signup() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile_no: "",
    password: ""
  })

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    const oldData = { ...data }

    oldData[inputName] = inputValue
    setData(oldData)
  }

  const singupUser = async (e) => {
    e.preventDefault();

    try {
      axios.post("/api/auth/Signup", data).then((res) => {
       
        if (res.data.error) {
          toast.error(res.data.error, { position: "bottom-right", theme: "colored", autoClose: 2000, transition: Bounce })
        }
        else {
          setData({
            name: "",
            email: "",
            mobile_no: "",
            password: ""
          })
          toast.success("Registration Successful", { position: "bottom-right", autoClose: 2000, transition: Bounce })
          navigate("/")
        }
      })
    } catch (error) {
      console.log(error)
    }
  };



  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="grid grid-cols-2 gap-10 bg-white p-10 rounded-lg shadow-lg w-4/5">

          {/* Left Section - Welcome Message */}
          <div className="flex flex-col justify-center items-center bg-indigo-600 text-white p-10 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center">Welcome to School Management</h1>
            <p className="mt-5 text-lg text-center">Sign up to manage students, teachers, and records seamlessly.</p>
          </div>

          {/* Right Section - Signup Form */}
          <div className="p-8 rounded-lg shadow-xl">
            <form onSubmit={singupUser}>
              <h2 className="text-3xl text-center font-semibold mb-5">Sign Up</h2>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  User Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-900">
                  Mobile Number
                </label>
                <input
                  name="mobile_no"
                  type="text"
                  value={data.mobile_no}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white hover:bg-indigo-500"
              >
                Sign Up
              </button>
            </form>

            <hr className="my-6" />

            <p className="text-center text-lg">
              Already Registered? <Link className="text-blue-900" to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
