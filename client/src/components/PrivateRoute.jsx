


import {Navigate, Outlet} from "react-redux"
import {useSelector} from "react-redux"


export default function PrivateRoute()
{

    const {currentUser} = useSelector((state) => state.user)

    return currentUser ? <Outlet /> : <Navigate to="/"/>
}