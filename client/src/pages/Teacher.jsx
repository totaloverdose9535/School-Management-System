import React, { useEffect, useState } from 'react'
import TeacherList from './TeacherList'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default function Teacher() {
  let [teacherList, setteacherList] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  let getAllTeachers = () => {
    axios.get("/api/teacher/GetTeachers").then((res) => {
      return res.data
    }).then((finalData) => {
      if (finalData.status) {
        setteacherList(finalData.teacherList)
      }
    })
  }



  useEffect(() => {
    getAllTeachers()
  }, [])

  // Sorting function
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...teacherList].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setteacherList(sortedData);
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

      <TeacherList data={teacherList} getAllTeachers={getAllTeachers} Swal={Swal} getSortIndicator={getSortIndicator} sortBy={sortBy} />

    </>

  )
}
