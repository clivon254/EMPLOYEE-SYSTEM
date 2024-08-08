import axios from "axios"
import { Button, Label, Table, TableRow, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export default function Leave()
{
    const {currentUser} = useSelector(state => state.user)

    const [employeeLeaveRequests, setEmployeeLeaveRequests] = useState([])

    const [leaveRequests, setLeaveRequests] = useState([])

    const [leaveId, setLeaveId] = useState(null)

    const [leave,setLeave] = useState({
        username:currentUser.username,
        empid:currentUser._id ,
        fromDate:'',
        toDate:"",
        reason:"",
        email:currentUser.email
    })

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {

        const fetchEmployeeLeaveRequest = async () => {

            try
            {
                const res = await axios.get(`/api/leave/get-leave/${id}`)

                if(res.data.success)
                {
                    setEmployeeLeaveRequests(res.data.leave)
                }
                else
                {
                    console.log("error at the api")
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
                    setLeaveRequests(res.data.leave)
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

        fetchEmployeeLeaveRequest()

    },[id])

    // withdraw your Desicion
    const handleWithDraw = (leaveId) => {

        try
        {
            const res = axios.delete(`/api/leave/leave-withdraw/${leaveId}`)

            if(res.data.success)
            {
                employeeLeaveRequests(employeeLeaveRequests.filter(request => request._id !== leaveId))

                toast.success("Leave request withdrawn successully")
            }
            else
            {
                console.log("Error updating leave requests")
            }
        }
        catch(error)
        {
            console.log(error.message)
        }
    }

    // handleChange
    const handleChange = (e) => {

        const {name,value} = e.target 

        setLeave(prevLeave => ({...prevLeave, [name]:value}))

    }

    // handleSubmit
    const handleSubmit = async (event) => {

        event.preventDefault()

        if(new Date(leave.fromDate) >= new Date(leave.toDate))
        {
            toast.error("start date must be before the end date")
        }

        try
        {
            const res = await axios.post(`/api/leave/apply-leave`, leave)

            if(res.data.success)
            {
                toast.success("Leave request submitted successfully")

            }
            else
            {
                console.log(res.data.message)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // handleDecision
    const handleDecision = async (id,status) => {

        try
        {
            const res = await axios.post(`/api/leave/status/${id}`,{status})

            if(res.data.success)
            {
                toast.success("Leave request status updated successfully")

                setLeaveRequests( prevRequests => 
                    prevRequests.map(req => 
                        req._id ===  id ? {...req, status} : req
                    )
                )

            }
            else
            {
                console.log(res.data.message)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    const emlpoyeePending = employeeLeaveRequests.filter(request => request.status === "pending")

    const emlpoyeeOtherPending = employeeLeaveRequests.filter(request => request.status !== "pending")

    const LeavePending = leaveRequests.filter(request => request.status === "pending")

    const OtherLeave = leaveRequests.filter(request => request.status !== "pending")

    
    return( 

        <div className="px-4">

            <div className="contain">

                <h2 className="title ">{currentUser.isAdmin ? "Leave Requsts" : "Apply for Leave"}</h2>

                {
                    !currentUser.isAdmin && (
                        
                        <div className="">

                            <div className="space-y-10">
                                
                                <div className="containing">

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

                                        <div className="w-full flex flex-col gap-y-3 md:flex-row gap-x-4">

                                            {/* name */}
                                            <div className="w-full flex flex-col gap-y-1">

                                                <Label value="Useraname"/>

                                                <TextInput
                                                    type="text"
                                                    name="username"
                                                    value={leave.username}
                                                    readOnly
                                                />

                                            </div>
                                            
                                            {/* email */}
                                            <div className="w-full flex flex-col gap-y-1">

                                                <Label value="Email"/>

                                                <TextInput
                                                    type="email"
                                                    name="email"
                                                    value={leave.email}
                                                    readOnly
                                                />

                                            </div>

                                        </div>

                                        <div className="w-full flex flex-col gap-y-3 md:flex-row gap-x-4">

                                            {/* start */}
                                            <div className="w-full flex flex-col gap-y-1">

                                                <Label value="Start date"/>

                                                <TextInput
                                                    type="Date"
                                                    name="fromDate"
                                                    value={leave.fromDate}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                            {/* End */}
                                            <div className="w-full flex flex-col gap-y-1">

                                                <Label value="End date"/>

                                                <TextInput
                                                    type="Date"
                                                    name="toDate"
                                                    value={leave.toDate}
                                                    onChange={handleChange}
                                                    required
                                                />

                                            </div>

                                        </div>

                                        <ReactQuill 
                                            theme="snow"
                                            placeholder="Reason for leave ...."
                                            className="h-40 mb-16"
                                            required
                                            onChange={(value) => {
                                                setLeave({...leave, reason:value})
                                            }}
                                        />

                                        {/* button */}
                                        <div className="flex justify-center">

                                            <Button type="submit" gradientDuoTone="greenToBlue">
                                                submit
                                            </Button>

                                        </div>

                                    </form>

                                </div>

                                <div className="space-y-10">

                                    {/* pending Leave Requests for Employee */}
                                    <div className="containing table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

                                        <h3 className="subtitle text-center">Pending Requests</h3>

                                        <div className="">

                                            {
                                                emlpoyeePending.length > 0 ?
                                                (
                                                    <Table>

                                                        <Table.Head>

                                                            <Table.HeadCell>Employee Name</Table.HeadCell>

                                                            <Table.HeadCell>Email</Table.HeadCell>

                                                            <Table.HeadCell>Start Date</Table.HeadCell>

                                                            <Table.HeadCell>End Date</Table.HeadCell>

                                                            <Table.HeadCell>Reason</Table.HeadCell>

                                                            <Table.HeadCell>Actions</Table.HeadCell>

                                                        </Table.Head>

                                                        {
                                                            emlpoyeePending.map((leave ) => (

                                                                <Table.Body key={leave._id}>

                                                                    <TableRow>

                                                                        {/* username */}
                                                                        <Table.Cell>
                                                                            {leave.username}
                                                                        </Table.Cell>
                                                                        
                                                                        {/* Email */}
                                                                        <Table.Cell>
                                                                            {leave.email}
                                                                        </Table.Cell>

                                                                        {/* startDate */}
                                                                        <Table.Cell>
                                                                            {new Date(leave.fromdate).toLocaleDateString()}
                                                                        </Table.Cell>

                                                                        {/* EndDate */}
                                                                        <Table.Cell>
                                                                            {new Date(leave.todate).toLocaleDateString()}
                                                                        </Table.Cell>

                                                                        {/* reason */}
                                                                        <Table.Cell>
                                                                            {leave.reason}
                                                                        </Table.Cell>


                                                                        {/* Actions*/}
                                                                        <Table.Cell>

                                                                            <div className="">

                                                                                <Button
                                                                                    gradientMonochrome="success"
                                                                                    onClick={() => handleWithDraw(leave._id)}
                                                                                >
                                                                                    Withdraw
                                                                                </Button>

                                                                            </div>

                                                                        </Table.Cell>

                                                                        
                                                                    </TableRow>

                                                                </Table.Body>
                                                            ))
                                                        }

                                                    </Table>
                                                ) 
                                                :
                                                (
                                                    <p className="text-center text-xl font-thin">
                                                        No Pending Requests for you Yet !
                                                    </p>
                                                )
                                            }
                                        </div>

                                    </div>

                                    {/* Other Leave Requests for Employee */}
                                    <div className="containing table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

                                        <h3 className="subtitle text-center"> Requests Log</h3>

                                        <div className="">

                                            {
                                                emlpoyeeOtherPending.length > 0 ?
                                                (
                                                    <Table>

                                                        <Table.Head>

                                                            <Table.HeadCell>Employee Name</Table.HeadCell>

                                                            <Table.HeadCell>Email</Table.HeadCell>

                                                            <Table.HeadCell>Start Date</Table.HeadCell>

                                                            <Table.HeadCell>End Date</Table.HeadCell>

                                                            <Table.HeadCell>Reason</Table.HeadCell>

                                                            <Table.HeadCell>Status</Table.HeadCell>

                                                        </Table.Head>

                                                        {
                                                            emlpoyeeOtherPending.map((leave ) => (

                                                                <Table.Body key={leave._id}>

                                                                    <TableRow>

                                                                        {/* username */}
                                                                        <Table.Cell>
                                                                            {leave.username}
                                                                        </Table.Cell>
                                                                        
                                                                        {/* Email */}
                                                                        <Table.Cell>
                                                                            {leave.email}
                                                                        </Table.Cell>

                                                                        {/* startDate */}
                                                                        <Table.Cell>
                                                                            {new Date(leave.fromdate).toLocaleDateString()}
                                                                        </Table.Cell>

                                                                        {/* EndDate */}
                                                                        <Table.Cell>
                                                                            {new Date(leave.todate).toLocaleDateString()}
                                                                        </Table.Cell>

                                                                        {/* reason */}
                                                                        <Table.Cell>
                                                                            {leave.reason}
                                                                        </Table.Cell>

                                                                        {/* Actions*/}
                                                                        <Table.Cell>

                                                                            {leave.status}

                                                                        </Table.Cell>

                                                                        

                                                                    </TableRow>

                                                                </Table.Body>
                                                            ))
                                                        }

                                                    </Table>
                                                ) 
                                                :
                                                (
                                                    <p className="text-center text-xl font-thin">
                                                        No Requests Yet !
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


                {
                    currentUser.isAdmin && (

                    <div className="space-y-10  ">

                        {/* pending Leave Requests for Admin */}
                        <div className="containing table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

                            <h3 className="subtitle text-center">Pending Requests</h3>

                            <div className="">

                                {
                                    LeavePending.length > 0 ?
                                     (
                                        <Table>

                                            <Table.Head>

                                                <Table.HeadCell>Employee Name</Table.HeadCell>

                                                <Table.HeadCell>Email</Table.HeadCell>

                                                <Table.HeadCell>Start Date</Table.HeadCell>

                                                <Table.HeadCell>End Date</Table.HeadCell>

                                                <Table.HeadCell>Reason</Table.HeadCell>

                                                <Table.HeadCell>Actions</Table.HeadCell>

                                            </Table.Head>

                                            {
                                                LeavePending.map((leave ) => (

                                                    <Table.Body key={leave._id}>

                                                        <TableRow>

                                                            {/* username */}
                                                            <Table.Cell>
                                                                {leave.username}
                                                            </Table.Cell>
                                                            
                                                            {/* Email */}
                                                            <Table.Cell>
                                                                {leave.email}
                                                            </Table.Cell>

                                                            {/* startDate */}
                                                            <Table.Cell>
                                                                {new Date(leave.fromdate).toLocaleDateString()}
                                                            </Table.Cell>

                                                            {/* EndDate */}
                                                            <Table.Cell>
                                                                {new Date(leave.todate).toLocaleDateString()}
                                                            </Table.Cell>

                                                            {/* reason */}
                                                            <Table.Cell>
                                                                {leave.reason}
                                                            </Table.Cell>


                                                            {/* Actions*/}
                                                            <Table.Cell>

                                                                <div className="flex gap-x-3">

                                                                    <Button
                                                                        gradientMonochrome="success"
                                                                        onClick={() => handleDecision(leave._id,"accepted")}
                                                                    >
                                                                        Accept
                                                                    </Button>

                                                                    <Button
                                                                         gradientMonochrome="failure"
                                                                        onClick={() => handleDecision(leave._id,"rejected")}
                                                                    >
                                                                        Reject
                                                                    </Button>

                                                                </div>

                                                            </Table.Cell>

                                                            

                                                        </TableRow>

                                                    </Table.Body>
                                                ))
                                            }

                                        </Table>
                                     ) 
                                      :
                                     (
                                        <p className="text-center text-xl font-thin">
                                            No Pending Requests Yet !
                                        </p>
                                     )
                                }
                            </div>

                        </div>

                        {/* Other Leave Requests for Admin */}
                        <div className="containing table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

                            <h3 className="subtitle text-center"> Requests Log</h3>

                            <div className="">

                                {
                                    OtherLeave.length > 0 ?
                                     (
                                        <Table>

                                            <Table.Head>

                                                <Table.HeadCell>Employee Name</Table.HeadCell>

                                                <Table.HeadCell>Email</Table.HeadCell>

                                                <Table.HeadCell>Start Date</Table.HeadCell>

                                                <Table.HeadCell>End Date</Table.HeadCell>

                                                <Table.HeadCell>Reason</Table.HeadCell>

                                                <Table.HeadCell>Status</Table.HeadCell>

                                            </Table.Head>

                                            {
                                                OtherLeave.map((leave ) => (

                                                    <Table.Body>

                                                        <TableRow>

                                                            {/* username */}
                                                            <Table.Cell>
                                                                {leave.username}
                                                            </Table.Cell>
                                                            
                                                            {/* Email */}
                                                            <Table.Cell>
                                                                {leave.email}
                                                            </Table.Cell>

                                                            {/* startDate */}
                                                            <Table.Cell>
                                                                {new Date(leave.fromdate).toLocaleDateString()}
                                                            </Table.Cell>

                                                            {/* EndDate */}
                                                            <Table.Cell>
                                                                {new Date(leave.todate).toLocaleDateString()}
                                                            </Table.Cell>

                                                            {/* reason */}
                                                            <Table.Cell>
                                                                {leave.reason}
                                                            </Table.Cell>

                                                            {/* Actions*/}
                                                            <Table.Cell>

                                                                {leave.status}

                                                            </Table.Cell>

                                                            
                                                        </TableRow>

                                                    </Table.Body>
                                                ))
                                            }

                                        </Table>
                                     ) 
                                      :
                                     (
                                        <p className="text-center text-xl font-thin">
                                            No Requests Yet !
                                        </p>
                                     )
                                }
                            </div>

                        </div>

                    </div>
                )}
                

            </div>
           
        </div>

    )
}