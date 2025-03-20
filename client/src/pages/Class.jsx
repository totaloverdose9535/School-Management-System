import React, { useEffect, useState } from 'react'
import ClassList from './ClassList'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export default function Class() {
  let [classList, setclassList] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });



  let getAllClasses = () => {
    axios.get("/api/class/GetClass").then((res) => {
      return res.data

    }).then((finalData) => {
      if (finalData.status) {
        setclassList(finalData.classList)
      }
    })
  }

  useEffect(() => {
    getAllClasses()
  }, [])


  // Sorting function
  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...classList].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setclassList(sortedData);
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
      <ClassList
        Swal={Swal}
        getSortIndicator={getSortIndicator}
        sortBy={sortBy} />





    </>
  )
}
