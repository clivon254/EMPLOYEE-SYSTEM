import { Button, Modal, ModalHeader, Popover } from "flowbite-react";
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react"
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs"
import { RiDeleteBin6Line }  from "react-icons/ri"
import {MdOutlineEdit,MdAdd,} from "react-icons/md"
import {AiTwotoneAccountBook,AiTwotoneFolderOpen} from "react-icons/ai"
import {HiDuplicate, HiOutlineExclamationCircle} from "react-icons/hi"
import AddTask from "./AddTask";
import AddSubTask from "./AddSubTask";
import ConfirmationDailog from "../ConfirmationDailog";
import axios from "axios";
import { toast } from "sonner";

export default function TaskDailog({task})
{
    const [open,setOpen] = useState(false)

    const [openEdit, setOpenEdit] = useState(false)

    const [openDailog, setOpenDailog] = useState(false)

    const navigate = useNavigate()


    // duplicate
    const duplicateHanlder = () => {}
    
    // delete
    const deleteClicks = async () => {

        try
        {
            const res = await axios.put(`/api/task/trash-task/${task._id}`)

            if(res.data.success)
            {
                toast.success("task moved to trash successfully")

                setOpenDailog(false)
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    const items = [
        {
          label: "Open Task",
          icon: <AiTwotoneFolderOpen className='mr-2 h-5 w-5' aria-hidden='true' />,
          onClick: () => navigate(`/task/${task._id}`),
        },
        {
          label: "Update",
          icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
          onClick: () => navigate( `/updateTask/${task._id}`),
        },
        {
          label: "Add Sub-Task",
          icon: <MdAdd className='mr-2 h-5 w-5' aria-hidden='true' />,
          onClick: () => setOpen(true),
        },
        {
          label: "Duplicate",
          icon: <HiDuplicate className='mr-2 h-5 w-5' aria-hidden='true' />,
          onClick: () => duplicateHanlder(),
        },
      ];

    return(
        
        <>

            <div className="">

                <Menu as="div" className="relative inline-block text-left">

                    <MenuButton>

                        <BsThreeDots  />

                    </MenuButton>
                
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transition opacity-0 scale-95"
                    >

                        <MenuItems  className="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y-2 divide-gray-100 rounded-md bg-white dark:text-gray-600 ring-black/5 focus:outline-none">

                            <div className="px-1 py-1 space-y-2">
                                {
                                    items.map((el) => (

                                        <MenuItem key={el.label}>
                                            {({active}) => (

                                                <button 
                                                    onClick={el.onClick}
                                                    className={`${active ? "bg-blue-500 text-white" :"text-gray-900"}group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                >
                                                    {el.icon}
                                                    {el.label}
                                                </button>

                                            )}
                                        </MenuItem>
                                    ))
                                }
                            </div>

                            <div className="px-1 py-1">

                                <MenuItem>
                                    {
                                        ({active}) => (

                                            <button 
                                                onClick={() => setOpenDailog(true)}
                                                className={`${active ? "bg-blue-500 text-white":"text-red-90"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                <RiDeleteBin6Line className="mr-2 h-5 w-5 text-red-400" aria-hidden="true"/>
                                                Delete
                                            </button>
                                        )
                                    }
                                </MenuItem>

                            </div>

                        </MenuItems>

                    </Transition>

                </Menu>


            </div>

            <AddSubTask open={open} setOpen={setOpen} id={task._id}/>

            <Modal 
                show={openDailog}
                onClose={() => setOpenDailog(false)}
                popup
                size='md'
                className="mt-auto"
            >

                <ModalHeader/>

                <Modal.Body>

                    <div className="text-center space-y-4">

                        <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gry-200 mb-4 mx-auto"/>

                        <h3 className="">Are you sure you want to delete this task</h3>

                        <div className="flex justify-center gap-x-4">

                            <Button gradientMonochrome="failure" onClick={deleteClicks}>
                                Yes , I am sure
                            </Button>

                            <Button gradientMonochrome="success" onClick={() => setOpenDailog(false)}>
                                cancel
                            </Button>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>

        </>

    )
        
}