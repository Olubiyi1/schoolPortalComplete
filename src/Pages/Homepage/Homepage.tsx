// import { Header } from "../Reuseable/Header";
import { RegisterStudent } from "../StudentPages/RegisterUser/RegisterUser"
import { StudentHero } from "../StudentPages/StudentEntryPage/StudentHomepage"
import { StudentLogin } from "../StudentPages/LoginPage/StudentLogin"

export const Homepage = ()=>{
    return (
        <div>
  
          <RegisterStudent/>
          <StudentHero/>
          <StudentLogin/>
        </div>
    )
}