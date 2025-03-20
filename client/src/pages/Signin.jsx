import axios from 'axios';
import { useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

export default function Signin() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const getValue = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    const oldData = { ...data }

    oldData[inputName] = inputValue
    setData(oldData)
  }

  const singinUser = async (e) => {
    e.preventDefault();

    try {
      axios.post("/api/auth/Signin", data).then((res) => {
    
        if (res.data.error) {
          toast.error(res.data.error, { position: "bottom-right", theme: "colored", autoClose: 2000, transition: Bounce })
        }
        else {
          setData({
            email: "",
            password: ""
          })
          toast.success("Login Successful", { position: "bottom-right", autoClose: 2000, transition: Bounce })
          localStorage.setItem("token", JSON.stringify(res.data.token))
          navigate("/Dashboard")
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
          {/* Left Section - School Management System Text */}
          <div className="flex flex-col justify-center items-center bg-indigo-600 text-white p-10 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-center">School Management System</h1>
            <p className="mt-5 text-lg text-center">Efficiently manage students, teachers, and academic records.</p>
          </div>

          {/* Right Section - Login Form */}
          <div className="p-8 rounded-lg shadow-xl">
            <form onSubmit={singinUser}>
              <h2 className="text-3xl text-center font-semibold">Login User</h2>

              <div className="mt-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={getValue}
                  className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={getValue}
                  className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-gray-300 placeholder-gray-400 focus:outline-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 mt-6 px-4 py-2 text-lg font-semibold text-white hover:bg-indigo-500"
              >
                Submit
              </button>
            </form>

            <hr className="my-6" />

            <p className="text-center text-lg">
              New user? <Link className="text-blue-900" to="/Signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}








