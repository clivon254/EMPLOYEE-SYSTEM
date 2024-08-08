
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, TextInput } from "flowbite-react";
import { useRef, useState ,useEffect} from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { app } from "../firebase";
import { signoutSuccess, updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";

export default function UpdateEmployee()
{

    const {currentUser, error, loading} = useSelector(state => state.user)

    const [imageFile, setImageFile] = useState(null)

    const [imageFileUrl, setImageFileUrl] = useState(null)

    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)

    const [imageFileUploadError, setImageFileUploadError] = useState(null)

    const [imageFileUploading,setImageFileUploading] = useState(false)

    const [updateUserSuccess, setUpdateUserSuccess] = useState(null)

    const [updateUserError, setUpdateUserError] = useState(null)

    const [formData, setFormData] = useState({})

    const [employee, setEmployee] = useState({})


    const filePickerRef = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleImageChange
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if(file)
        {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    const {employeeId} = useParams()

    useEffect(() => {
        if(imageFile)
        {
            uploadImage()
        }

        // fetchEmpolyee
        const fetchEmployee = async () => {

            try
            {
                const res = await axios.get(`/api/employee/get-employee/${employeeId}`)

                if(res.data.success)
                {
                    setEmployee(res.data.rest)
                }
            }
            catch(error)
            {
                console.log(error.message)
            }

        }

        fetchEmployee()

    },[imageFile])

    // uploadImage
    const uploadImage = async () => {

        setImageFileUploading(true)

        setImageFileUploadError(null)

        const storage = getStorage(app)

        const fileName = new Date().getTime() + imageFile.name

        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, imageFile)
        
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100 ;

                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageFileUploadError(
                    'Could not upload image (File must be less than 2MB)'
                )
                setImageFileUploadProgress(null)

                setImageFile(null)

                setImageFileUrl(false)

                setImageFileUploading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    setImageFileUrl(downloadURL);

                    setFormData({...formData, profilePicture : downloadURL})

                    setImageFileUploading(false)
                })
            }
        )
    }

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault();

        setUpdateUserError(null)

        setUpdateUserSuccess(null)

        if(Object.keys(formData).length === 0)
        {
            setUpdateUserError('No changes mades')
        }

        if(imageFileUploading)
        {
            setUpdateUserError('Please wait for the image to upload')
            return
        }

        try
        {
            // dispatch(updateStart())

            const res = await fetch(`/api/employee/update/${employee._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })

            const data = await res.json()

            if(res.ok)
            {
                // dispatch(updateSuccess(data))

                setUpdateUserSuccess("User's profile updated successfully ")
            }
            else
            {
                // dispatch(updateFailure(data.message))

                setUpdateUserError(data.message)
            }

        }
        catch(error)
        {
            dispatch(updateFailure(error.message))

            setUpdateUserError(error.message)
        }

    }

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
            <div className="px-4">

                <div className="contain">
                    
                    <h1 className="my-7 text-center font-semibold text-3xl">
                        Profile
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            ref={filePickerRef}
                            hidden
                        />

                        <div 
                            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                            onClick={() => filePickerRef.current.click()}
                        >
                            {imageFileUploadProgress && (
                                <CircularProgressbar 
                                    value={imageFileUploadProgress || 0}
                                    text={`${imageFileUploadProgress}%`}
                                    strokeWidth={5}
                                    styles={{
                                        root:{
                                            width:'100%',
                                            height:'100%',
                                            position:'absolute',
                                            top:0,
                                            left:0
                                        },
                                        path:{
                                            stroke:`rgba(62, 152, 199,${imageFileUploadProgress /100})`
                                        }
                                    }}
                                />
                            )}

                            <img 
                                src={imageFileUrl || currentUser.profilePicture} 
                                alt="user"
                                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]
                                    ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
                            />

                        </div>

                        {
                            imageFileUploadError && (
                                <Alert color="failure">
                                    {imageFileUploadError}
                                </Alert>
                            )
                        }

                        <TextInput
                            type="text"
                            name="username"
                            placeholder="username"
                            defaultValue={employee.username}
                            onChange={handleChange}
                        />

                        <TextInput
                            type="email"
                            name="email"
                            placeholder="email"
                            defaultValue={employee.email}
                            onChange={handleChange}
                        />

                        <TextInput
                            type="text"
                            name="category"
                            placeholder="department"
                            defaultValue={employee.category}
                            onChange={handleChange}
                        />

                        <TextInput
                            type="text"
                            name="shift"
                            placeholder="shift"
                            defaultValue={employee.shift}
                            onChange={handleChange}
                        />

                    
                        <Button
                            type="submit"
                            gradientDuoTone="greenToBlue"
                            outline
                            disabled={loading || imageFileUploading}
                        >
                            {loading ? "Loading...":"update"}
                        </Button>

                    </form>

                    <div className="text-red-500 flex justify-center mt-5">

                        <span onClick={handleSignOut} className="cursor-pointer">
                            Sign out
                        </span>

                    </div>

                    {
                        updateUserSuccess && (
                            <Alert color="success" className="mt-5">
                                {updateUserSuccess}
                            </Alert>
                        )
                    }

                    {
                        updateUserError && (

                            <Alert color="failure" className="mt-5">
                                {updateUserError}
                            </Alert>
                        )
                    }

                    {
                        error && (
                            <Alert color="failure" className="mt-5">
                                {error}
                            </Alert>
                        )
                    }

                </div>

            </div>
        </>
    )
}