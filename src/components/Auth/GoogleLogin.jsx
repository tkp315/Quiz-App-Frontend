
import { useGoogleLogin } from '@react-oauth/google'
import { axiosInstance } from '../../helpers/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setGoogleUser } from '../../redux/slice/userSlice';
import PropTypes from 'prop-types';
function GoogleLogin({role}) {
const navigate = useNavigate()
const dispatch = useDispatch()
const responseGoogle = async(authResult)=>{

    try {

        console.log(authResult)
        if(authResult['code']){
            const res = await axiosInstance.post(`/user/google`,{code:authResult['code'],role})
            console.log(res)

            if(res.status===200){
                dispatch(setGoogleUser(res.data.data));
               navigate('/')
            }
        }
        
    } catch (error) {
        console.log('google login error',error)
    }
}
const googleLogin = useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:'auth-code'
})
  return (
    <div>
      <button
  className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md shadow-md bg-white text-gray-700 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none m-10"
  onClick={googleLogin}
>
  <FaGoogle className="text-red-500 text-2xl" />
  <span className="font-medium">Sign in with Google</span>
</button>
    </div>
  )
}

GoogleLogin.propTypes = {
  role: PropTypes.string.isRequired, // role is required and must be a string
};

export default GoogleLogin
