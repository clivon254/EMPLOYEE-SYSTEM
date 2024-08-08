
import {TiDocumentText} from "react-icons/ti"
import { useEffect, useState } from "react"
import axios from "axios"
import Calendar from "react-calendar"
import { Button, Label, Table, TableHead, Textarea, TextInput, Tooltip } from "flowbite-react"
import { useSelector } from "react-redux"
import TaskDailog from "../components/task/TaskDialog"
import clsx from "clsx"
import { BGS, PRIOTITYSTYELS } from "../utils"
import {MdKeyboardDoubleArrowUp,MdKeyboardArrowUp,MdKeyboardArrowDown } from "react-icons/md";
import UserInfo from "../components/UserInfo"
import { FaCarTunnel, FaDAndDBeyond, FaDeskpro, FaEnvelope, FaRegClone, FaRoadCircleXmark, FaUserGroup } from "react-icons/fa6"
import { FaPlaneDeparture, FaRegCalendarAlt, FaUserTie } from "react-icons/fa"

const ICONS = {
    high:<MdKeyboardDoubleArrowUp/>,
    normal:<MdKeyboardArrowUp/>,
    low:<MdKeyboardArrowDown/>
}

export default function Dashboard()
{

    const {currentUser} = useSelector(state => state.user)

    const [tasks, setTasks] = useState([])

    const [employees, setEmployees] = useState([])

    const [leaves,setLeaves] = useState([])

    const [events, setEvents] = useState([])

    const [selectedDate , setSelectedDate] = useState(new Date())

    useEffect(() => {

        const fetchEvents = async () => {

            try
            {
                const res = await axios.get(`/api/event/get-events`)

                if(res.data.success)
                {
                    setEvents(res.data.events)
                }
            }
            catch(error)
            {
                console.log(error.message)
            }

        }

        const fetchTasks = async () => {

            try
            {
                const res = await axios.get(`/api/task/getTasks`)

                if(res.data.success)
                {
                    setTasks(res.data.tasks)
                }
                else
                {
                    console.log(res.data.message)
                }

            }
            catch(error)
            {
                console.log(error)
            }

        }

        const fetchEmployees = async () => {

            try
            {
                const res = await axios.get('/api/employee/get-employees')

                if(res.data.success)
                {
                    setEmployees(res.data.userswithoutPassword)
                }
            }
            catch(error)
            {
                console.log(error)
            }

        }

        const fetchAllLeaveRequest = async () => {

            try
            {
                const res = await axios.get('/api/leave/all-leaves')

                if(res.data.success)
                {
                    setLeaves(res.data.leave)
                }
                else
                {
                    console.log("error at the api")
                }
            }
            catch(error)
            {
                console.log(error.message)
            }

        }

        fetchAllLeaveRequest()
  
        fetchEmployees()
        
        fetchTasks()

        fetchEvents()

    },[])

    const adminEmployees = employees.filter(employee => employee.isAdmin);

    const inprogressTasks = tasks.filter(task => task.stage === 'inprogress');

    const LeavePending = leaves.filter(request => request.status === "pending")

    const upcomingEvents = events.filter(event => new Date(event.date) > new Date());


    // renderEvents
    const renderEvents = (date) => {

        const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString())

        return(

            <div className="">
                {
                    dayEvents.map(event => (

                        <div 
                            key={event._id} 
                            className="border py-2 px-1 shadow bg-red-600 font-semibold truncate text-white rounded text-xs" 
                            aria-label={event.title}
                        >
                            <Tooltip content={event.title} style="dark">
                                {event.title}
                            </Tooltip>

                        </div>

                    ))
                }
            </div>

        )
    }


    return(

        <div className="px-4">
            
            <div className="contain">

                <h2 className="title">DashBoard</h2>
                
                <div className="w-full space-y-10">

                    <div className="w-full flex flex-col gap-x-5 gap-y-10 lg:flex-row">

                        {/* stats */}
                        <div className="containing lg:w-[60%]">

                            {currentUser.isAdmin && (
                                
                                <div className="grid grid-cols-1 gap-y-5 2xl:grid-cols-2">
                                    
                                    {/* employee */}
                                    <div className="containing flex gap-x-5 overflow-hidden">

                                        <span className="h-20 w-20 bg-sky-500 rounded-full flex items-center justify-center ">

                                            <FaUserGroup size={40} className="text-white"/>

                                        </span>

                                        <div className="">

                                            <h3 className="text-3xl lg:text-3xl font-semibold">Empolyees</h3>

                                            <span className=" lg:text-xl font-bold text-gray-600">Total: {employees.length}</span>

                                        </div>

                                    </div>

                                    {/* Admin */}
                                    <div className="containing flex gap-x-5 overflow-hidden">

                                        <span className="h-20 w-20 bg-red-500 rounded-full flex items-center justify-center ">

                                            <FaUserTie size={40} className="text-white"/>

                                        </span>

                                        <div className="">

                                            <h3 className="text-3xl lg:text-3xl font-semibold">Admins</h3>

                                            <span className=" lg:text-xl font-bold text-gray-600">Total: {adminEmployees.length}</span>

                                        </div>

                                    </div>

                                    {/* ongoing projects */}
                                    <div className="containing flex gap-x-5 overflow-hidden">

                                        <span className="h-20 w-20 bg-rose-500 rounded-full flex items-center justify-center ">

                                            <FaUserGroup size={40} className="text-white"/>

                                        </span>

                                        <div className="">

                                            <h3 className="text-3xl lg:text-3xl font-semibold">Ongoing projects</h3>

                                            <span className=" lg:text-xl font-bold text-gray-600">Total: {inprogressTasks.length}</span>

                                        </div>

                                    </div>

                                    {/* leave */}
                                    <div className="containing flex gap-x-5 overflow-hidden">

                                        <span className="h-20 w-20 bg-sky-500 rounded-full flex items-center justify-center ">

                                            <TiDocumentText size={40} className="text-white"/>

                                        </span>

                                        <div className="">

                                            <h3 className="text-3xl lg:text-3xl font-semibold">Pending Leave</h3>

                                            <span className=" lg:text-xl font-bold text-gray-600">Total: {LeavePending.length}</span>

                                        </div>

                                    </div>

                                    {/* upcoming events */}
                                    <div className="containing flex gap-x-5 overflow-hidden">

                                        <span className="h-20 w-20 bg-blue-500 rounded-full flex items-center justify-center ">

                                            <FaRegCalendarAlt size={40} className="text-white"/>

                                        </span>

                                        <div className="">

                                            <h3 className="text-3xl lg:text-3xl font-semibold">Upcoming events</h3>

                                            <span className=" lg:text-xl font-bold text-gray-600">Total: {upcomingEvents.length}</span>

                                        </div>

                                    </div>
                                    
                                </div>
                            )
                            }

                            {
                                !currentUser.isAdmin && (

                                    <div className="grid grid-cols-1 gap-y-5 2xl:grid-cols-2">
                                    
                                        {/* employee */}
                                        <div className="containing flex gap-x-5 overflow-hidden">

                                            <span className="h-20 w-20 bg-sky-500 rounded-full flex items-center justify-center ">

                                                <FaEnvelope size={40} className="text-white"/>

                                            </span>

                                            <div className="">

                                                <h3 className="text-3xl lg:text-3xl font-semibold">Email</h3>

                                                <span className=" lg:text-xl font-bold text-gray-600">{currentUser.email}</span>

                                            </div>

                                        </div>

                                        {/* Role */}
                                        <div className="containing flex gap-x-5 overflow-hidden">

                                            <span className="h-20 w-20 bg-red-500 rounded-full flex items-center justify-center ">

                                                <FaRegClone size={40} className="text-white"/>

                                            </span>

                                            <div className="">

                                                <h3 className="text-3xl lg:text-3xl font-semibold">Role</h3>

                                                <span className=" lg:text-xl font-bold text-gray-600">{currentUser.category}</span>

                                            </div>

                                        </div>
                                    
                                    </div>
                                )
                            }

                        </div>
                        
                        {/* calendar */}
                        <div className="containing lg:w-[40%]">

                            <h3 className="subtitle"> upcoming events</h3>

                            <Calendar
                                value={selectedDate}
                                onClickDay={date => setSelectedDate(date)}
                                tileContent = {({date, view}) => view === 'month' && renderEvents(date)}
                            />

                        </div>

                    </div>

                    {/* list of task */}
                    <div className="containing">

                        <h2 className="subtitle">Ongoing tasks</h2>

                        <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">

                            {
                                inprogressTasks.length > 0  ? 
                                (
                                    <Table>

                                        <Table.Head>

                                            <Table.HeadCell>Priority</Table.HeadCell>

                                            <Table.HeadCell>Title</Table.HeadCell>

                                            <Table.HeadCell>Stage</Table.HeadCell>

                                            <Table.HeadCell>Date</Table.HeadCell>

                                            <Table.HeadCell>Team</Table.HeadCell>

                                            {
                                                currentUser.isAdmin && (

                                                    <Table.HeadCell>Action</Table.HeadCell>

                                                )
                                            }
                                        

                                        </Table.Head>
                                        
                                        {
                                            inprogressTasks.map((task) => (

                                                <Table.Body key={task._id}>

                                                    <Table.Row>

                                                        <Table.Cell>

                                                            <div className={clsx("flex items-center text-sm font-medium",PRIOTITYSTYELS[task.priority])}>

                                                                <span className="text-lg">{ICONS[task.priority]}</span>

                                                                <span className="uppercase">{task.priority}</span>

                                                            </div>

                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {task.title}
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {task.stage}
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {new Date(task.date).toLocaleDateString()}
                                                        </Table.Cell>

                                                        <Table.Cell className="">

                                                            <div className="flex">
                                                                {
                                                                    task.team.map((m,index) => (

                                                                        <div key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index % BGS.length])}>

                                                                            <UserInfo user={m}/>

                                                                        </div>

                                                                    ))
                                                                }
                                                            </div>

                                                        </Table.Cell>

                                                        {
                                                            currentUser.isAdmin && (
                                                                <Table.Cell>
                                                                    
                                                                    <TaskDailog task={task} />

                                                                </Table.Cell>
                                                            )
                                                        }

                                                    </Table.Row>

                                                </Table.Body>

                                            ))
                                        }
                                    </Table>
                                ) 
                                 : 
                                (
                                    <p className="">
                                        You have no task in progress
                                    </p>
                                )
                            }
                            

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}