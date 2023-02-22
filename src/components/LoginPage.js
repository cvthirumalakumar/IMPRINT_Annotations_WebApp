// import { auth } from '../firebase'
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
// import GoogleButton from 'react-google-button'
import React  from 'react';
import { Stack } from '@mui/material'
import './LoginPage.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import 'firebase/compat/auth';


export default function LoginPage() {

    const uiConfig = {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image', // 'audio'
        size: 'normal', // 'invisible' or 'compact'
        badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
      },
      defaultCountry: 'IN', // Set default country to the United Kingdom (+44).
    },
    
  ]
      };


// const uiConfig = {
//   signInFlow: 'popup',
//     signInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//     ],
//     // defaultCountry: 'IN',
//   };

    return (
        
        <div className="google_button_container">
            <Stack direction="column" spacing={1}>
                <br />
            <h1 className='header'>English Gyani Project</h1>
            <h3>Indian Institute of Science<br />Bengaluru</h3>
            <p>Please Sign in to continue</p>
            {/* <GoogleButton onClick={signInWithGoogle} className="g-button" /> */}
            
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </Stack>
        </div>
    )
    
}
