import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import MainDashboard from '../components/MainDashboard';

export default function ViewClassDetails() {
    const { id } = useParams()
    let [classDetails, setclassDetails] = useState([])


    let GetclassDetails = () => {
        axios.get(`/api/class/GetclassDetails/${id}`).then((res) => {
            let data = res.data;
            setclassDetails(data.classDetails)
        })
    }

    useEffect(() => {
        GetclassDetails()
    }, [])

    const students = classDetails.students || [];
    const maleCount = students.filter(student => student.gender === "Male").length;
    const femaleCount = students.filter(student => student.gender === "Female").length;

    const chartData = [
        { gender: "Male", count: maleCount },
        { gender: "Female", count: femaleCount }
    ];

    return (
        <>
            <MainDashboard />

            <div className="container mx-auto p-6">
                {/* Header */}
                <h2 className="text-4xl font-bold text-center mb-6">Class Details</h2>

                {/* Class Details & Chart Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Class Details */}
                    <div className="bg-white shadow-xl p-6 rounded-lg">
                        <h3 className="text-4xl font-semibold mb-4">Class Information</h3>
                        <p className="text-xl"><strong>Name:</strong> {classDetails.name}</p>
                        <p className="text-xl"><strong>Year:</strong> {classDetails.year}</p>
                        <p className="text-xl"><strong>Max Capacity:</strong> {classDetails.maxCapacity}</p>
                        <p className="text-xl"><strong>Current Capacity:</strong> {classDetails.currentCapacity}</p>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white shadow-xl p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Gender Distribution</h3>
                        {students.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="gender" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#4f46e5" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-center text-gray-500">No students enrolled.</p>
                        )}
                    </div>
                </div>

                {/* Teacher Section */}
                <div className="bg-white shadow-xl p-6 rounded-lg mt-8">
                    <h3 className="text-2xl font-semibold text-center">Class Teacher</h3>
                    {classDetails.teacher && classDetails.teacher.length > 0 ? (
                        <table className="w-full mt-4 border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Gender</th>
                                    <th className="border px-4 py-2">Date Of Birth</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classDetails.teacher.map((teach) => (
                                    <tr key={teach._id} className="text-center border">
                                        <td className="border px-4 py-2">{teach.name}</td>
                                        <td className="border px-4 py-2">{teach.gender}</td>
                                        <td className="border px-4 py-2">{teach.dob.slice(0, 10)}</td>
                                        <td className="border px-4 py-2">{teach.email}</td>
                                        <td className="border px-4 py-2">{teach.salary}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500 mt-4">No teacher assigned.</p>
                    )}
                </div>

                {/* Students Section */}
                <div className="bg-white shadow-xl p-6 rounded-lg mt-8">
                    <h3 className="text-2xl font-semibold text-center">Students</h3>
                    {students.length > 0 ? (
                        <table className="w-full mt-4 border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-indigo-600 text-white">
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Gender</th>
                                    <th className="border px-4 py-2">Date Of Birth</th>
                                    <th className="border px-4 py-2">Email</th>
                                    <th className="border px-4 py-2">Fees Paid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student._id} className="text-center border">
                                        <td className="border px-4 py-2">{student.name}</td>
                                        <td className="border px-4 py-2">{student.gender}</td>
                                        <td className="border px-4 py-2">{student.dob.slice(0, 10)}</td>
                                        <td className="border px-4 py-2">{student.email}</td>
                                        <td className="border px-4 py-2">{student.feesPaid}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-gray-500 mt-4">No students enrolled.</p>
                    )}
                </div>
            </div>
        </>
    );
}
