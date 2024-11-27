import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLogin from '../components/Auth/GoogleLogin';
import PropType from 'prop-types'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID


function AuthProvider({role,btnHeading}) {
  return (
   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <GoogleLogin role={role} btnText={btnHeading}/>
   </GoogleOAuthProvider>
  )
}

AuthProvider.propTypes = {
  role:PropType.string.isRequired,
  btnHeading:PropType.string.isRequired
}

export default AuthProvider
