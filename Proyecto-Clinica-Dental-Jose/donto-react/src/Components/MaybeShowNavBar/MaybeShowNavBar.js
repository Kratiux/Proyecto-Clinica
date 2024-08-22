import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


const MaybeShowNavBar = ({ children }) =>{
    const location = useLocation();
    const [showNavBar, setShowNavBar] = useState(true)

    useEffect(() =>{

        console.log('this is location: ', location)
        if (location.pathname === '/Admin/Dashboard' || location.pathname === '/User/Dashboard' || location.pathname === '/PageUser/About' || location.pathname === '/PageUser/Blog' || location.pathname === '/PageUser/BlogDetails' || location.pathname === '/PageUser/Contact' || location.pathname === '/PageUser/DentistDetails' || location.pathname === '/PageUser/ServiceDetails' || location.pathname === '/Admin/DashboardPatient' || location.pathname === '/Admin/DashboardScheduler' || location.pathname === '/Admin/DashboardCreateBlog' || location.pathname === '/Admin/DashboardCreateFile' || location.pathname === '/Admin/DashboardCreateUser' ||  location.pathname === '/SignIn/signIn' || location.pathname === '/SignUp/signUp' || location.pathname === '/Admin/Users' || location.pathname === '/Admin/FilePatient' || location.pathname === '/Admin/Blog' || location.pathname === '/Admin/UserCreate' || location.pathname === '/Admin/FileCreate' || location.pathname === '/Admin/UpdateFile/:id' || location.pathname === '/Admin/UpdateUser/:id'|| location.pathname === '/Scheduler/scheduler'|| location.pathname === '/ForgotPassword/Forgotpassword'|| location.pathname === '/ForgotPassword/Passwordreset' ||location.pathname === '/A/a'){
            setShowNavBar(false)

        }


    }, [location])

    return (

        <div>{showNavBar && children}</div>

    )

}

export default MaybeShowNavBar