import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsChevronBarExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";




export default function SelectedList({lists,selected,setSelected,label})
{
    return(

       <div className="w-full">

        {label && <p className="">{label}</p>}

        <Listbox value={selected} onChange={setSelected} className="w-full border-gray-300 rounded py-2 px-1">

            <div className="relative mt-1">

                <ListboxButton className="relative w-full cursor-default rounded bg-white pl-3 pr-1">

                    <span className="block truncate">{selected}</span>

                    <span className="pointer-events-none absolute inset-y-0 flex items-center pr-2">

                        <BsChevronBarExpand
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />

                    </span>

                </ListboxButton>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >

                    <ListboxOptions className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-black/5 focus:outline-none sm:text-sm">
                        {
                            lists.map((list,index) => (

                                <ListboxOption
                                    key={index}
                                    className={({active}) => `relative cursor-default select-none pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900":"text-gray-900"}`}
                                    value={list}
                                >
                                    {
                                        ({selected}) => (

                                            <>

                                                <span className={`block truncate ${selected ? "font-medium" :"font-normal"}`}>
                                                    {list}
                                                </span>
                                                
                                                {
                                                    selected ? 
                                                    (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 ">
                                                            
                                                            <MdCheck className="h-5 w-5" aria-hidden="true" />

                                                        </span>
                                                    ) 
                                                    : 
                                                    (
                                                        null
                                                    )
                                                }
                                            </>

                                        )
                                    }
                                </ListboxOption>
                            ))
                        }
                    </ListboxOptions>

                </Transition>

            </div>

        </Listbox>

       </div>

    )
}