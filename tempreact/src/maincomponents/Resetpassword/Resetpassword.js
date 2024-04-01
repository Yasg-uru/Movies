import React from 'react'
import "./Resetpassword.css"
const Resetpassword = () => {
    
  return (
    <div className="reset-main-container">
            <div className="reset-inner-container">
                <h1 style={{textDecoration:'underline',letterSpacing:'5px'}} className="reset-h1">Reset Password</h1>
                <form className="reset-form">
                    {/* ... Other components ... */}
                    <label htmlFor="password" className="reset-label">
                        New Password:
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="reset-input"
                            placeholder="Enter your new password"
                            required
                        />
                    </label>
                    <label htmlFor="password" className="reset-label">
                        New Password:
                        <input
                            type="password"
                            // id="password"
                            name="confirmpassword"
                            className="reset-input"
                            placeholder="Enter your confirm password"
                            required
                        />
                    </label>
                    <button className='rsbtn' type='submit'>Reset Password</button>
                </form>
            </div>
        </div>
  )
}

export default Resetpassword
