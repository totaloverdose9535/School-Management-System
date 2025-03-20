
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import axios from 'axios'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Class from './pages/Class'
import Student from './pages/Student'
import Teacher from './pages/Teacher'
import ProtectedRoute from './components/ProtectedRoute'
import AddClass from './pages/AddClass'
import AddStudent from './pages/AddStudent'
import AddTeacher from './pages/AddTeacher'
import UpdateClass from './pages/UpdateClass'
import UpdateStudent from './pages/UpdateStudent'
import UpdateTeacher from './pages/UpdateTeacher'
import ViewClassDetails from './pages/ViewClassDetails'
import MainDashboard from './components/MainDashboard'



axios.defaults.baseURL = "https://school-management-system-vm3h.onrender.com";
axios.defaults.withCredentials = true



function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route index element={<Signin />} />
      <Route path='/Signup' element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/MainDashboard' element={<MainDashboard />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/adminProfile' element={<Profile />} />
        <Route path='/Class' element={<Class />} />
        <Route path='/AddClass' element={<AddClass />} />
        <Route path='/UpdateClass/:id' element={<UpdateClass />} />
        <Route path='/Student' element={<Student />} />
        <Route path='/AddStudent' element={<AddStudent />} />
        <Route path='/UpdateStudent/:id' element={<UpdateStudent />} />
        <Route path='/Teacher' element={<Teacher />} />
        <Route path='/AddTeacher' element={<AddTeacher />} />
        <Route path='/UpdateTeacher/:id' element={<UpdateTeacher />} />
        <Route path='/ViewClassDetails/:id' element={<ViewClassDetails />} />
      </Route>




    </Routes>
  )
}

export default App
