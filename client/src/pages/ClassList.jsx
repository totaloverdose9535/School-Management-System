import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MainDashboard from '../components/MainDashboard'
import Pagination from '../components/Pagination'

export default function ClassList({ Swal, getSortIndicator, sortBy }) {
    let [classList, setclassList] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(5)

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = classList.slice(firstPostIndex, lastPostIndex)
    


    let getAllClasses = () => {
        axios.get("/api/class/GetClass").then((res) => {
            return res.data

        }).then((finalData) => {
            if (finalData.status) {
                setclassList(finalData.classList)
            }
        })
    }

    let DeleteClass = (deleteId) => {

        Swal.fire({
            title: "Do you want to delete this class",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`/api/class/DeleteClass/${deleteId}`).then((res) => {
                    getAllClasses()
                })

                Swal.fire("Deleted!", "", "successfully");
            } else if (result.isDenied) {
                Swal.fire("Changes are not done", "", "info");
            }
        });

    }

    useEffect(() => {
        getAllClasses()
        getSortIndicator()
        sortBy()
    }, [])

  

    return (
        <>
            <MainDashboard />
            <div className="h-screen p-15 bg-gray-300 flex justify-center items-center">
                <div className="bg-white rounded-md p-10 shadow-2xl w-full max-w-6xl">
                    {/* Add Class Button */}
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-3xl font-bold">Class List</h2>
                        <a href="/AddClass">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Class
                            </button>
                        </a>
                    </div>

                    {/* Class Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Sr.no</th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("name")}>
                                        Name {getSortIndicator("name")}
                                    </th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("year")}>
                                        Year {getSortIndicator("year")}
                                    </th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("currentCapacity")}>
                                        Current Capacity {getSortIndicator("currentCapacity")}
                                    </th>
                                    <th className="border px-4 py-2 cursor-pointer" onClick={() => sortBy("maxCapacity")}>
                                        Max Capacity {getSortIndicator("maxCapacity")}
                                    </th>
                                    <th className="border px-4 py-2">Details</th>
                                    <th className="border px-4 py-2">Edit / Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPost.length > 0 ? (
                                    currentPost.map((items, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{items.name}</td>
                                            <td className="border px-4 py-2">{items.year}</td>
                                            <td className="border px-4 py-2">{items.currentCapacity}</td>
                                            <td className="border px-4 py-2">{items.maxCapacity}</td>
                                            <td className="border px-4 py-2">
                                                <a href={`/ViewClassDetails/${items._id}`}>
                                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
                                                        View
                                                    </button>
                                                </a>
                                            </td>
                                            <td className="border px-4 py-2">
                                                <a href={`/UpdateClass/${items._id}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                                                        Edit
                                                    </button>
                                                </a>
                                                <button
                                                    onClick={() => DeleteClass(items._id)}
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

                            <Pagination totalPosts={classList.length}
                                postPerPage={postPerPage}
                                setCurrentPage={setCurrentPage} />

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
