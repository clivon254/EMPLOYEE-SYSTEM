import { Avatar, Button, Drawer, Dropdown, Navbar } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/logo.png"
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import Logo from "./Logo";
import axios from "axios"
import { signoutSuccess } from "../redux/user/userSlice";
import { toast } from "sonner";
import DashSidebar from "./Sidebar";

export default function Header()
{
    const {theme} = useSelector(state => state.theme)

    const {currentUser} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)


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
        <>

            <Navbar className="border-b sticky top-0 z-50">

                <div className="">

                    {
                        isOpen ? 
                         (
                            <Button 
                                gradientMonochrome="failure" 
                                className="md:hidden"
                                onClick={() => setIsOpen(false)}
                             >
                                 <MdClose />
                            </Button>
                         ) 
                         : 
                         (
                            <Button 
                                gradientMonochrome="success" 
                                className="md:hidden"
                                onClick={() => setIsOpen(true)}
                             >
                                <MdMenu />
                            </Button>
                         )
                    }
                    

                </div>

                <div className="hidden lg:block">

                    <Logo/>

                </div>

                <div className="flex items-center gap-x-2 md:order-2">

                    <button
                        className="w-10 h-10 flex items-center justify-center  border rounded-full border-gray-300"
                        onClick={() => dispatch(toggleTheme())}
                    >
                        {theme === 'light' ? <FaSun/> : <FaMoon/>}
                    </button>

                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="user"
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>

                            <span className="block text-sm">{currentUser.username}</span>

                            <span className="block text-sm font-medium truncate">{currentUser.email}</span>

                        </Dropdown.Header>

                        <Link to="/profile">
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>

                        <Dropdown.Item onClick={handleSignOut}>
                            SignOut
                        </Dropdown.Item>

                    </Dropdown>

                </div>

            </Navbar>

            <Drawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="md:hidden mt-6 "
            >
                <Drawer.Header titleIcon={() => <></>}/>

                <Drawer.Items>

                    <DashSidebar/>

                </Drawer.Items>

            </Drawer>

        </>

    )
}