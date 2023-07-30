import React from 'react';
import firebase from './firebase'
import { getAuth, signInWithPhoneNumber,RecaptchaVerifier } from "firebase/auth";
// import RecaptchaVerifier from "firebase/auth";
// import  RecaptchaVerifier from "./firebase";
class App extends React.Component{
  handleChange = (e) => {
    const {name, value } = e.target
    this.setState(
      {
        [name] : value 
      }
    )
  }
  configureCaptcha = (e) =>
  {
    const auth = getAuth();
    
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        this.onSignInSubmit();
        console.log('Recaptcha Verified')
        // ...
      },
      defaultCountry : "IN"
    });
    // return recaptchaVerifier;
    
  }

  // const recaptchaVerifier = configureCaptcha();
  onSignInSubmit = (e) =>{
    e.preventDefault()
    this.configureCaptcha()
   const phoneNumber = "+91" +this.state.mobile;
   console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
         console.log('Otp Has Been Sent') // ...
        }).catch((error) => {
          // Error; SMS not sent
           console.log("There is some error")
        });
  }
 onSubmitOTP = (e) =>{ 
  e.preventDefault()
  const code = this.state.otp;
  console.log(code)
  window.confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  console.log(JSON.stringify(user))
  alert("User is Verified")
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
});
 }
  render(){
    return(
        <div>
          
          <h2>Login Form</h2>
          <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
            <input type="number" name="mobile" placeholder='Mobile Number' required onChange={this.handleChange}/> 
            <button type='submit'>Submit </button>
          </form>
          <h2>Enter OTP</h2>
          <form onSubmit={this.onSubmitOTP}>
            <input type="number" name="otp" placeholder='OTP Number' required onChange={this.handleChange}/> 
            <button type='submit'>Submit </button>
          </form>
          <div id="recaptcha-container"></div>
        </div>
    )
  }
}
export default App;