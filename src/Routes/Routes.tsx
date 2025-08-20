import { createBrowserRouter } from "react-router";
import App from "../App";
import { Homepage } from "../Pages/Homepage/Homepage";
import { StudentHero } from "../Pages/StudentPages/StudentEntryPage/StudentHomepage";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {path:"", element:<Homepage/>},
            {path:"studentHomepage", element:<StudentHero/>},
            {path:"", element:<Homepage/>},
            {path:"", element:<Homepage/>}
        ]
    }
])