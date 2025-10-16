import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/auth/LoginPage.tsx'
import SuperAdminPage from '../pages/superadmin/SuperAdminPage.tsx'
import AdminMainPage from "../pages/admin/AdminMainPage.tsx";
<<<<<<< HEAD
import HackathonAdminPage from "../pages/admin/HackathonAdminPage.tsx";
=======
>>>>>>> develop
import HackathonRegisterPage from "../pages/hackathon/HackathonRegisterPage.tsx";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage />} />
                <Route path="/auth/login" element={ <LoginPage />} />
                <Route path="/superadmin" element={ <SuperAdminPage />} />
                <Route path="/admin" element={ <AdminMainPage />} />
                <Route path="/hackathon/register" element={ <HackathonRegisterPage />} />
<<<<<<< HEAD
                <Route path="/admin/hackathon" element={ <HackathonAdminPage />} />
=======
>>>>>>> develop
            </Routes>
        </BrowserRouter>
    )
}