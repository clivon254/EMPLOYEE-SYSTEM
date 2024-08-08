
import { Sidebar } from "flowbite-react";
import { HiAnnotation, HiArrowSmRight, HiCalendar, HiChartPie, HiDesktopComputer, HiLogout, HiPencil, HiUser, HiUserGroup, HiUsers } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { signoutSuccess } from "../redux/user/userSlice";
import { toast } from "sonner";
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/logo.png"

export default function DashSidebar()
{
    const {currentUser} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleSignOut
    const handleSignOut = async () => {

        try
        {
            const res = await axios.post('/api/auth/sign-out')

            if(res.data.success)
            {
                dispatch(signoutSuccess())

                toast.success('you have signed out successfully')

                navigate('/sign-in')
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }

    return(

        <Sidebar className="w-full h-full">

            <Sidebar.Items>

                <Sidebar.ItemGroup className="">
                     
                    <img  
                        src={logo} 
                        alt="logo" 
                        className="h-10 w-20 hidden md:block" 
                    />

                    <div className="flex flex-col gap-y-2">

                        <Link to="/">

                            <Sidebar.Item
                                active={window.location.pathname === '/'}
                                icon={HiChartPie}
                                as="div"
                            >
                                Dashboard
                            </Sidebar.Item>
                            
                        </Link>

                        {
                            currentUser && currentUser.isAdmin ? 
                                (
                                    <Link to="/employee">

                                        <Sidebar.Item
                                            active={window.location.pathname === '/employee'}
                                            icon={HiUsers}
                                            as="div"
                                        >
                                            Manage Employees
                                        </Sidebar.Item>
                            
                                    </Link>
                                ) 
                                : 
                                (
                                    <Link to="/profile">

                                        <Sidebar.Item
                                            active={window.location.pathname === '/profile'}
                                            icon={HiChartPie}
                                            as="div"
                                        >
                                            Profile
                                        </Sidebar.Item>
                            
                                    </Link>
                                )
                        }

                        

                        <Link to="/task">

                            <Sidebar.Item
                                active={window.location.pathname === '/task'}
                                icon={HiChartPie}
                                as="div"
                            >
                                Task
                            </Sidebar.Item>
                            
                        </Link>

                        <Link to="/event">

                            <Sidebar.Item
                            active={window.location.pathname === '/event'}
                            icon={HiCalendar}
                            as="div"
                            >
                            Event
                            </Sidebar.Item>
                            
                        </Link>

                        <Link to={`/leave/${currentUser._id}`}>

                            <Sidebar.Item
                            active={window.location.pathname === '/leave'}
                            icon={HiChartPie}
                            as="div"
                            >
                            Leave
                            </Sidebar.Item>
                            
                        </Link>

                        <Sidebar.Item
                            icon={HiLogout}
                            as="div"
                            onClick={handleSignOut}
                            className="cursor-pointer"
                        >
                            sign out
                        </Sidebar.Item>
                    
                   </div>

                </Sidebar.ItemGroup>

            </Sidebar.Items>

        </Sidebar>

    )
}