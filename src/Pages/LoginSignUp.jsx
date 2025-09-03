import React from 'react'

import './CSS/LoginSignUp.css'
const LoginSignUp = () => {
  return (
  <div className="general">
  <div className="login-signup">
  <h4>Sign Up</h4>

  <form className="login-signup-input-field">
    <input type="text" placeholder="Name" required />
    <input type="email" placeholder="Email" required />
    <input type="password" placeholder="Password"  required/>
    <input type="password" placeholder="Confirm Password" required />

    <div className="login-signup-continue">
      <input type="checkbox" id="agree" />
      <label htmlFor="agree">
        By continuing, I agree to the terms and conditions
      </label>
    </div>

    <button type="submit">Sign Up</button>
  </form>

  <div className="login-signup-already">
    <p>
      Already have an account?{" "}
      <span className="login-link">Login</span>
    </p>
  </div>
</div>

</div>

  )
}

export default LoginSignUp
