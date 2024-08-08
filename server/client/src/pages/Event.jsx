

import "../CSS/calendar.css"
import axios from "axios"
import Calendar from "react-calendar"
import { toast } from "sonner"
import {useEffect,useState} from "react"
import { Button, Label, Table, Textarea, TextInput, Tooltip } from "flowbite-react"
import { current } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

export default function Event()
{
    const {currentUser} = useSelector(state => state.user)

    const [events, setEvents] = useState([])

    const [event, setEvent] = useState({})

    const [selectedDate, setSelectedDate] = useState(new Date())

    const today = new Date().toISOString().split('T')[0]

    useEffect(() => {

        const fetchEvents = async () => {

            try
            {
                const res = await axios.get(`/api/event/get-events`)

                if(res.data.success)
                {
                    setEvents(res.data.events)
                }
            }
            catch(error)
            {
                console.log(error.message)
            }

        }

        fetchEvents()

    },[])

   

    // eventChangeHandler
    const eventChangeHandler = (e) => {

        const {name,value} = e.target ;

        setEvent({
            ...event,[name]:value
        })
    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        const today = new Date()

        const selectedEventDate = new Date(event.date)

        if(selectedEventDate < today)
        {
            toast.error("Event Date cannot be in the past")
        }

        try
        {
            const res = await axios.post(`/api/event/create-event`, event)

            if(res.data.success)
            {
                toast.success("Event created successfully")

                setEvents([...events,{...event,_id:res.data.event._id}])

                setEvent({})
            }
        }
        catch(error)
        {
            toast.error("Error creating event")

            console.log(error.message)
        }

    }

    // renderEvents
    const renderEvents = (date) => {

        const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString())

        return(

            <div className="">
                {
                    dayEvents.map(event => (

                        <div 
                            key={event._id} 
                            className="border py-2 px-1 shadow bg-red-600 font-semibold truncate text-white rounded text-xs" 
                            aria-label={event.title}
                        >
                            <Tooltip content={event.title} style="dark">
                                {event.title}
                            </Tooltip>

                        </div>

                    ))
                }
            </div>

        )
    }

    // handleDelete
    const handleDelete = async (id) => {

        try
        {
            const res = await axios.delete(`/api/event/delete-event/${id}`)

            if(res.data.success)
            {
                setEvents(events.filter(event => event._id !== id))

                toast.success('Event is successfully deleted')
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

    return(

        <div className="px-4">

            <div className="contain">
                
                <h2 className="title ">Event</h2>

                <div className="w-full flex flex-col gap-y-10">

                    <div className="w-full flex flex-col lg:flex-row gap-y-10 gap-x-14 items-center justify-center">

                        {currentUser && currentUser.isAdmin && (

                            <>
                                {/* form */}
                                <div className="w-full lg:w-[50%] containing">

                                    <h3 className="subtitle text-center">create Event</h3>

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

                                        {/* title */}
                                    <div className="flex flex-col gap-y-1">

                                            <Label value="Date"/>

                                            <TextInput
                                                type="text"
                                                placeholder="Enter title"
                                                name="title"
                                                value={event.title}
                                                onChange={eventChangeHandler}
                                                required
                                            />

                                        </div>

                                        {/* Date */}
                                        <div className="flex flex-col gap-y-1">

                                            <Label value="Date"/>

                                            <TextInput
                                                type="date"
                                                placeholder="Enter date"
                                                min={today}
                                                name="date"
                                                value={event.date}
                                                onChange={eventChangeHandler}
                                                required
                                            />

                                        </div>

                                        {/* additional */}
                                        <div className="flex flex-col gap-y-1">

                                            <Label value="Additional"/>

                                            <Textarea 
                                                value={event.additional}
                                                name="additional"
                                                placeholder="Type additional Information"
                                                onChange={eventChangeHandler}
                                                required
                                            />

                                        </div>

                                        <div className="flex flex-col gap-y-1">

                                            <Button type="submit" gradientDuoTone='tealToLime'>
                                                create event
                                            </Button>

                                        </div>

                                    </form>

                                </div>
                            </>

                        )}

                        

                        {/* calendar */}
                        <div className="w-full lg:w-[50%] containing">

                            <h3 className="subtitle text-center">Calendar</h3>

                            <Calendar
                                value={selectedDate}
                                onClickDay={date => setSelectedDate(date)}
                                tileContent = {({date, view}) => view === 'month' && renderEvents(date)}
                            />

                        </div>

                    </div>
                    
                    {/* event log */}
                    <div className="containing">
                        
                        <h2 className="subtitle text-center mb-5">Event Log</h2>

                        <div className="table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
                            {
                                events.length > 0 ? 
                                        (
                                            <Table hoverable>

                                                <Table.Head>

                                                    <Table.HeadCell>Title</Table.HeadCell>

                                                    <Table.HeadCell>Date</Table.HeadCell>

                                                    <Table.HeadCell>Additional</Table.HeadCell>

                                                    
                                                    {
                                                        currentUser.isAdmin && (
                                                            
                                                            <Table.HeadCell>Action</Table.HeadCell>

                                                        )
                                                    }

                                                </Table.Head>
                
                                            {
                                                events.map((event) => (

                                                    <Table.Body key={event._id}>

                                                        <Table.Row>

                                                            <Table.Cell>{event.title}</Table.Cell>

                                                            <Table.Cell>{new Date(event.date).toDateString()}</Table.Cell>

                                                            <Table.Cell>{event.additional}</Table.Cell>
                                                            
                                                            {currentUser.isAdmin && (
                                                                
                                                                <Table.Cell>

                                                                    <span className="">

                                                                        <Button pill color="failure" onClick={() => handleDelete(event._id)} >
                                                                            Delete
                                                                        </Button>

                                                                    </span>

                                                                </Table.Cell>

                                                            )}
                                                            

                                                        </Table.Row>

                                                    </Table.Body>

                                                ))
                                            }

                                            </Table>
                                        ) 
                                        : 
                                        (
                                            <p className="">
                                                You have not events yet
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