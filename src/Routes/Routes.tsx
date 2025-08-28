import { createBrowserRouter } from "react-router";
import App from "../App";
import { Homepage } from "../Pages/Homepage/Homepage";
import { StudentHero } from "../Pages/StudentPages/StudentEntryPage/StudentHomepage";
import { RegisterStudent } from "../Pages/StudentPages/RegisterUser/RegisterUser";
import { StudentLogin } from "../Pages/StudentPages/LoginPage/StudentLogin";
import { AboutPage } from "../Pages/AboutPage/About";
import { Academics } from "../Pages/AcademicsPage/Academics";
import { EmailVerification } from "../Pages/VerificationPage/EmailVerifcation";
import { Dashboard } from "../Pages/StudentPages/Dashboard/StudentDashboard"

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {path:"", element:<Homepage/>},
            {path:"studentHomepage", element:<StudentHero/>},
            {path:"registerstudent", element:<RegisterStudent/>},
            {path:"studentlogin", element:<StudentLogin/>},
            {path:"aboutpage", element:<AboutPage/>},
            {path:"academicspage", element:<Academics/>},
            {path: "verify-email", element:<EmailVerification/>},
            {path:"dashboard", element:<Dashboard/>}
        ]
    }
])