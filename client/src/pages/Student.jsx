import React, { useEffect, useState } from 'react'
import StudentList from './StudentList'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function Student() {
  let [studentList, setstudentList] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  let getAllStudents = () => {
    axios.get("/api/student/GetStudents").then((res) => {
      return res.data

    }).then((finalData) => {
      if (finalData.status) {
        setstudentList(finalData.studentList)
      }
    })
  }


  useEffect(() => {
    getAllStudents()
  }, [])

  // Sorting Function
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...studentList].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setstudentList(sortedData);
    setSortConfig({ key, direction });
  };

  // Function to get sort indicator (🔼🔽)
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "🔼" : "🔽";
    }
    return "";
  };

  return (
    <>
      <StudentList Swal={Swal} getSortIndicator={getSortIndicator} sortBy={sortBy} />
    </>

  )
}
