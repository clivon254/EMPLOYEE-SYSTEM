import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { toast } from "sonner";


export default function AddEmployee()
{
    const [formData, setFormData] = useState({})

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData, [e.target.name]:e.target.value})
    }

    // habdleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            const res = await axios.post('/api/auth/sign-up', formData)

            if(res.data.success)
            {
                toast.success("You have successfully added an Employee")

                setFormData({})
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

    console.log(formData)

    return(

        <div className="px-4">
           
           <div className="contain">

                <h2 className="title">Add Employee</h2>
                
                <div className="w-full flex items-center justify-center">

                    <form onSubmit={handleSubmit} className="w-full space-y-5 max-w-lg">

                        {/* username */}
                        <div className="">

                            <Label value="Username"/>

                            <TextInput
                                type="text"
                                name="username"
                                placeholder="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            
                        </div>

                        {/*email */}
                        <div className="">

                            <Label value="email"/>

                            <TextInput
                                type="email"
                                name="email"
                                placeholder="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            
                        </div>

                        {/* role*/}
                        <div className="">

                            <Label value="Role"/>

                            <TextInput
                                type="text"
                                name="category"
                                placeholder="Role"
                                value={formData.category}
                                onChange={handleChange}
                            />
                            
                        </div>
                    
                        {/* password */} 
                        <div className="">

                            <Label value="password"/>

                            <TextInput
                                type="password"
                                name="password"
                                placeholder="*******"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            
                        </div>

                        <Button type="submit" gradientDuoTone="purpleToBlue">
                            Submit
                        </Button>

                    </form>

                </div>

           </div>

        </div>

    )
}