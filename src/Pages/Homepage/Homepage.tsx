// import { Header } from "../Reuseable/Header";
import img from "../assets/images/img.jpg"
import { RegisterStudent } from "../StudentPages/RegisterUser/RegisterUser"
import { StudentHero } from "../StudentPages/StudentEntryPage/StudentHomepage"

export const Homepage = ()=>{
    return (
        <div>
          {/* <img src={img} alt="img" /> */}
          {/* <RegisterStudent/> */}
          <StudentHero/>
        </div>
    )
}