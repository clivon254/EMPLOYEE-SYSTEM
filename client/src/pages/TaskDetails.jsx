
import {
    MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,} from "react-icons/md"
import {FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa"
import { GrInProgress } from "react-icons/gr"
import { RxActivityLog } from "react-icons/rx"
import { useParams } from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from "axios";
import clsx from "clsx";
import { getInitials, PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import moment from "moment"
import { Button } from "flowbite-react";
import { toast } from "sonner";

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    normal: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };
  

  const bgColor = {
    high: "bg-red-200",
    normal: "bg-yellow-200",
    low: "bg-blue-200",
  };
  

  const TABS = [
    { title: "Task Detail", icon: <FaTasks /> },
    { title: "Activities/Timeline", icon: <RxActivityLog /> },
  ];
  
  const TASKTYPEICON = {
    commented: (
      <div className='w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white'>
        <MdOutlineMessage />,
      </div>
    ),
    started: (
      <div className='w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white'>
        <FaThumbsUp size={24} />
      </div>
    ),
    assigned: (
      <div className='w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white'>
        <FaUser size={24} />
      </div>
    ),
    bug: (
      <div className='text-red-600'>
        <FaBug size={24} />
      </div>
    ),
    completed: (
      <div className='w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white'>
        <MdOutlineDoneAll size={24} />
      </div>
    ),
    inprogress: (
      <div className='w-10 h-10 flex items-center justify-center rounded-full bg-violet-600 text-white'>
        <GrInProgress size={24} />
      </div>
    ),
  };
  
  const act_types = [
    "Started",
    "Completed",
    "In Progress",
    "Commented",
    "Bug",
    "Assigned",
  ];


  // Activity
  const Activities = ({activity,id}) => {

    const [selected, setSelected] = useState('')

    const [text,setText] = useState('')

    console.log(text)
    console.log(selected)


    // handleSubmit
    const handleSubmit = async () => {

      try
      {
          const res = await axios.post(`/api/task/post-activity/${id}`,{
            type:selected,
            activity:text
          })

          if(res.data.success)
          {
              toast.success("activity added successfully")

              setText('')

              setSelected('')
          }
          else
          {
            console.log(res.data.message)
          }

      }
      catch(error)
      {
        console.error(error.message);
      }

    }

    // handleChange
    const handleChange = async (e) => {
      if (e.target.type === "checkbox") {
        setSelected(e.target.value);
      } else {
        setText(e.target.value);
      }
    };

    // card
    const Card = ({item}) => {

      return(

        <div className="flex space-x-4">

          <div className="flex flex-col items-center flex-shrink-0">

            <div className="w-10 h-10 flex items-center justify-center">
              {TASKTYPEICON[item?.type]}
            </div>

            <div className="w-full flex items-center">

              <div className="w-0.5 bg-gray-300 h-full"/>

            </div>

          </div>

          <div className="flex flex-col gap-y-1 mb-8">

            <p className="font-semibold">{item?.by?.username}</p>

            <div className="text-gray-500 space-y-2 ">

              <span className="capitalize">{item?.type}</span>

              <span className="">{moment(item?.date).fromNow()}</span>

            </div>


            <div className="text-gray-700 dark:text-gray-400">{item.activity}</div>

          </div>

        </div>

      )
    }


    return(

      <div className="w-full flex flex-col gap-10   overflow-y-auto">

          {/* activities */}
          <div className="w-full">

            <h4 className="text-gray-600 dark:text-gray-200 font-semibold text-lg mb-5">Activities</h4>

            <div className="w-full">
              {
                activity?.map((el,index) => (

                  <Card
                    key={index}
                    item={el}
                  />

                ))
              }

            </div>

          </div>
            
          {/* add activity */}
          <div className="space-y-4">

            <h4 className="text-gray-600 dark:text-gray-200 font-semibold text-lg mb-5">
              Add Activity
            </h4>

            <div className="flex flex-col gap-1">
                {
                  act_types.map((item,index) => (

                    <div key={item} className="flex gap-2 items-center">

                      <input 
                        type="checkbox" 
                        className="w-4 h-4"
                        checked={selected === item ? true : false}
                        onChange={handleChange} 
                      />

                      <p className="">{item}</p>

                    </div>

                  ))
                }
            </div>

            <textarea 
              name="" 
              id="" 
              value={text}
              onChange={handleChange}
              className="border-gray-300 outline-none p- rounded-md ring-blue-500 bg-transparent"
              placeholder="Type..."
            />

            {

              <Button
                type="button"
                onClick={handleSubmit}
                gradientMonochrome="lime"
              >
                Submit
              </Button>

            }

          </div>

      </div>

    )
    
  }


export default function TaskDetails()
{
    const {id} = useParams()

    const [task,setTask] = useState({})

    useEffect(() => {

        const fetchTask = async () => {

            try
            {
                const res = await axios.get(`/api/task/getTask/${id}`)

                if(res.data.success)
                {
                    setTask(res.data.task)
                }
            }
            catch(error)
            {
                console.log(error)
            }

        }

        fetchTask()

    },[])

   
    
    return(

        <div className="px-4">
            
            <div className="contain">

                <h2 className="text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-300">{task.title}</h2>
                
                <br className="my-5 " />

                <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 containing overflow-y-auto">

                    {/* LEFT */}
                    <div className="w-full md:w-2/3 space-y-8  md:border-r border-gray-400 px-3">

                      <div className="flex items-center gap-5">

                        <div className={clsx("flex items-center gap-1 text-base font-semibold px-3 rounded-full",PRIOTITYSTYELS[task.priority],bgColor[task.priority])}>

                          <span className="text-lg">{ICONS[task.priority]}</span>

                          <span className="uppercase">{task.priority} Priority</span>

                        </div>

                        <div className={clsx("flex items-center gap-2")}>

                          <div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[task.stage])}/>

                          <div className="uppercase text-black dark:text-gray-200">{task.stage}</div>

                        </div>

                      </div>

                      <p className="text-gray-500 ">
                        Created At:{new Date(task.date).toDateString()}
                      </p>

                      <div className="space-x-2">

                        <span className="font-semibold">Sub Task:</span>

                        <span className="">{task?.subTasks?.length}</span>

                      </div>
                      
                      {/* TEAMS */}
                      <div className="space-y-4 py-">

                          <p className="text-gray-600 dark:text-gray-300 font-semibold text-sm">TASK TEAM</p>

                          <div className="space-y-3">
                            {
                              task?.team?.map((m,index) => (

                                <div key={index} className="flex gap-4 py-2 items-center border-t border-gray-200 ">

                                  <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-500">

                                    <span className="text-center">
                                      {getInitials(m?.username)}
                                    </span>

                                  </div>

                                  <div className="">

                                    <p className="text-lg font font-semibold">{m.username}</p>

                                    <span className="">{m?.category}</span>

                                  </div>

                                </div>

                              ))
                            }
                          </div>

                      </div>

                      {/* SUBTASK */}
                      <div className="space-y-4">

                        <p className="text-gray-500 font-semibold text-sm">SUB-TASKS</p>

                        <div className="space-y-8">
                          {
                            task?.subTasks?.map((el,index) => (

                              <div key={index} className="flex gap-3">

                                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-500 ">
                                    
                                    <MdTaskAlt className="text-violet-600" size={26} />
                                    
                                  </div>

                                  <div className="space-y-2 ">

                                    <div className="flex gap-2 items-center ">

                                        <span className="text-sm text-gray-500">
                                          {new Date(el?.date).toDateString()}
                                        </span>

                                        <span className="px-2 py-0.5 text-center r text-sm rounded-full bg-violet-700 font-semibold text-gray-300">
                                          {el?.tag}
                                        </span>

                                    </div>

                                    <p className="text-gray-700 dark:text-gray-300">
                                      {el?.title}
                                    </p>

                                  </div>

                              </div>

                            ))
                          }
                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className=" w-full md:w-1/3 ">
                          
                          <Activities activity={task?.activities} id={id}/>

                    </div>

                </div>

            </div>

        </div>

    )
}