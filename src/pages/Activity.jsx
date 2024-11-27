
import { useSelector } from 'react-redux'
import Navbar from '../layouts/Navbar';
import { TEACHER } from '../helpers/constants';
import TeacherActivity from './TeacherActivity';

function Activity() {
    const auth= useSelector((state)=>state.auth);
     console.log(auth.user.role)  
    const role = auth.user.role ||auth.googleUser.role
    
  return (
    <Navbar>
    {role===TEACHER ? (
        <TeacherActivity/>
    ):("")}
    </Navbar>
  )
}

export default Activity
