import { Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";
import { Fragment, useRef } from "react";



export default function ModalWrapper({open,setOpen,children})
{

    const cancelButtonRef = useRef(null)

    return(

        <Transition.Root show={open} as={Fragment}>

            <Dialog
             as="div"
             className=""
             initialFocus={cancelButtonRef}
             onClose={() => setOpen(false)}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave='ease-in-duration'
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >

                    <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity"></div>

                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">

                    <div className="flex h-full items-center justify-center p-4 text-center sm:p-0">

                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave='ease-in duration-200'
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >

                            <DialogPanel className="wfull relative transform overflow-hidden rounded-lg bg-white ">

                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                                    <div className="sm:flex sm:items-start ">
                                        
                                        <div className="w-full mt-3 sm:ml-4 sm:mt-4 sm:text-left">
                                            {children}
                                        </div>

                                    </div>

                                </div>

                            </DialogPanel>

                        </TransitionChild>

                    </div>
                    
                </div>

            </Dialog>

        </Transition.Root>

    )

}