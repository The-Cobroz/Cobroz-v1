import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Mainpage from '../Components/Mainpage.js';
import Login from '../Components/Auth/Login.js';
import LspRegister from '../Components/Auth/Register/LspRegister.js';
import UserRegister from '../Components/Auth/Register/UserRegister.js';
import Page1 from '../Components/Auth/Register/Lawyer/Page1.js';
import Page2 from '../Components/Auth/Register/Lawyer/Page2.js';
import FrontPage from '../Components/WebApp/Forum/FrontPage.js';
import NewPost from '../Components/WebApp/Forum/NewPost.js';
import ProfilePage from '../Components/WebApp/Forum/Profile/ProfilePage.js';
import PostCardForum from '../Components/WebApp/Forum/PostCard/PostCardForum.js';
import EditEdu from '../Components/WebApp/Forum/Profile/Lawyerprofile/EditEdu.js';
import EditExp from '../Components/WebApp/Forum/Profile/Lawyerprofile/EditExp.js';
import Settings from '../Components/WebApp/Settings/Settings.js';
import EditPersonal from '../Components/WebApp/Settings/Personal/EditPersonal.js';
import EditPhone from '../Components/WebApp/Settings/Personal/EditPhone.js';
import ChangePassword from '../Components/WebApp/Settings/Personal/ChangePassword.js';
import DeleteAcc from '../Components/WebApp/Settings/Account/DeleteAcc.js';
import Notifications from '../Components/WebApp/Notification/Notifications.js';
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={Mainpage}/>
                <Route path='/auth/login' Component={Login}/>
                <Route path='/auth/register' Component={LspRegister}/>
                <Route path='/auth/register/user' Component={UserRegister}/>
                <Route path='/auth/register/lsp/page-1' Component={Page1}/>
                <Route path='/auth/register/lsp/page-2' Component={Page2}/>
                <Route path='/web/app' Component={FrontPage}/>
                <Route path='/web/app/post' Component={NewPost}/>
                <Route path='/web/app/profile' Component={ProfilePage}/>
                <Route path='/web/app/profile/edit-education' Component={EditEdu}/>
                <Route path='/web/app/profile/edit-experience'Component={EditExp}/>
                <Route path='/web/app/post/:postID' Component={PostCardForum}/>
                <Route path='/web/app/settings' Component={Settings} />
                <Route path='/web/app/settings/personal/edit' Component={EditPersonal} />
                <Route path='/web/app/settings/phone/edit' Component={EditPhone} />
                <Route path='/web/app/settings/password-change' Component={ChangePassword} />
                <Route path='/web/app/settings/account/delete' Component={DeleteAcc} />
                <Route path='/web/app/notifications' Component={Notifications} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
