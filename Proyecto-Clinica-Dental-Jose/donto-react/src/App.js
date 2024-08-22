import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeOne from './Components/HomeOne';
import Header from './Components/Header/Header';
import FooterOne from './Components/Footer/FooterOne';
import About from './Components/Page/About';
import ServiceDetails from './Components/Page/ServiceDetails';
import DentistDetails from './Components/Page/DentistDetails';
import Blog from './Components/Page/Blog';
import Contact from './Components/Page/Contact';
import Team from './Components/Page/Team';
import BlogDetails from './Components/Page/BlogDetails';
import FooterData from './Components/Data/FooterData';
import SignIn from './Components/SignIn/signIn';
import SignUp from './Components/SignUp/signUp';
import Dashboard from './Components/Admin/Dashboard';

import DashboardPatient from './Components/Admin/DashboardPatient';
import DashboardCreateFile from './Components/Admin/DashboardCreateFile';
import DashboardUpdateFile from './Components/Admin/DashboardUpdateFile';
import DashboardCreateUser from './Components/Admin/DashboardCreateUser';
import DashboardCreateBlog from './Components/Admin/DashboardCreateBlog';
import DashboardBlog from './Components/Admin/DashboardBlog';
import DashboardScheduler from './Components/Admin/DashboardScheduler';
import MaybeShowNavBar from './Components/MaybeShowNavBar/MaybeShowNavBar';
import UserList from './Components/Admin/Users';
import UpdateUser from './Components/Admin/UpdateUser';
import CreateUser from './Components/Admin/UserCreate';
import FileCreate from './Components/Admin/FileCreate';
import FileList from './Components/Admin/FilePatient';
import UpdateFile from './Components/Admin/UpdateFile';
import BlogList from './Components/Admin/Blog';
import Scheduler from './Components/Scheduler/scheduler';
import BlogAdmin from './Components/BlogAdmin/BlogAdmin';
import BlogAdminDetail from './Components/BlogAdmin/BlogDetailsAdmin';
import ForgotPassword from "./Components/ForgotPassword/Forgotpassword";
import ResetPassword from './Components/ForgotPassword/Passwordreset';
import BlogAdminDetailUpdate from './Components/BlogAdmin/BlogDetailsAdminUpdate';
import UserDashboard from './Components/User/Dashboard';
import AboutTwo from './Components/PageUser/About';
import BlogTwo from './Components/PageUser/Blog';
import BlogDetailsTwo from './Components/PageUser/BlogDetails';
import ContactTwo from './Components/PageUser/Contact';
import DentistDetailsTwo from './Components/PageUser/DentistDetails';
import ServiceDetailsTwo from './Components/PageUser/ServiceDetails';

import CalendarioCitas  from './Components/A/a';
import './App.css';

function App() {


 
 
  return (
    



    <div className="main-wrapper">
      <Router>
       <Switch>
       
       <Route exact path='/Admin/Dashboard' component={Dashboard} />
      
       <Route exact path='/Admin/DashboardPatient' component={DashboardPatient} />
       <Route exact path='/Admin/DashboardCreateFile' component={DashboardCreateFile} />
       <Route exact path='/Admin/DashboardUpdateFile' component={DashboardUpdateFile} />
       <Route exact path='/Admin/DashboardCreateUser' component={DashboardCreateUser} />
       <Route exact path='/Admin/DashboardCreateBlog' component={DashboardCreateBlog} / >
       <Route exact path='/Admin/DashboardBlog' component={DashboardBlog} / >
       <Route exact path='/Admin/DashboardScheduler' component={DashboardScheduler} />
       <Route exact path='/Admin/UpdateFile/:id' component={UpdateFile} />
       <Route exact path='/Admin/UpdateUser/:id' component={UpdateUser} />
       <Route exact path='/Admin/Blog' component={BlogList} />
       <Route exact path="/ForgotPassword/Forgotpassword" component={ForgotPassword } />
       <Route exact path="/ForgotPassword/Passwordreset" component={ResetPassword} />
       <Route exact path="/User/Dashboard" component={UserDashboard} />
       <Route exact path="/PageUser/About" component={AboutTwo} />
       <Route exact path="/PageUser/Blog" component={BlogTwo} />
       <Route exact path="/PageUser/BlogDetails" component={BlogDetailsTwo} />
       <Route exact path="/PageUser/Contact" component={ContactTwo} />
       <Route exact path="/PageUser/DentistDetails" component={DentistDetailsTwo} />
       <Route exact path="/PageUser/ServiceDetails" component={ServiceDetailsTwo} />

       
       </Switch>
       <MaybeShowNavBar>
        <Header />
        </MaybeShowNavBar>
        <Route exact path='/' render={props => (
          <React.Fragment>
            <HomeOne />
          </React.Fragment>
        )} />
        
        <Route path='/Page/About' component={About} />
        <Route path='/Page/ServiceDetails' component={ServiceDetails} />
        <Route path='/Page/DentistDetails' component={DentistDetails} />
        <Route path='/Page/BlogDetails' component={BlogDetails} />
        <Route path='/Page/Blog' component={Blog} />
        <Route path='/Page/Team' component={Team} />
        <Route path='/Page/Contact' component={Contact} />
        <Route path='/SignIn/signIn' component={SignIn} />
        <Route path='/SignUp/signUp' component={SignUp} />
        <Route path='/Admin/Users' component={UserList} />
        <Route path='/Admin/UserCreate' component={CreateUser}/>
        <Route path='/Admin/FileCreate' component={FileCreate}/>
        <Route path='/Admin/FilePatient' component={FileList}/>
        <Route path='/Scheduler/scheduler' component={Scheduler}/>
        <Route path='/BlogAdmin/BlogAdmin' component={BlogAdmin}/>
        <Route path='/BlogAdmin/BlogDetailsAdmin' component={BlogAdminDetail}/>
        <Route path='/BlogAdmin/BlogDetailsAdminUpdate' component={BlogAdminDetailUpdate}/>
        <Route path='/A/a' component={CalendarioCitas}/>



        



  

        <MaybeShowNavBar>
		    <FooterOne FooterData={FooterData} />
        </MaybeShowNavBar>
        



        
      </Router>
    </div>
  );
};

  


export default App;
