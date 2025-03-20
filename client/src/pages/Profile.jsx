import axios from "axios"
import { useEffect, useState } from "react"
import MainDashboard from "../components/MainDashboard"


export default function Profile() {
  const [data, setData] = useState('')
  const token = JSON.parse(localStorage.getItem('token'))

  const fetchData = () => {
    const header = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios.post("/api/auth/adminProfile", {}, header)
      .then((res) => {
        setData(res.data.data)
        console.log("user data fetched", res)
      })
      .catch((err) => {
        console.log("error fetching data", err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log("data", data)
  return (
    <>
      <MainDashboard />
      <div className="bg-gray-100 pt-15 h-167">
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-6xl font-bold text-amber-300 mb-2">Profile Details</h1>
            <h3 className="text-2xl font-bold text-black mb-2">Name : {data.name}</h3>
            <p>Id : {data.id}</p>
            <p>Email : {data.email}</p>
            <p>Mobile No : {data.mobile_no}</p>
          </div>
        </div>
      </div>
    </>
  )
}
