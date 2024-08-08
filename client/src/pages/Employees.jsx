import axios from "axios"
import { Button, Modal, Table } from "flowbite-react"
import { useEffect } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import {useState} from "react"
import {FaTimes, FaCheck} from "react-icons/fa"
import {Link} from "react-router-dom"


export default function Employees()
{
    const {currentUser} = useSelector((state) => state.user)

    const [employees, setEmployees] = useState([])

    const [showModal, setShowModal] = useState(false)

    const [employeeIdToDelete,setEmployeeIdToDelete] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchEmployees = async () => {

            try
            {
                setLoading(true)

                const res = await axios.get('/api/employee/get-employees')

                if(res.data.success)
                {
                    setEmployees(res.data.userswithoutPassword)

                    setLoading(false)
                }
            }
            catch(error)
            {
                console.log(error)

                setLoading(false)
            }

        }

        if(currentUser.isAdmin)
        {
            fetchEmployees()
        }

    },[currentUser._id])

    // handleDeleteUser
    const handleDeleteUser = async () => {

        try
        {
            const res = await axios.delete(`/api/employee/delete/${employeeIdToDelete}`)
            
            if(res.data.success)
            {
                setEmployees(
                    (prev) => prev.filter((user) => user._id !== employeeIdToDelete)
                )

                setShowModal(false)

                toast.success("The employee has been deleted successfully")
            }
            else
            {
                console.log(`problem with success`)
            }
        }
        catch(error)
        {
            console.log(error)
        }

    }

    if(loading)
    {
        return(

            <div className="contain space-y-5 ">

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                    <div class="animate-pulse flex space-x-4">

                        <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                        <div class="flex-1 space-y-6 py-1">
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                    <div class="animate-pulse flex space-x-4">

                        <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                        <div class="flex-1 space-y-6 py-1">
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                    <div class="animate-pulse flex space-x-4">

                        <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                        <div class="flex-1 space-y-6 py-1">
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="border border-gray-500 shadow rounded-md p-4  w-full mx-auto">

                    <div class="animate-pulse flex space-x-4">

                        <div class="rounded-full bg-slate-200 h-10 w-10"></div>

                        <div class="flex-1 space-y-6 py-1">
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            
        )
    }

    return(
        
        <div className="px-4">

            <div className="flex justify-end my-2">

                <Button gradientMonochrome="lime">

                    <Link to="/addEmployee">
                         Add Employee
                    </Link>

                </Button>

            </div>

            <div className="contain table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
                
                
                {
                    currentUser.isAdmin && employees.length > 0 ? 
                        (
                            <Table hoverable className="shadow-md">

                                <Table.Head>

                                    <Table.HeadCell>Date Created</Table.HeadCell>

                                    <Table.HeadCell>Employee Image</Table.HeadCell>

                                    <Table.HeadCell>username</Table.HeadCell>

                                    <Table.HeadCell>email</Table.HeadCell>

                                    <Table.HeadCell>Role</Table.HeadCell>

                                    <Table.HeadCell>Admin</Table.HeadCell>

                                    <Table.HeadCell>shift</Table.HeadCell>

                                    <Table.HeadCell>status</Table.HeadCell>

                                    <Table.HeadCell>update</Table.HeadCell>

                                    <Table.HeadCell>Delete</Table.HeadCell>

                                </Table.Head>


                                {
                                    employees.map((employee) => (

                                        <Table.Body className="divide-y">

                                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                                {/* date */}
                                                <Table.Cell>
                                                    {new Date(employee.createdAt).toLocaleDateString()}
                                                </Table.Cell>

                                                {/* profile Picture */}
                                                <Table.Cell>
                                                    
                                                    <img src={employee.profilePicture} alt="" className="rounded-full h-12 w-12" />

                                                </Table.Cell>

                                                {/* username */}
                                                <Table.Cell>
                                                    {employee.username}
                                                </Table.Cell>

                                                {/* email */}
                                                <Table.Cell>
                                                    {employee.email}
                                                </Table.Cell>

                                                {/* Role */}
                                                <Table.Cell>
                                                    {employee.category}
                                                </Table.Cell>

                                                {/*admin*/}
                                                <Table.Cell>
                                                    {employee.isAdmin ?  (<FaCheck className="text-green-500"/>) : ( <FaTimes className="text-red-500"/>) }        
                                                </Table.Cell>

                                                {/* shift */}
                                                <Table.Cell>
                                                    {employee.shift}
                                                </Table.Cell>

                                                {/* status */}
                                                <Table.Cell >

                                                    <span className={`px-2 py-1 border rounded-full font-semibold ${employee.status ? "bg-green-400 text-green-700 border-green-600" : "bg-red-400 text-red-700 border-red-600"}`}>
                                                         {employee.status ? "active" : "inactive" }
                                                    </span>

                                                </Table.Cell>

                                                {/* update */}
                                                <Table.Cell >

                                                    <Link to={`/update-employee/${employee._id}`}>

                                                        <Button gradientMonochrome="cyan">
                                                            Edit
                                                        </Button>

                                                    </Link>

                                                </Table.Cell>

                                                {/* delete */}
                                                <Table.Cell >   

                                                    <Button 
                                                        gradientMonochrome="pink"
                                                        onClick={() => {
                                                            setShowModal(true)

                                                            setEmployeeIdToDelete(employee._id)
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>

                                                </Table.Cell>

                                            </Table.Row>

                                        </Table.Body>
                                    ))
                                }

                            </Table>
                        )
                        :
                        (
                            <p className="text-center my-auto text-xl font-semibold">
                                You have no employees yet
                            </p>
                        )
                }

            </div>

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md"
            >
                <Modal.Header />

                <Modal.Body>

                    <div className="text-center">

                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>

                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this Employee
                        </h3>

                        <div className="flex justify-center gap-4">

                            <Button color="failure" onClick={handleDeleteUser}>
                                Yes, I,am sure
                            </Button>

                            <Button onClick={() => setShowModal(false)}>
                                No, Cancel
                            </Button>
                        </div>

                    </div>

                </Modal.Body>
                
            </Modal>

        </div>

    )
}