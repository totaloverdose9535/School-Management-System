import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MainDashboard from '../components/MainDashboard';
import Pagination from '../components/Pagination';

export default function TeacherList({ Swal, getSortIndicator, sortBy }) {
    let [teacherList, setteacherList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(5)

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = teacherList.slice(firstPostIndex, lastPostIndex)

    let getAllTeachers = () => {
        axios.get("/api/teacher/GetTeachers").then((res) => {
            return res.data
        }).then((finalData) => {
            if (finalData.status) {
                setteacherList(finalData.teacherList)
            }
        })
    }


    let DeleteRow = (deleteid) => {

        Swal.fire({
            title: "Do you want to delete this student",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`/api/teacher/DeleteTeacher/${deleteid}`).then((res) => {
                    getAllTeachers()
                })
                Swal.fire("Deleted!", "", "successfully");
            } else if (result.isDenied) {
                Swal.fire("Changes are not done", "", "info");
            }
        });



    }

    useEffect(() => {
        getAllTeachers()
        getSortIndicator()
        sortBy()
    }, [])


    return (
        <>
            <MainDashboard />

            <div className="h-screen p-15 bg-gray-300 flex justify-center items-center">
                <div className="bg-white rounded-md p-10 shadow-2xl w-full max-w-6xl">
                    {/* Add Teacher Button */}
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-3xl font-bold">Teachers List</h2>
                        <a href="/AddTeacher">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Teacher
                            </button>
                        </a>
                    </div>

                    {/* Teacher Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Sr.no</th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("name")}>
                                        Name {getSortIndicator("name")}
                                    </th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("gender")}>
                                        Gender {getSortIndicator("gender")}
                                    </th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("dob")}>
                                        Date Of Birth {getSortIndicator("dob")}
                                    </th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("email")}>
                                        Email {getSortIndicator("email")}
                                    </th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("salary")}>
                                        Salary {getSortIndicator("salary")}
                                    </th>
                                    <th className="border px-4 py-2">Edit / Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPost.length > 0 ? (
                                    currentPost.map((items, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{items.name}</td>
                                            <td className="border px-4 py-2">{items.gender}</td>
                                            <td className="border px-4 py-2">{items.dob.slice(0, 10)}</td>
                                            <td className="border px-4 py-2">{items.email}</td>
                                            <td className="border px-4 py-2">{items.salary}</td>
                                            <td className="border px-4 py-2">
                                                <a href={`/UpdateTeacher/${items._id}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                                                        Edit
                                                    </button>
                                                </a>
                                                <button
                                                    onClick={() => DeleteRow(items._id)}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold ml-3 py-2 px-3 rounded-md"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="border px-4 py-2 text-center font-bold" colSpan={7}>
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className='mt-6 text-center'>
                            <Pagination totalPosts={teacherList.length}
                                postPerPage={postPerPage}
                                setCurrentPage={setCurrentPage} />


                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
