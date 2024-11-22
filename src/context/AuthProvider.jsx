import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLogin from '../components/Auth/GoogleLogin';
import { GOOGLE_CLIENT_ID } from '../../constants';
import { useState } from 'react';




function AuthProvider({role}) {
  return (
   <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <GoogleLogin role={role}/>
   </GoogleOAuthProvider>
  )
}

export default AuthProvider
