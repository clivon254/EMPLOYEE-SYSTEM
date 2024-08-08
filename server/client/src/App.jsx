
import { BrowserRouter, Route, Routes,Outlet,Navigate } from "react-router-dom"
import SignIn from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Leave from "./pages/Leave"
import Event from "./pages/Event"
import Task from "./pages/Task"
import Profile from "./pages/Profile"
import SignUp from "./pages/Sign-up"
import {useSelector} from "react-redux"
import { Toaster } from "sonner"
import Header from "./components/Header"
import DashSidebar from "./components/Sidebar"
import Employees from "./pages/Employees"
import UpdateEmployee from "./pages/updateEmployee"
import TaskDetails from "./pages/TaskDetails"
import AddSubTask from "./components/task/AddSubTask"
import AddTask from "./components/task/AddTask"
import AddEmployee from "./pages/AddEmployee"
import UpdateTask from "./components/task/UpdateTask"
import MultiSelectListbox from "./pages/testing"

function Layout(){

  const {currentUser} = useSelector((state) => state.user)

  return (
    currentUser ?
    
      <div className="w-full flex">


          <div className="hidden md:block w-1/4 h-screen border-r border-slate-300 sticky top-0 left-0">

              <DashSidebar />

          </div>

          <div className=" w-full md:w-3/4">

            <Header/>

            <div className="w-full  ">

              <Outlet/>

            </div>

          </div>

      </div>
        : 
      <Navigate to="/sign-in"  />

  )
    

}

export default function App(){

  return(

    <BrowserRouter>

      <main className="w-full min-h-screen">

        <Routes>

            <Route element={<Layout/>}>

               <Route path="/" element={<Dashboard/>}/>

               <Route path="/leave/:id" element={<Leave/>}/>

               <Route path="/event" element={<Event/>}/>

               <Route path="/employee" element={<Employees/>}/>

               <Route path="/task" element={<Task/>}/>

               <Route path="/addtask" element={<AddTask/>}/>

               <Route path="/task/:id" element={<TaskDetails/>}/>

               <Route path="/profile" element={<Profile/>}/>

               <Route path="/test" element={<MultiSelectListbox/>}/>

               <Route path="/updateTask/:id" element={<UpdateTask/>}/>

               <Route path="/update-employee/:employeeId" element={<UpdateEmployee/>}/>

               <Route path="/addEmployee" element={<AddEmployee/>}/>

            </Route>

            <Route path="/sign-in" element={<SignIn/>}/>

        </Routes>

        <Toaster richColors/>

      </main>

    </BrowserRouter>
  
  )

}