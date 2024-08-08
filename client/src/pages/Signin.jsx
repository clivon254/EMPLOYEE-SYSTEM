
import { useState } from "react"
import logo from "../assets/logo.png"
import Logo from "../components/Logo"
import { Alert, Button, Label,Spinner,TextInput } from "flowbite-react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice"
import { toast } from "sonner"

export default function SignIn()
{
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const {loading, error} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleChange
    const handleChange = async (event) => {

        const name = event.target.name ;

        const value = event.target.value ;

        setFormData(data => ({...data,[name]:value}))
    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(!formData.email || !formData.password)
        {
            return dispatch(signInFailure('Please fill out all the feilds'))
        }

        try
        {
            dispatch(signInStart())

            const res = await axios.post('/api/auth/sign-in', formData)

            if(res.data.success)
            {
                dispatch(signInSuccess(res.data.rest))

                toast.success("signed in successfully")

                navigate('/')
            }
            else
            {
                dispatch(signInFailure(res.data.message))

                toast.error("WRONG PASSWEORD OR EMAIL")
            }
        }
        catch(error)
        {
            dispatch(signInFailure(error.message))

            console.log(error)
        }

    }

    return(

        <div className="w-full h-screen flex">

            <div className="hidden md:flex flex-col gap-y-4 min-h-screen w-1/3 bg-amber-50 dark:bg-black items-center justify-center">

                <img 
                    src={logo}
                    alt="logo" 
                    className="h-30 w-20" 
                /> 

                <Logo/>

                <span className="text-xl lg:text-2xl font-black">
                    Welcome back !
                </span>

            </div>

            <div className="flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black px-10 md:px-28 lg:px-40">

                <div className="w-full flex flex-col items-center justify-center gap-y-5 py-12 sm:px-6 lg:px-8">

                    {/* logo */}
                    <div className="md:hidden flex flex-col items-center gap-y-5">

                        <img 
                            src={logo} 
                            alt="logo" 
                            className="w-20 h-10" 
                        />

                        <Logo/>

                    </div>

                    <h2 className="hidden md:block text-sm lg:text-xl xl:text-2xl text-amber-500 font-bold">Everything.Right where you need it</h2>

                    <div className="max-w-md w-full">

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* email */}
                            <div className="flex flex-col gap-y-2">

                                <Label value="Your email"/>

                                <TextInput
                                    type="email"
                                    placeholder="name@company.com"
                                    name="email"
                                    className=""
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* password */}
                            <div className="flex flex-col gap-y-2">

                                <Label value="Your password"/>

                                <TextInput
                                    type="password"
                                    placeholder="**********"
                                    name="password"
                                    className=""
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* forgot password */}
                            <div className="flex justify-between items-center">

                                <span className="text-xs flex items-center gap-2 font-semibold">
                                    <input type="checkbox" className="outline-none rounded" />
                                    Remember me 
                                </span>

                                <span className="text-xs cursor-pointer hover:text-amber-600 font-semibold">
                                    forgort password?
                                </span>

                            </div>

                            <Button type="submit" gradientDuoTone="redToYellow" disabled={loading}>
                                {
                                    loading ? 
                                    (
                                        <>
                                            <Spinner/>

                                            <span className="pl-3">Loading ....</span>
                                        </>
                                    ) 
                                     : 
                                    "Sign In"
                                }
                            </Button>
                            
                        </form>

                        {
                            error && (
                                <Alert className="mt-5 " color="failure">
                                    {error}
                                </Alert>
                            )
                        }

                    </div>

                </div>

            </div>

        </div>

    )
}