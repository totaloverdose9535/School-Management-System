
import { useEffect, useState } from 'react'
import MainDashboard from '../components/MainDashboard'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { Button } from "@mui/material"; // Using Material-UI for toggle button

export default function Dashboard() {
  const [totalFees, setTotalFees] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [isYearly, setIsYearly] = useState(true); // Toggle state for Yearly/Monthly


  const calculateProfitOrLoss = async () => {
    try {
      let totalFees = 0;
      let totalSalary = 0;

      // Fetch student fees
      const studentRes = await axios.get("/api/student/GetStudents");
      if (studentRes.data.status) {
        totalFees = studentRes.data.studentList.reduce((sum, student) => sum + student.feesPaid, 0);
        setTotalFees(totalFees);
      }

      // Fetch teacher salaries
      const teacherRes = await axios.get("/api/teacher/GetTeachers");
      if (teacherRes.data.status) {
        totalSalary = teacherRes.data.teacherList.reduce((sum, teacher) => sum + teacher.salary, 0);
        setTotalSalary(totalSalary);
      }

      // Compute Profit or Loss
      const calculatedProfitOrLoss = totalFees - totalSalary;
      setProfitOrLoss(calculatedProfitOrLoss);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // Toggle between Yearly and Monthly view
  const toggleView = () => {
    setIsYearly(!isYearly);
  };

  // Calculate Monthly Data if toggle is set to Monthly
  const factor = isYearly ? 1 : 12; // 12 for monthly, 1 for yearly
  const displayFees = totalFees / factor;
  const displaySalary = totalSalary / factor;
  const displayProfitOrLoss = profitOrLoss / factor;


  // Prepare data for Bar Chart
  const data = [
    { name: `Fees Collected (${isYearly ? "Yearly" : "Monthly"})`, value: displayFees, color: "#0088FE" },
    { name: `Salary Paid (${isYearly ? "Yearly" : "Monthly"})`, value: displaySalary, color: "#FF8042" },
    {
      name: profitOrLoss >= 0 ? `Profit (${isYearly ? "Yearly" : "Monthly"})` : `Loss (${isYearly ? "Yearly" : "Monthly"})`,
      value: Math.abs(displayProfitOrLoss),
      color: profitOrLoss >= 0 ? "#00C49F" : "#FF0000"
    },
  ];

  useEffect(() => {
    calculateProfitOrLoss()
  }, [])





  return (
    <>
      <MainDashboard />
      <div className='h-screen p-15 bg-gray-300'>
        <div className='bg-white rounded-md p-10 shadow-2xl'>

          <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Financial analytics ({isYearly ? "Yearly" : "Monthly"})</h2>

            {/* Toggle Button */}
            <Button
              variant="contained"
              onClick={toggleView}
              style={{ marginBottom: "20px" }}
            >
              Switch to {isYearly ? "Monthly" : "Yearly"} View
            </Button>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} width={500} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" barSize={50}>
                  {data.map((entry, index) => (
                    <rect key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <h3>Details:</h3>
            <p><b>Fees Collected ({isYearly ? "Yearly" : "Monthly"}):</b> {displayFees.toFixed(2)}</p>
            <p><b>Salary Paid ({isYearly ? "Yearly" : "Monthly"}):</b> {displaySalary.toFixed(2)}</p>
            <p><b>{profitOrLoss >= 0 ? "Profit" : "Loss"} ({isYearly ? "Yearly" : "Monthly"}):</b> {Math.abs(displayProfitOrLoss).toFixed(2)}</p>
          </div>

        </div>
      </div>
    </>
  )
}
