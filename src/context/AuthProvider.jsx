import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLogin from '../components/Auth/GoogleLogin';
import PropType from 'prop-types'

const GOOGLE_CLIENT_ID = import.meta.env.GOOGLE_CLIENT_ID
console.log("Google Client Id",GOOGLE_CLIENT_ID)

function AuthProvider({role}) {
  return (
   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <GoogleLogin role={role}/>
   </GoogleOAuthProvider>
  )
}

AuthProvider.propTypes = {
  role:PropType.string.isRequired
}

export default AuthProvider
