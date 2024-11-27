import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { TEACHER } from "../helpers/constants";
import { logoutThunk } from "../redux/slice/userSlice";



function Avatar() {
  const { auth,profileSlice } = useSelector((state) => state);
  const {user,profile,isLoggedIn,googleUserProfile} = auth;
  const {updatedProfile} =profileSlice
  const { role } = user;
  const dispatch = useDispatch()
  console.log(isLoggedIn)
  const navigate = useNavigate()
  const handleLogout=async()=>{
   const res = dispatch(logoutThunk());
   if(res){
    navigate('/')
   }
   console.log(res)
  }
  return (
    <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src={updatedProfile?.picture||profile?.picture||googleUserProfile.picture||"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 flex flex-col gap-3 w-52 p-2 shadow">
      <li>
        <Link to='/profile' className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      {
    role===TEACHER?(   <p className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-[#ffd700] to-[#ff8c00] text-white font-bold uppercase rounded-full shadow-md border border-yellow-300 transform hover:scale-105 transition-all duration-300 ease-in-out">
    {role.toUpperCase()}
    </p>):("")
   }
      {
        isLoggedIn?
        (<button 
          onClick={handleLogout}
        className="px-2 py-2 bg-red-500 text-[#333] font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 " >
          Logout
        </button>):
        ""
      }
      <li>
  
      </li>
    </ul>
  </div>
  )
}

export default Avatar
